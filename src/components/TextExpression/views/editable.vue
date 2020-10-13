<template>
  <div
    :class="{'readonly' : readonly, 'multi-line' : multiLine, 'single-line' : !multiLine}"
    class="or-editable-wrapper"
  >
    <div
      ref="editable"
      :contenteditable="!readonly"
      @keydown="handleKeyDown"
      @keyup="handleKeyUp"
      @dragover.prevent
      @drop.prevent
      @focus="handleFocus"
      class="editable"
      @blur="handleBlur"
      @mouseup="handleMouseUp"
      @mousedown="handleMouseDown"
      @click="handleClick"
      @input="handleInput"
      v-html="stringifiedValue"
      @paste.stop.prevent="handlePaste"
    />
    <div v-show="showPlaceholder" @click="focusEditable" class="placeholder">
      {{ placeholder }}
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash';
import mergeTag from './merge_tag';
import rangy from 'rangy';
import textRange from 'rangy/lib/rangy-textrange';
import Vue from 'vue';

const ZERO_WIDTH_SPACE = '\u200b';
const NON_BREAKING_SPACE = '\u00a0';
const NORMALIZE_SELECTION_INTERVAL = 50;
const UPDATE_DEBOUNCE_INTERVAL = 100;
const WIDTH_UPDATE_INTERVAL = 200;
const MergeTag = Vue.extend(mergeTag);

/* eslint-disable no-magic-numbers */
export default {

  props: {
    disableVariables: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: Array,
    multiLine: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    stepId: String,
    steps: Array,
    mergeFields: {
      type: Array,
      default () {
        return [];
      }
    }
  },

  data () {
    return {
      mergeTags: [],
      valueIsEmpty: true,
      stringifiedValue: '',
      lastKnownValue: null,
      suppressBlur: false,
      editableWidth: 0,
      widthUpdateInterval: null
    };
  },
  computed: {
    debounceUpdateValue () {
      return _.debounce(() => this.updateValue(this.getCurrentTextSelection()), UPDATE_DEBOUNCE_INTERVAL);
    },

    debounceNormalizeSelection () {
      return _.debounce(() => this.normalizeSelection(), NORMALIZE_SELECTION_INTERVAL);
    },

    editable () {
      return this.$refs.editable;
    },

    showPlaceholder () {
      return this.valueIsEmpty && this.placeholder;
    }
  },

  watch: {
    value (newValue) {
      if (!_.isEqual(newValue, this.lastKnownValue)) {
        const stringified = this.stringifyValue(newValue);
        // fixes a weird behaviour of vue when editable
        // html does not always change after this.stringifiedValue is changed
        // see #8079
        this.stringifiedValue = `${stringified}  `;
        this.$nextTick(() => {
          this.stringifiedValue = stringified;
          this.lastKnownValue = newValue;
          this.$nextTick(() => {
            this.mountMergeTagComponents();
            // value changed externally, caret position is no longer valid
            // and might be out of bounds
            this.forgetSelection();
            this.fireChangeEvent();
          });
        });
      }
    },
    readonly () {
      this.mountMergeTagComponents();
    }
  },

  mounted () {
    this.stringifiedValue = this.stringifyValue(this.value);
    this.lastKnownValue = this.value;
    this.editableWidth = this.getEditableWidth();
    this.$nextTick(() => {
      this.mountMergeTagComponents();
      this.widthUpdateInterval = setInterval(() => this.updateEditableWidth(), WIDTH_UPDATE_INTERVAL);
      this.fireChangeEvent();
    });
  },

  beforeDestroy () {
    this.debounceUpdateValue.cancel();
    this.debounceNormalizeSelection.cancel();
    clearInterval(this.widthUpdateInterval);
    _.forEach(this.mergeTags, tag => tag.$destroy());
  },

  methods: {
    handleClick () {
      this.suppressBlur = false;
    },
    handleMouseDown () {
      this.suppressBlur = true;
    },
    updateEditableWidth () {
      const currentWidth = this.getEditableWidth();
      if (currentWidth !== this.editableWidth) {
        this.editableWidth = currentWidth;
        _.forEach(this.mergeTags, tag => tag.setMaxWidth(this.editableWidth));
      }
    },

    getEditableWidth () {
      const editableComputedStyles = window.getComputedStyle(this.$refs.editable);
      const width = parseFloat(editableComputedStyles.width);
      const paddingLeft = parseFloat(editableComputedStyles.paddingLeft);
      const paddingRight = parseFloat(editableComputedStyles.paddingRight);
      return width - paddingLeft - paddingRight;
    },

    stringifyValue (value) {
      return _.reduce(value, (memo, item) => {
        if (_.isString(item)) {
          // convert < and > to special chars to not be treated as tags
          item = _.chain(item).replace(/</g, '&lt;').replace(/>/g, '&gt;').value();
        }
        if (_.isString(item) && this.multiLine) {
          // convert all spaces to "Non-breaking space" (\u00a0) symbols for consistency
          // and all \n to <br>
          return memo + _.chain(item)
            .replace(/^ /, `${NON_BREAKING_SPACE}`)
            .replace(/ $/, `${NON_BREAKING_SPACE}`)
            .replace(/ {2}/g, ` ${NON_BREAKING_SPACE}`)
            .replace(/ {2}/g, ` ${NON_BREAKING_SPACE}`)
            .replace(/\n/g, `${ZERO_WIDTH_SPACE}<br data-new-line="true">${ZERO_WIDTH_SPACE}`)
            .value();
        } else if (_.isString(item) && !this.multiLine) {
          // convert all spaces to "Non-breaking space" (\u00a0) symbols for consistency
          // and remove all \n
          return memo + _.chain(item)
            .replace(/^ /, `${NON_BREAKING_SPACE}`)
            .replace(/ $/, `${NON_BREAKING_SPACE}`)
            .replace(/ {2}/g, ` ${NON_BREAKING_SPACE}`)
            .replace(/\n/g, '')
            .value();
        } else if (_.isObject(item) && _.isString(item.path)) {
          // convert variables to non-editable spans
          // wrap with 'Zero-width space' (\u200b) to fix cursor positioning
          return `${memo}${ZERO_WIDTH_SPACE}<span data-variable="${item.path}">{}</span>${ZERO_WIDTH_SPACE}`;
        }
        return memo;
      }, '');
    },

    /**
             * Fire 'changed' and 'changed:stats' and inform listeners of how much text symbols and merge tags there
             * currently are in the editable field
             */
    fireChangeEvent () {
      const stats = this.getTextStatistics();
      this.$emit('stats-change', stats);
      this.valueIsEmpty = !stats.characterCount && !stats.mergeTagsCount;
    },

    blurEditable () {
      this.editable.blur();
    },

    focusEditable () {
      this.editable.focus();
    },

    /**
             * return current selection range
             * @returns {Range|undefined} selection range
             */
    getCurrentSelectionRange () {
      const selection = rangy.getSelection();
      return selection.rangeCount ? selection.getRangeAt(0) : undefined;
    },

    /**
             * Return a text selection object
             * @example
             * {
             *   backward         : false,
             *   characterOptions : undefined,
             *   characterRange   : {
             *     end   : 12
             *     start : 12
             *   }
             * }
             * @returns {Object} text selection object
             */
    getCurrentTextSelection () {
      return textRange.getSelection().saveCharacterRanges(this.editable)[0];
    },

    /**
             * Set caret to the end of the input
             */
    setSelectionToEditableEnd () {
      const editableLength = this.editable.innerText.length;
      this.setTextSelection({
        characterRange: {
          end: editableLength,
          start: editableLength
        },
        backward: false,
        characterOptions: undefined
      });
    },

    /**
             * Set selection from text selection object
             * @param {Object} selection selection in a text
             */
    setTextSelection (selection) {
      const textSelection = textRange.getSelection();
      textSelection.restoreCharacterRanges(this.editable, _.isArray(selection) ? selection : [selection]);
      this.rememberSelection();
    },

    /**
             * Return info about the number of symbols in text part of the field and number of merge fields used
             * @example
             * {
             *   characterCount : 0,
             *   mergeTagsCount : 0
             * }
             * @returns {Object} statistics data
             */
    getTextStatistics () {
      return _.reduce(this.editable.childNodes, (stats, node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.dataset && _.isString(node.dataset.variable)) {
          stats.mergeTagsCount += 1;
        } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'BR' && this.multiLine && node.dataset && node.dataset.newLine) {
          stats.characterCount += 1;
        } else if (node.nodeType === Node.TEXT_NODE) {
          // strip off 'Zero-width space' (\u200b) and "Non-breaking space" (\u00a0)
          stats.characterCount += _.chain(node.nodeValue).replace(new RegExp(NON_BREAKING_SPACE, 'g'), ' ').replace(new RegExp(ZERO_WIDTH_SPACE, 'g'), '').value().length;
        }
        return stats;
      }, {
        characterCount: 0,
        mergeTagsCount: 0
      });
    },

    handleInput () {
      this.debounceUpdateValue();
      this.fireChangeEvent();
    },

    handlePaste (event) {
      let text = event.clipboardData.getData('text');
      if (!this.multiLine) {
        text = _.replace(text, /\n/g, '');
      }
      this.insertAtSelection([document.createTextNode(text)]);
    },

    handleBlur () {
      if (this.suppressBlur) {
        this.suppressBlur = false;
      } else {
        this.$el.classList.remove('active');
        this.$refs.editable.scrollLeft = 0;
        this.$emit('blur');
      }
    },

    handleMouseUp () {
      this.normalizeSelection();
      this.$nextTick(() => {
        this.rememberSelection();
      });
    },

    handleFocus () {
      this.$emit('focus');
      this.$el.classList.add('active');
    },

    handleKeyDown (event) {
      if (this.keyPressed(event, 'Enter')) {
        this.handleEnterKeyDown(event);
      } else if (this.keyPressed(event, 'ArrowLeft')) {
        this.handleArrowLeftKeyDown(event);
      } else if (this.keyPressed(event, 'ArrowRight')) {
        this.handleArrowRightKeyDown(event);
      } else if (this.keyPressed(event, 'Backspace')) {
        this.handleBackspaceKeyDown(event);
      } else if (this.keyPressed(event, 'Delete')) {
        this.handleDeleteKeyDown(event);
      } else if (this.keyPressed(event, '{') && !this.disableVariables) {
        this.handleCurlyBracketKeyDown(event);
      }

      this.rememberSelection();
    },

    handleKeyUp (event) {
      if (this.keyPressed(event, 'Enter')) {
        event.preventDefault();
      } else if (this.keyPressed(event, 'ArrowDown')) {
        this.handleArrowDownKeyUp(event);
      } else if (this.keyPressed(event, 'ArrowUp')) {
        this.handleArrowUpKeyUp(event);
      } else if (this.keyPressed(event, 'End')) {
        this.handleEndKeyUp(event);
      } else if (this.keyPressed(event, 'Home')) {
        this.handleHomeKeyUp(event);
      }
    },

    handleEnterKeyDown (event) {
      if (this.multiLine) {
        const brNode = document.createElement('br');
        const leftWrapperNode = document.createTextNode(ZERO_WIDTH_SPACE);
        const rightWrapperNode = document.createTextNode(ZERO_WIDTH_SPACE);
        brNode.dataset.newLine = true;
        this.insertAtSelection([leftWrapperNode, brNode, rightWrapperNode]);
      }
      event.preventDefault();
    },

    handleArrowUpKeyUp () {
      this.normalizeSelection();
    },

    handleArrowDownKeyUp () {
      this.normalizeSelection();
    },

    handleEndKeyUp () {
      this.normalizeSelection();
    },

    handleHomeKeyUp () {
      this.normalizeSelection();
    },

    handleArrowLeftKeyDown (event) {
      const selection = this.getCurrentTextSelection();
      const range = selection.characterRange;
      const start = range.start;
      const end = range.end;
      const text = this.editable.innerText;

      if (event.altKey || event.ctrKey || event.metaKey) {
        this.debounceNormalizeSelection();
      } else if (!event.shiftKey && start === end &&
                    text[start - 1] === ZERO_WIDTH_SPACE &&
                    text[start - 2] === '}' &&
                    text[start - 3] === '{' &&
                    text[start - 4] === ZERO_WIDTH_SPACE) {
        selection.characterRange.start = start - 4;
        selection.characterRange.end = start - 4;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (!event.shiftKey && start === end &&
                    text[start - 1] === ZERO_WIDTH_SPACE &&
                    text[start - 2] === '\n' &&
                    text[start - 3] === ZERO_WIDTH_SPACE) {
        const newPosition = start - 3;
        selection.characterRange.start = newPosition;
        selection.characterRange.end = newPosition;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (event.shiftKey && (selection.backward || start === end) &&
                    text[start - 1] === ZERO_WIDTH_SPACE &&
                    text[start - 2] === '}' &&
                    text[start - 3] === '{' &&
                    text[start - 4] === ZERO_WIDTH_SPACE) {
        selection.characterRange.start = start - 4;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (event.shiftKey && !selection.backward &&
                    text[end - 1] === ZERO_WIDTH_SPACE &&
                    text[end - 2] === '}' &&
                    text[end - 3] === '{' &&
                    text[end - 4] === ZERO_WIDTH_SPACE) {
        selection.characterRange.end = end - 4;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (event.shiftKey && selection.backward &&
                    text[end - 1] === ZERO_WIDTH_SPACE &&
                    text[end - 2] === '\n' &&
                    text[end - 3] === ZERO_WIDTH_SPACE) {
        selection.characterRange.start = start - 3;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (event.shiftKey && !selection.backward &&
                    text[end - 1] === ZERO_WIDTH_SPACE &&
                    text[end - 2] === '\n' &&
                    text[end - 3] === ZERO_WIDTH_SPACE) {
        selection.characterRange.end = end - 3;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (event.shiftKey && !selection.backward && start < end) {
        selection.characterRange.end = end - 1;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (event.shiftKey && selection.backward) {
        selection.characterRange.start = start - 1;
        this.setTextSelection(selection);
        event.preventDefault();
      }
    },

    handleArrowRightKeyDown (event) {
      const selection = this.getCurrentTextSelection();
      const range = selection.characterRange;
      const start = range.start;
      const end = range.end;
      const text = this.editable.innerText;

      if (event.altKey || event.ctrKey || event.metaKey) {
        this.debounceNormalizeSelection();
      } else if (!event.shiftKey && start === end &&
                    text[start] === ZERO_WIDTH_SPACE &&
                    text[start + 1] === '{' &&
                    text[start + 2] === '}' &&
                    text[start + 3] === ZERO_WIDTH_SPACE) {
        selection.characterRange.start = start + 4;
        selection.characterRange.end = start + 4;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (!event.shiftKey && start === end &&
                    text[start] === ZERO_WIDTH_SPACE &&
                    text[start + 1] === '\n' &&
                    text[start + 2] === ZERO_WIDTH_SPACE) {
        const newPosition = start + 3;
        selection.characterRange.start = newPosition;
        selection.characterRange.end = newPosition;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (event.shiftKey && selection.backward &&
                    text[start] === ZERO_WIDTH_SPACE &&
                    text[start + 1] === '{' &&
                    text[start + 2] === '}' &&
                    text[start + 3] === ZERO_WIDTH_SPACE) {
        selection.characterRange.start = start + 4;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (event.shiftKey && !selection.backward &&
                    text[end] === ZERO_WIDTH_SPACE &&
                    text[end + 1] === '{' &&
                    text[end + 2] === '}' &&
                    text[end + 3] === ZERO_WIDTH_SPACE) {
        selection.characterRange.end = end + 4;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (event.shiftKey && selection.backward &&
                    text[start] === ZERO_WIDTH_SPACE &&
                    text[start + 1] === '\n' &&
                    text[start + 2] === ZERO_WIDTH_SPACE) {
        selection.characterRange.start = start + 3;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (event.shiftKey && !selection.backward &&
                    text[end] === ZERO_WIDTH_SPACE &&
                    text[end + 1] === '\n' &&
                    text[end + 2] === ZERO_WIDTH_SPACE) {
        selection.characterRange.end = end + 3;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (event.shiftKey && !selection.backward) {
        selection.characterRange.end = end + 1;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (event.shiftKey && selection.backward && start < end) {
        selection.characterRange.start = start + 1;
        this.setTextSelection(selection);
        event.preventDefault();
      }
    },

    handleBackspaceKeyDown (event) {
      const selection = this.getCurrentTextSelection();
      const range = selection.characterRange;
      const start = range.start;
      const end = range.end;
      const text = this.editable.innerText;

      if (start === end &&
                    text[start - 1] === ZERO_WIDTH_SPACE &&
                    text[start - 2] === '}' &&
                    text[start - 3] === '{' &&
                    text[start - 4] === ZERO_WIDTH_SPACE) {
        selection.characterRange.start = start - 4;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (start === end &&
                    text[start - 1] === ZERO_WIDTH_SPACE &&
                    text[start - 2] === '\n' &&
                    text[start - 3] === ZERO_WIDTH_SPACE) {
        selection.characterRange.start = start - 3;
        this.setTextSelection(selection);
        this.insertAtSelection();
        event.preventDefault();
      }
    },

    handleCurlyBracketKeyDown (event) {
      this.insertAndFocusMergeTagAtSelection();
      event.preventDefault();
    },

    handleDeleteKeyDown (event) {
      const selection = this.getCurrentTextSelection();
      const range = selection.characterRange;
      const start = range.start;
      const end = range.end;
      const text = this.editable.innerText;

      if (this.keyPressed(event, 'Delete') && start === end &&
                    text[start] === ZERO_WIDTH_SPACE &&
                    text[start + 1] === '{' &&
                    text[start + 2] === '}' &&
                    text[start + 3] === ZERO_WIDTH_SPACE) {
        selection.characterRange.end = start + 4;
        this.setTextSelection(selection);
        event.preventDefault();
      } else if (this.keyPressed(event, 'Delete') && start === end &&
                    text[start] === ZERO_WIDTH_SPACE &&
                    text[start + 1] === '\n' &&
                    text[start + 2] === ZERO_WIDTH_SPACE) {
        selection.characterRange.end = start + 2;
        this.setTextSelection(selection);
        this.insertAtSelection();
        event.preventDefault();
      }
    },

    insertAtSelection (nodes) {
      this.focusEditable();
      this.$nextTick(() => {
        if (this.lastTextSelectionRangy) {
          this.setTextSelection(this.lastTextSelectionRangy);
        } else {
          this.setSelectionToEditableEnd();
        }

        const range = this.getCurrentSelectionRange();

        range.deleteContents();
        if (nodes) {
          let nodesLength = 0;
          _.forEach(nodes, node => {
            if (node.nodeName === 'BR') {
              // in Firefox innerText of BR is empty
              nodesLength += 1;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              nodesLength += node.innerText.length;
            } else if (node.nodeType === Node.TEXT_NODE) {
              nodesLength += node.nodeValue.length;
            }

            range.insertNode(node);
          });

          // compensate for ZERO_WIDTH_SPACE wrapping
          const textSelection = this.getCurrentTextSelection();
          textSelection.characterRange.start += nodesLength;
          textSelection.characterRange.end = textSelection.characterRange.start;
          this.updateValue(textSelection);
        } else {
          const textSelection = this.getCurrentTextSelection();
          textSelection.characterRange.start = textSelection.characterRange.end;
          this.setTextSelection(textSelection);
        }
        this.fireChangeEvent();
      });
    },

    insertAndFocusMergeTagAtSelection (path, focus = true) {
      console.log('insertAndFocusMergeTagAtSelection');
      this.debounceUpdateValue.cancel();
      this.focusEditable();
      this.$nextTick(() => {
        if (this.lastTextSelectionRangy) {
          this.setTextSelection(this.lastTextSelectionRangy);
        } else {
          const editableLength = this.editable.innerText.length;
          this.setTextSelection({
            characterRange: {
              end: editableLength,
              start: editableLength
            },
            backward: false,
            characterOptions: undefined
          });
        }

        const range = this.getCurrentSelectionRange();

        range.deleteContents();

        const mergeTagNode = document.createElement('span');
        mergeTagNode.setAttribute('class', 'variable');
        mergeTagNode.setAttribute('contenteditable', 'false');
        mergeTagNode.dataset.variable = path || '';
        mergeTagNode.innerHTML = '{}';
        range.insertNode(document.createTextNode(ZERO_WIDTH_SPACE));
        range.insertNode(mergeTagNode);
        range.insertNode(document.createTextNode(ZERO_WIDTH_SPACE));
        let indexFound = false;
        const index = _.reduce(this.editable.childNodes, (tagIndex, node) => {
          if (indexFound) {
            return tagIndex;
          }
          if (node.nodeType === Node.ELEMENT_NODE && node.dataset && _.isString(node.dataset.variable)) {
            if (node === mergeTagNode) {
              indexFound = true;
            } else {
              tagIndex += 1;
            }
          }
          return tagIndex;
        }, 0);

        // don't fire off blur event during caret transition from editable to merge-tag
        this.suppressBlur = true;
        this.mountMergeTagComponents();
        if (focus) {
          if (this.mergeTags[index]) {
            this.mergeTags[index].focus();
          }
        } else {
          this.blurEditable();
        }

        this.fireChangeEvent();
      });
    },

    keyPressed (event, key) {
      // eslint-disable-next-line quote-props
      const keyCodes = {
        'ArrowDown': 40,
        'ArrowLeft': 37,
        'ArrowRight': 39,
        'ArrowUp': 38,
        'Backspace': 8,
        'Delete': 46,
        'End': 35,
        'Enter': 13,
        'Home': 36,
        '{': 123
      };
      return event.key === key || event.keyCode === keyCodes[key];
    },

    normalizeSelection () {
      if (!this.editable.innerText) {
        return;
      }

      const selection = this.getCurrentTextSelection();
      const range = selection.characterRange;

      const leftToStartSymbol = this.editable.innerText[range.start - 1];
      const rightToStartSymbol = this.editable.innerText[range.start];
      const leftToEndSymbol = this.editable.innerText[range.end - 1];
      const rightToEndSymbol = this.editable.innerText[range.end];

      if (leftToStartSymbol === ZERO_WIDTH_SPACE && (rightToStartSymbol === '{' || rightToStartSymbol === '\n')) {
        selection.characterRange.start -= 1;
      } else if ((leftToStartSymbol === '}' || leftToStartSymbol === '\n') && rightToStartSymbol === ZERO_WIDTH_SPACE) {
        selection.characterRange.start += 1;
      }

      if (leftToEndSymbol === ZERO_WIDTH_SPACE && (rightToEndSymbol === '{' || rightToEndSymbol === '\n')) {
        selection.characterRange.end -= 1;
      } else if ((leftToEndSymbol === '}' || leftToEndSymbol === '\n') && rightToEndSymbol === ZERO_WIDTH_SPACE) {
        selection.characterRange.end += 1;
      }

      this.setTextSelection(selection);
    },

    updateValue (selection) {
      const newValue = _.chain(this.editable.childNodes)
        .map(node => {
          if (node.nodeType === Node.ELEMENT_NODE && node.dataset && _.isString(node.dataset.variable)) {
            return { path: node.dataset.variable };
          } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'BR' && this.multiLine && node.dataset && node.dataset.newLine) {
            // convert <br> to \n for multi-lined input
            return '\n';
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            // strip off 'Zero-width space' (\u200b) and "Non-breaking space" (\u00a0)
            return _.chain(node.innerText).replace(new RegExp(NON_BREAKING_SPACE, 'g'), ' ').replace(new RegExp(ZERO_WIDTH_SPACE, 'g'), '').value();
          } else if (node.nodeType === Node.TEXT_NODE) {
            // strip off 'Zero-width space' (\u200b) and "Non-breaking space" (\u00a0)
            return _.chain(node.nodeValue).replace(new RegExp(NON_BREAKING_SPACE, 'g'), ' ').replace(new RegExp(ZERO_WIDTH_SPACE, 'g'), '').value();
          } else {
            return '';
          }
        })
        .compact()
        .reduce((memo, item) => {
          const lastItem = _.last(memo);
          if (_.isObject(item)) {
            memo.push(item);
          } else if (_.isString(lastItem)) {
            memo.splice(-1, 1, lastItem + item);
          } else {
            memo.push(item);
          }

          return memo;
        }, [])
        .value();

      // remember lastKnownStringifiedValue to not do the
      // unnecessaary editable update and merge-tag mount
      this.lastKnownValue = newValue;
      this.$emit('input', newValue);

      if (selection) {
        this.$nextTick(() => {
          // TODO: ask Andrey why it's here
          if (this.$refs.editable) {
            this.$refs.editable.focus();
          }
          this.setTextSelection(selection);
        });
      }
    },

    rememberSelection () {
      this.lastTextSelectionRangy = this.getCurrentTextSelection();
    },

    forgetSelection () {
      this.lastTextSelectionRangy = null;
    },

    /**
             * Convert all <span data-variable="">{}</span> elements to merge-tag Vue components
             */
    mountMergeTagComponents () {
      // destroy all merge-tag components from the previous convertion
      _.forEach(this.mergeTags, tag => {
        tag.$destroy();
      });
      // clean up the list of merge-tag components
      this.mergeTags = [];

      // variable to calculate every tag ending (easier then starting) position in the text
      let currentTextPosition = 0;
      _.forEach(this.editable.childNodes, node => {
        // increase currentTextPosition by 1 if we encounter <BR>
        if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'BR') {
          currentTextPosition += 1;
          // increase currentTextPosition by innerText length if we encounter element node
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          currentTextPosition += node.innerText.length;
          // increase currentTextPosition by nodeValue length if we encounter text node
        } else if (node.nodeType === Node.TEXT_NODE) {
          currentTextPosition += node.nodeValue.length;
        }
        if (node.nodeType === Node.ELEMENT_NODE && node.dataset && _.isString(node.dataset.variable)) {
          const tag = new MergeTag({
            el: node,
            propsData: {
              value: node.dataset.variable,
              textPosition: currentTextPosition,
              steps: this.steps,
              stepId: this.stepId,
              mergeFields: this.mergeFields,
              readonly: this.readonly,
              maxWidth: this.getEditableWidth()
            }
          });
          // update value on merge tag (since vue 2.0 is no longer auto-reactive)
          tag.$on('input', value => {
            node.dataset.variable = value;
            tag.value = value;
          });
          tag.$on('mousedown', () => {
            this.suppressBlur = true;
          });
          // reaction on merge-tag 'editing start'/focus
          tag.$on('start-editing', () => {
            this.suppressBlur = true;
            // remain "focused"
            this.$el.classList.add('merge-tag-active');
            // inform parent text-expression component that it should remain "focused"
            this.$emit('focus');
          });
          // reaction on merge-tag 'editing end'/blur
          tag.$on('finish-editing', params => {
            // if textPosition is in the event params
            if (params && params.textPosition) {
              // updateValue and remain focused putting caret after merge tag
              this.updateValue({
                characterRange: {
                  end: params.textPosition + 1,
                  start: params.textPosition + 1
                },
                backward: false,
                characterOptions: undefined
              });
            } else {
              // stop being focused
              this.$el.classList.remove('merge-tag-active');
              this.$el.classList.remove('active');
              // inform parent text-expression component that it should not remain "focused"
              if (this.suppressBlur) {
                this.suppressBlur = false;
              } else {
                this.$emit('blur');
              }
              this.updateValue();
            }
          });
          this.mergeTags.push(tag);
        }
      });
    }
  }
};
/* eslint-enable no-magic-numbers */
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../styles/fonts';
    @import '../../../styles/colors';

    .or-editable-wrapper {
        font-family: $font-family;
        cursor: text;
        position: relative;
        border-radius: 3px;
        background-color: $light-grey;
        border: solid 1px $grey-main-border-color;
        transition: border-color 0.5s ease-out, background-color 0.5s ease-out;

        .editable {
            font-size: 14px;
            text-align: left;
            color: $dark-blue-grey;
            padding: 7px 10px;
            min-height: 36px;
            outline: none;
            overflow: hidden;
            user-select: text;
            -moz-user-select: text;
            -webkit-user-select: text;
            -ms-user-select: text;
        }

        .placeholder {
            position: relative;
            margin-top: -36px;
            padding: 7px 10px;
            color: $text-grey;
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        &:not(.readonly):hover {
            border-color: $grey-darker-border-color;
            background-color: $white;
        }

        &.active,
        &:not(.readonly):hover.active,
        &.merge-tag-active {
            background-color: $white;
            border-color: $active;
        }

        &.readonly {
            cursor: default;

            .editable {
                min-height: 36px;
                color: rgba(0, 0, 0, 0.38);

                .merge-tag {
                    cursor: default;
                    opacity: 0.38;
                }
            }
        }

        &.single-line {
            white-space: nowrap;
        }
    }
</style>
