<template>
  <span
    @mouseup.stop
    @keyup.stop
    @keydown.stop
    @input.stop
    :data-variable="innerValue"
    :style="readonly ? inputStyle : ''"
    :class="{'merge-tag' : true, 'readonly' : readonly}"
    contenteditable="false"
  >
    <span
      v-if="readonly"
    >{{ '{' + innerValue + '}' }}</span>
    <span v-if="!readonly">
      {<input
        ref="input"
        :style="inputStyle"
        v-model="innerValue"
        @paste.stop
        @click.stop
        @mouseup.stop="handleMouseup"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown="handleKeyDown"
        @mousedown="handleMouseDown"
        @keyup="handleKeyUp"
        type="text"
      >}</span>
    <or-popover
      ref="dataOutPopover"
      :constrain-to-parent="false"
      v-if="!readonly && editing"
      :close-on-blur="false"
      position="bottom left"
      class="data-outs"
      trigger="input"
      open-on="focus"
    >
      <div
        ref="dataOutsWrapper"
        class="list-wrapper"
      >
        <div
          v-for="dataOutTitled in groupedFilter"
          :key="dataOutTitled.title"
        >
          <div
            class="list-title"
          >{{ dataOutTitled.title }}</div>
          <div
            v-for="(dataOut) in dataOutTitled.variables"
            @mousedown.stop.prevent="handleMergeTagMouseDown(dataOut.variableName)"
            :class="[getDataOutClass(dataOut, dataOut.index), 'list-item']"
            :key="`${dataOut.flowId}:s${dataOut.variableName}`"
          >{{ dataOut.variableName }}</div>
        </div>
      </div>
    </or-popover>
  </span>
</template>

<script>
// import * as _ from 'lodash';
import dataOuts from '../../../mixins/data_outs';
import OrPopover from '../popover.vue';

const INPUT_MINIMAL_WIDTH = 5;
const CURLY_WRAPPERS_WIDTH = 20;
const POPOVER_MARGIN = 40;

export default {
  components: {
    orPopover: OrPopover
  },

  mixins: [dataOuts],

  props: {
    value: {
      type: String,
      default: ''
    },
    textPosition: {
      type: Number,
      default: 0
    },
    steps: {
      type: Array,
      default () {
        return [];
      }
    },
    stepId: {
      type: String,
      default: ''
    },
    mergeFields: {
      type: Array,
      default () {
        return [];
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      editing: false,
      selectedTagIndex: null
    };
  },

  computed: {
    inputStyle () {
      const valueWidth = this.getValueWidth();
      const maxWidth = this.maxWidth - CURLY_WRAPPERS_WIDTH;
      const width = this.maxWidth && valueWidth > maxWidth ? maxWidth : valueWidth;
      return {
        width: `${width}px`
      };
    },

    groupedFilter () {
      const grouped = this.filteredDataOuts.reduce((acc, curr) => {
        if (!acc[curr.title]) acc[curr.title] = []; // If this type wasn't previously stored
        acc[curr.title].push(curr);
        return acc;
      }, {});

      const filterResult = [];

      for (const [key, value] of Object.entries(grouped)) {
        filterResult.push({
          title: key,
          variables: value
        });
      }

      return filterResult;
    },

    filteredDataOuts () {
      let filteredData = (this.dataOuts || []).flatMap(titled => (titled.variables || []).map(dataOut => ({ ...dataOut, title: titled.title })));
      if (this.innerValue) {
        filteredData = filteredData.filter(dataOut => (dataOut.variableName || '').startsWith(this.innerValue));
      }
      return filteredData.map((value, index) => ({ ...value, index }));
    },

    innerValue: {
      get () {
        return this.value;
      },
      set (newValue) {
        this.$emit('input', newValue);
      }
    }
  },

  methods: {
    handleMouseDown () {
      this.$emit('mousedown');
    },
    setMaxWidth (maxWidth) {
      this.maxWidth = maxWidth;
    },

    scrollSelectedItemToVisibility () {
      const wrapper = this.$refs.dataOutsWrapper;
      const items = (wrapper.getElementsByClassName('list-item') || []).reduce((memo, node) => {
        if (!memo.first && node && node.offsetTop >= wrapper.scrollTop) {
          memo.first = node;
        }

        if (node && node.offsetTop + node.clientHeight <= wrapper.scrollTop + wrapper.clientHeight) {
          memo.last = node;
        }

        if (node && node.classList.contains('active')) {
          memo.selected = node;
        }

        return memo;
      }, {
        first: null,
        last: null,
        selected: null
      });

      if (items.selected && items.first && items.selected.offsetTop < items.first.offsetTop) {
        wrapper.scrollTop = items.selected.offsetTop;
      } else if (items.selected && items.last && items.selected.offsetTop > items.last.offsetTop) {
        wrapper.scrollTop = items.selected.offsetTop - wrapper.clientHeight + items.selected.clientHeight;
      }
    },

    focus () {
      this.$refs.input.focus();
    },

    getDataOutClass (dataOut, index) {
      return `${dataOut.subObject ? 'sub-object' : 'root'} ${index === this.selectedTagIndex
        ? 'active'
        : ''}`;
    },

    getValueWidth () {
      const tempSpan = document.createElement('span');
      tempSpan.classList.add('temp-ruler-span');
      tempSpan.innerHTML = this.readonly ? `{${this.innerValue}}` : this.innerValue;
      document.body.appendChild(tempSpan);
      const width = tempSpan.offsetWidth;
      tempSpan.remove();
      return width || INPUT_MINIMAL_WIDTH;
    },

    handleFocus () {
      this.startEditing();
    },

    handleBlur () {
      this.finishEditing();
    },

    handleMergeTagMouseDown (variableName) {
      this.setPath(variableName);
      this.$nextTick(() => {
        this.finishEditing(true);
      });
    },

    handleMouseup () {
      this.focus();
    },

    handleKeyUp (event) {
      if (this.keyPressed(event, 'Enter')) {
        this.handleEnter(event);
      }
    },

    handleKeyDown (event) {
      if (this.keyPressed(event, 'Enter')) {
        event.preventDefault();
      } else if (this.keyPressed(event, 'ArrowDown')) {
        this.handleArrowDown(event);
      } else if (this.keyPressed(event, 'ArrowUp')) {
        this.handleArrowUp(event);
      } else if (this.keyPressed(event, 'Space')) {
        this.handleSpace(event);
      }
    },

    handleEnter (event) {
      if (this.selectedTagIndex === null) {
        this.finishEditing(true);
      } else {
        this.setPath(this.filteredDataOuts[this.selectedTagIndex].variableName);
        this.$nextTick(() => {
          this.finishEditing(true);
        });
      }
      event.preventDefault();
      event.stopPropagation();
    },

    handleArrowDown (event) {
      if (this.selectedTagIndex === null) {
        this.selectedTagIndex = 0;
      } else if (this.selectedTagIndex < this.filteredDataOuts.length - 1) {
        this.selectedTagIndex += 1;
      }
      this.$nextTick(() => {
        this.scrollSelectedItemToVisibility();
      });
      event.preventDefault();
    },

    handleArrowUp (event) {
      if (this.selectedTagIndex === 0) {
        this.selectedTagIndex = null;
      } else if (this.selectedTagIndex > 0) {
        this.selectedTagIndex -= 1;
      }
      this.$nextTick(() => {
        this.scrollSelectedItemToVisibility();
      });
      event.preventDefault();
    },

    handleSpace (event) {
      this.finishEditing(true);
      event.preventDefault();
    },

    keyPressed (event, key) {
      const keyCodes = {
        Enter: 13,
        ArrowUp: 38,
        ArrowDown: 40,
        Space: 32
      };

      return event.key === key || event.keyCode === keyCodes[key];
    },

    startEditing () {
      this.$emit('start-editing');
      this.editing = true;

      this.$nextTick(() => {
        const maxWidth = Math.floor(window.innerHeight / 2 - POPOVER_MARGIN);
        this.$refs.dataOutsWrapper.style.maxHeight = `${maxWidth}px`;
        this.$refs.dataOutPopover.open();
      });
    },

    /**
             * signal editable that merge tag editing is ended
             * and possibly set caret right after the tag
             * @param {Boolean} setCaretAfterTag - set to 'true' to leave text-expression focused
             */
    finishEditing (setCaretAfterTag) {
      this.$refs.dataOutPopover.close();
      this.$refs.input.blur();
      this.editing = false;

      if (setCaretAfterTag) {
        this.$emit('finish-editing', { textPosition: this.textPosition });
      } else {
        this.$emit('finish-editing');
      }
    },

    setPath (path) {
      this.innerValue = path;
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import '../../../styles/mixins';
    @import '../../../styles/colors';

    .merge-tag {
        display: inline-block;
        color: $active;
        position: relative;
        white-space: nowrap;
        -moz-user-select: text !important;
        >span{
            -moz-user-select: text !important;
        }

        input {
            border: none;
            outline: none;
            color: $active;
            display: inline;
            margin: 0;
            padding: 0;
            font-size: 14px;
            font-style: normal;
            font-stretch: normal;
            background: transparent;
            -moz-user-select: text !important;

            @include normal-font;
        }
    }

    .or-popover.data-outs {
        padding: 0;

        .list-wrapper {
            overflow: auto;
            font-size: 14px;

            @include normal-font;

            .list-title {
                padding-left: 10px;
                font-weight: bold;
                margin-top: 5px;
                border-bottom: 1px solid grey;
                padding-bottom: 2px;
            }

            .list-item {
                cursor: pointer;
                padding: 2px 10px;

                &.sub-object {
                    color: $grey-label-color;
                    padding-left: 20px;
                }

                &:hover, &.active {
                    background-color: #eee;
                }
            }
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../styles/mixins';

    span.temp-ruler-span {
        border: none;
        outline: none;
        display: inline;
        margin: 0;
        padding: 0;
        font-size: 14px;
        font-style: normal;
        font-stretch: normal;
        background: transparent;

        @include normal-font;
    }
</style>
