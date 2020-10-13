<template>
  <div
    :class="{'readonly' : readonly, 'invalid' : invalid, 'active' : active}"
    class="or-code"
  >
    <!-- SVG ICONS CONTAINER -->
    <svg
      class="svg-icon-holder"
      width="24px"
      height="14px"
      viewBox="0 0 24 14"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="varIcon" fill="inherit">
          <path
            id="{x}"
            d="M3.63347002,7.08106937 L3.63347002,6.95804652 C4.60398359,6.86919669 5.05506736,6.33609769 5.05506736,5.33824571 L5.05506736,3.7184449 C5.05506736,2.64541229 5.40363209,2.31735137 6.51767231,2.31735137 L6.82522943,2.31735137 L6.82522943,0.813738797 L6.10759616,0.813738797 C4.02304237,0.813738797 3.14821324,1.56554508 3.14821324,3.38354937 L3.14821324,4.64795085 C3.14821324,5.71414885 2.86115993,6.06954819 2,6.06954819 L2,7.96273311 C2.86115993,7.96273311 3.14821324,8.31813244 3.14821324,9.37749584 L3.14821324,10.8674392 C3.14821324,12.7264511 4.02987697,13.4987612 6.10759616,13.4987612 L6.82522943,13.4987612 L6.82522943,12.0019832 L6.51767231,12.0019832 C5.41046669,12.0019832 5.05506736,11.6739223 5.05506736,10.6077243 L5.05506736,8.83072763 C5.05506736,7.78503344 4.56297597,7.16991921 3.63347002,7.08106937 Z M12.0205038,8.7282086 L13.4215973,11.1886655 L15.6360086,11.1886655 L13.2507323,7.37495728 L15.6155048,3.65009887 L13.4421011,3.65009887 L12.1093536,6.12422501 L11.9863308,6.12422501 L10.6535833,3.65009887 L8.37082602,3.65009887 L10.7492677,7.46380712 L8.38449523,11.1886655 L10.4963874,11.1886655 L11.897481,8.7282086 L12.0205038,8.7282086 Z M20.36653,7.08106937 C19.437024,7.16991921 18.9449326,7.78503344 18.9449326,8.83072763 L18.9449326,10.6077243 C18.9449326,11.6739223 18.5895333,12.0019832 17.4823277,12.0019832 L17.1747706,12.0019832 L17.1747706,13.4987612 L17.8924038,13.4987612 C19.970123,13.4987612 20.8517868,12.7264511 20.8517868,10.8674392 L20.8517868,9.37749584 C20.8517868,8.31813244 21.1388401,7.96273311 22,7.96273311 L22,6.06954819 C21.1388401,6.06954819 20.8517868,5.71414885 20.8517868,4.64795085 L20.8517868,3.38354937 C20.8517868,1.56554508 19.9769576,0.813738797 17.8924038,0.813738797 L17.1747706,0.813738797 L17.1747706,2.31735137 L17.4823277,2.31735137 C18.5963679,2.31735137 18.9449326,2.64541229 18.9449326,3.7184449 L18.9449326,5.33824571 C18.9449326,6.33609769 19.3960164,6.86919669 20.36653,6.95804652 L20.36653,7.08106937 Z"
          />
        </g>
      </defs>
    </svg>
    <!-- SVG ICONS CONTAINER END -->
<!-- 
    <div v-if="!hideHeader && (label || hasVariables || fullScreen)" class="header">
      <div v-if="label" class="label-text">
        {{ label }}
      </div>
      fooooo
      <or-icon-button
        ref="fullscreen"
        @click="openFullScreen"
        v-if="fullScreen"
        class="full-screen flat"
        type="secondary"
        tooltip="Full screen"
        icon="fullscreen"
      />
      <or-icon-button
        ref="addVariable"
        v-if="hasVariables && !readonly"
        @click="openDataOutPopover"
        class="add-variable flat"
        type="secondary"
        tooltip="Add variable"
      >
        <div slot="default" class="svg-icon-position">
          <svg width="24px" height="14px">
            <use xlink:href="#varIcon" />
          </svg>
        </div>
      </or-icon-button>
    </div> -->
    <div ref="editor" v-if="!fullScreenOpened" class="ace-wrapper" />
    <div v-if="helpText && !invalid && !fullScreenOpened" class="help-text">
      {{ helpText }}
    </div>
    <div v-if="invalid && !fullScreenOpened" class="error-text">
      {{ error }}
    </div>
    <!-- <or-popover
      ref="dataOutPopoverInline"
      v-if="!isInnerComponent && hasVariables && !readonly && !fullScreenOpened"
      :close-on-blur="true"
      @close="dataOutPopoverClosed"
      class="data-outs"
      trigger="addVariable"
      open-on="click"
    >
      <div ref="dataOutsWrapper" class="list-wrapper">
        <div v-for="dataOutTitled in dataOuts" :key="dataOutTitled.title">
          <div class="list-title">
            {{ dataOutTitled.title }}
          </div>
          <div
            v-for="(dataOut, index) in dataOutTitled.variables"
            @mousedown="addVariableInline(dataOut.variableName)"
            :class="[getDataOutClass(dataOut, index), 'list-item']"
            :key="`${dataOut.flowId}:s${dataOut.variableName}`"
          >
            {{ dataOut.variableName }}
          </div>
        </div>
      </div>
    </or-popover> -->
    <!-- <or-modal
      ref="fullScreenEditor"
      v-if="fullScreen && fullScreenOpened"
      :title="label"
      @close="fullScreenClosed"
      class="max-width max-height"
    >
      <div v-if="hasVariables || hasCodeBeautify" class="header">
        <or-icon-button
          ref="addVariableFullScreen"
          v-if="hasVariables && !readonly"
          @click="openDataOutPopoverFullScreen"
          class="add-variable flat"
          type="secondary"
          tooltip="Add variable"
        >
          <div slot="default" class="svg-icon-position">
            <svg width="24px" height="14px">
              <use xlink:href="#varIcon" />
            </svg>
          </div>
        </or-icon-button>
        <or-icon-button
          v-if="hasCodeBeautify && !readonly"
          @click="beautifyCode"
          class="beautify-code flat"
          type="secondary"
          icon="spa"
          tooltip="Beautify code"
        />
      </div>
      <div ref="editorFullScreen" class="ace-wrapper fullscreen" />
    </or-modal> -->
    <!-- <or-popover
      ref="dataOutPopoverFullScreen"
      v-if="hasVariables && !readonly && fullScreen && fullScreenOpened && dataOutPopoverFullScreenOpened"
      :close-on-blur="true"
      @close="dataOutPopoverFullScreenClosed"
      class="data-outs"
      trigger="addVariableFullScreen"
      open-on="click"
    >
      <div ref="dataOutsWrapperFullScreen" class="list-wrapper">
        <div ref="dataOutsWrapper" class="list-wrapper">
          <div v-for="dataOutTitled in dataOuts" :key="dataOutTitled.title">
            <div class="list-title">
              {{ dataOutTitled.title }}
            </div>
            <div
              v-for="(dataOut, index) in dataOutTitled.variables"
              @mousedown="addVariableFullScreen(dataOut.variableName)"
              :class="[getDataOutClass(dataOut, index), 'list-item']"
              :key="`${dataOut.flowId}:s${dataOut.variableName}`"
            >
              {{ dataOut.variableName }}
            </div>
          </div>
        </div>
      </div>
    </or-popover> -->
  </div>
</template>


<script>
/* eslint-disable sort-imports */
import ace from 'brace';
import 'brace/mode/ejs';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/html';
import 'brace/mode/markdown';
import 'brace/mode/scss';
import 'brace/theme/chrome';
import 'brace/ext/searchbox';
import 'brace/ext/tern';
// import * as _ from 'lodash';
import beautify from 'js-beautify';
import dataOuts from '../../mixins/data_outs';
import ternWorker from 'brace/worker/tern';
// import OrIconButton from './icon_button.vue';
// import OrModal from './modal.vue';
// import OrPopover from './popover.vue';
import OrSdkDef from '../../mixins/def_or_sdk.json';
import utils from '../../helpers/utils';
/* eslint-enable */

const ADJUST_HEIGHT_INTERVAL = 1000;
const EDITOR_LINE_HEIGHT = 16;
const DEFAULT_EDITOR_MAX_LINES = 15;
const POPOVER_MARGIN = 40;

const EDITOR_INLINE = 'inline';
const EDITOR_FULL_SCREEN = 'fullScreen';

export default {
  name: 'OrCode',

  components: {
    // orIconButton: OrIconButton,
    // orModal: OrModal,
    // orPopover: OrPopover
  },

  mixins: [
    dataOuts
  ],

  props: {
    value: {
      default: '',
      type: String
    },
    readonly: {
      default: false,
      type: Boolean
    },
    disableVariables: {
      default: false,
      type: Boolean
    },
    disableAutocomplete: {
      default: false,
      type: Boolean
    },
    disableWarnings: {
      default: null, // null has to be here to set up initial value depending on other props, can't do it here
      type: Boolean
    },
    jsEnv: {
      default: 'ecma6',
      type: String
    },
    mode: {
      default: 'javascript',
      type: String
    },
    adjustToHeight: {
      default: false,
      type: Boolean
    },
    fullScreen: {
      default: true,
      type: Boolean
    },
    hideHeader: {
      default: false,
      type: Boolean
    },
    isInnerComponent: {
      default: false,
      type: Boolean
    },
    invalid: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    label: String,
    helpText: String,
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
    const disableWorkers = this.disableWarnings === null
      ? !this.mode || this.mode === 'ejs' || this.mode === 'javascript'
      : this.disableWarnings;

    return {
      active: false,
      fullScreenOpened: false,
      lines: 0,
      valueBuffer: this.value,
      editors: {
        [EDITOR_INLINE]: { lines: 0, adjustHeightTimer: null, instance: null },
        [EDITOR_FULL_SCREEN]: { lines: 0, adjustHeightTimer: null, instance: null }
      },
      dataOutPopoverFullScreenOpened: false,
      dataOutPopoverOpened: false,
      disableWorkers
    };
  },

  computed: {
    editorValue: {
      get () {
        return this.valueBuffer;
      },
      set (value) {
        this.valueBuffer = value;
        this.$emit('input', value);
      }
    },
    hasVariables () {
      return !this.disableVariables && this.steps;
    },

    hasCodeBeautify () {
      return this.mode === 'javascript';
    }
  },

  watch: {
    value (value) {
      if (!utils.isEqual(this.editorValue, value)) {
        const editor = this.fullScreenOpened
          ? this.editors[EDITOR_FULL_SCREEN].instance
          : this.editors[EDITOR_INLINE].instance;

        this.valueBuffer = value;
        this.setValue(editor);
      }
    }
  },

  beforeDestroy () {
    if (this.editors && this.editors.length) {
      this.editors.forEach(editor => {
        if (utils.hasIn(editor.instance, 'destroy')) {
          editor.instance.destroy();
        }
        clearTimeout(editor.adjustHeightTimer);
      });
    }
  },

  mounted () {
    this.editors[EDITOR_INLINE].instance = this.initAce(this.$refs.editor);
  },

  methods: {
    openDataOutPopoverFullScreen () {
      this.dataOutPopoverFullScreenOpened = true;
      this.$nextTick(() => {
        const maxWidth = Math.floor(window.innerHeight / 2 - POPOVER_MARGIN);
        this.$refs.dataOutsWrapperFullScreen.style.maxHeight = `${maxWidth}px`;
        this.$refs.dataOutPopoverFullScreen.open();
      });
    },

    dataOutPopoverFullScreenClosed () {
      this.dataOutPopoverFullScreenOpened = false;
    },

    openDataOutPopover () {
      this.dataOutPopoverOpened = true;
      this.$nextTick(() => {
        const maxWidth = Math.floor(window.innerHeight / 2 - POPOVER_MARGIN);
        this.$refs.dataOutsWrapper.style.maxHeight = `${maxWidth}px`;
        this.$refs.dataOutPopoverInline.reposition();
        this.$refs.dataOutPopoverInline.open();
      });
    },

    dataOutPopoverClosed () {
      this.dataOutPopoverOpened = false;
    },

    beautifyCode () {
      this.$emit('input', beautify(this.editorValue, { indent_size: 2 }));
    },

    openFullScreen () {
      this.fullScreenOpened = true;
      this.$nextTick(() => {
        this.editors[EDITOR_FULL_SCREEN].instance = this.initAce(this.$refs.editorFullScreen);
        this.$refs.fullScreenEditor.open();
        this.setValue(this.editors[EDITOR_FULL_SCREEN].instance);
        this.editors[EDITOR_INLINE].instance.destroy();
      });
    },

    fullScreenClosed () {
      this.editors[EDITOR_FULL_SCREEN].instance.destroy();
      this.fullScreenOpened = false;
      this.$nextTick(() => {
        this.editors[EDITOR_INLINE].instance = this.initAce(this.$refs.editor);
        this.setValue(this.editors[EDITOR_INLINE].instance);
      });
    },

    addVariableFullScreen (variable) {
      const editor = this.editors[EDITOR_FULL_SCREEN].instance;

      this.$refs.dataOutPopoverFullScreen.close();
      this.$nextTick(() => {
        this.insertVariable(variable, editor);
        editor.focus();
      });
    },

    addVariableInline (variable) {
      const editor = this.editors[EDITOR_INLINE].instance;

      this.$refs.dataOutPopoverInline.close();
      this.$nextTick(() => {
        this.insertVariable(variable, editor);
        editor.focus();
      });
    },

    insertVariable (variable, editor) {
      const value = this.convertMergeTagToCode(variable);
      const mergeVal = this.mode === 'html' ? `\${${value}}` : value;
      editor.insert(mergeVal);
    },

    adjustLinesToHeight (wrapper) {
      const type = this.getEditorType(wrapper);
      this.editors[type].adjustHeightTimer = setTimeout(() => this.adjustLinesToHeight(wrapper), ADJUST_HEIGHT_INTERVAL);
      const calculatedLines = this.calculateLines(wrapper);
      if (this.editors[type].instance && this.editors[type].lines !== calculatedLines) {
        this.editors[type].lines = calculatedLines;
        this.editors[type].instance.setOptions({ maxLines: calculatedLines });
      }
    },

    calculateLines (wrapper) {
      const height = wrapper?.clientHeight || 0;
      return Math.floor(height / EDITOR_LINE_HEIGHT);
    },

    getAceOptions (wrapper) {
      const type = this.getEditorType(wrapper);
      const adjustToHeight = type === EDITOR_FULL_SCREEN ? true : this.adjustToHeight;
      // if full screen mode is available show only limited lines of code
      const defaultMaxLines = this.fullScreen ? DEFAULT_EDITOR_MAX_LINES : Infinity;

      if (this.getMode() === 'ace/mode/javascript' && !this.disableAutocomplete && !this.readonly) {
        const defs = [];
        const plugins = {
          doc_comment: {
            fullDocs: true
          }
        };
        switch (this.jsEnv) {
        case 'step_ui' :
        case 'browser':
          defs.push('ecma6');
          break;
        case 'step_logic' :
          defs.push(OrSdkDef);
        case 'node' : // eslint-disable-line no-fallthrough
        case 'ecma5':
        case 'ecma6':
        default:
          plugins.node = {};
          defs.push('ecma6');
        }
        return {
          /**
                         * Either `true` or `false` or to enable with custom options pass object that
                         * has options for tern server: http://ternjs.net/doc/manual.html#server_api
                         * If `true`, then default options will be used
                         */
          enableTern: {
            /* http://ternjs.net/doc/manual.html#option_defs */
            defs,
            /* http://ternjs.net/doc/manual.html#plugins */
            plugins,
            /**
                             * (default is true) If web worker is used for tern server.
                             * This is recommended as it offers better performance, but prevents this from working in a local html file due to browser security restrictions
                             */
            disableDocsTooltip: true,
            useWorker: true,
            workerScript: ternWorker.src
            /* if your editor supports switching between different files (such as tabbed interface) then tern can do this when jump to defnition of function in another file is called, but you must tell tern what to execute in order to jump to the specified file */
            //                            switchToDoc (name, start) {
            //                                console.log(`switchToDoc called but not defined. name=${name}; start=${start}`);
            //                            },
            /**
                             * if passed, this function will be called once ternServer is started.
                             * This is needed when useWorker=false because the tern source files are loaded asynchronously before the server is started.
                             */
            //                            startedCb () {
            // once tern is enabled, it can be accessed via editor.ternServer
            //                            }
          },
          /**
                         * when using tern, Ace's basic text auto completion is enabled still by deafult.
                         * This settings affects all modes when using tern, not just javascript.
                         * For javascript mode the basic auto completion will be added to completion results if tern fails to find completions or if you double tab the hotkey for get completion (default is ctrl+space, so hit ctrl+space twice rapidly to include basic text completions in the result)
                         */
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          maxLines: adjustToHeight ? this.calculateLines(wrapper) : defaultMaxLines,
          tabSize: 2,
          useSoftTabs: true,
          autoScrollEditorIntoView: true
        };
      }

      return {
        maxLines: adjustToHeight ? this.calculateLines(wrapper) : defaultMaxLines,
        tabSize: 2,
        useSoftTabs: true,
        readOnly: this.readonly,
        autoScrollEditorIntoView: true
      };
    },

    initAce (wrapper) {
      const type = this.getEditorType(wrapper);
      const adjustToHeight = type === EDITOR_FULL_SCREEN ? true : this.adjustToHeight;
      const editor = ace.edit(wrapper);

      editor.setTheme('ace/theme/chrome');
      editor.getSession().setMode(this.getMode());

      editor.setOptions(this.getAceOptions(wrapper));

      if (this.disableWorkers) {
        editor.getSession().setUseWorker(false);
      }

      editor.$blockScrolling = Infinity;

      editor.getSession().on('change', () => {
        this.editorValue = editor.getValue();
      });

      editor.on('focus', () => {
        this.$emit('focus');
        if (!this.readonly) {
          this.active = true;
        }
      });

      editor.on('blur', () => {
        this.$emit('blur');
        this.active = false;
      });

      this.setValue(editor);

      if (adjustToHeight) {
        this.adjustLinesToHeight(wrapper);
      }

      return editor;
    },

    insertCode (params) {
      if (utils.has(params, 'lineNumber')) {
        this.editors[EDITOR_INLINE].instance.gotoLine(params.lineNumber + 1, 0);
        this.editors[EDITOR_INLINE].instance.insert(`${params.code}\n`);
      } else {
        this.editors[EDITOR_INLINE].instance.insert(params.code);
      }
    },

    getMode () {
      switch (this.mode) {
      case 'ejs' :
        return 'ace/mode/ejs';
      case 'html' :
        return 'ace/mode/html';
      case 'markdown' :
        return 'ace/mode/markdown';
      case 'scss' :
        return 'ace/mode/scss';
      case 'json' :
        return 'ace/mode/json';
      case 'javascript' :
      default:
        return 'ace/mode/javascript';
      }
    },

    getEditorType (wrapper) {
      return wrapper.classList.contains('fullscreen') ? EDITOR_FULL_SCREEN : EDITOR_INLINE;
    },

    setValue (editor) {
      editor.setValue(this.editorValue, -1); // -1 means position cursor at the end
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import '../../styles/colors';
    @import '../../styles/mixins';

    .or-code {
        min-height: 50px;
        margin-bottom: 12px;
        display: flex;
        flex-direction: column;

        @include normal-font;

        .svg-icon-holder {
            display: none;
        }

        .ace-wrapper {
            min-height: 50px;
            border: 1px solid $grey-main-border-color;
            border-radius: 3px;
            flex-grow: 1;
            transition: border-color 0.5s ease-out;
        }

        .help-text {
            color: rgba(0, 0, 0, 0.38);
            line-height: 1.2;
            font-size: 12px;
            visibility: hidden;
            flex-shrink: 0;
        }

        .error-text {
            color: $danger;
            visibility: hidden;
            flex-shrink: 0;
            font-size: 12px;
        }

        .header {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            min-height: 20px;
            flex-shrink: 0;
            color: $text-grey;

            .label-text {
                flex-grow: 1;
                line-height: 30px;
                align-self: flex-end;
                font-size: 12px;
            }

            .svg-icon-position {
                margin-top: 3px;
                use {
                    fill: $default-grey-icon-button;
                }
                &:hover {
                    use {
                        fill: $active;
                    }
                }
            }

            button.ui-icon-button.flat.full-screen,
            button.ui-icon-button.flat.add-variable {
                border-radius: 30px;
                visibility: hidden;
                flex-shrink: 0;
            }

            button.ui-icon-button.flat.full-screen,
            button.ui-icon-button.flat.add-variable {
                &:hover, &.active {
                    .ui-icon-button__icon {
                        color: $active;
                        div {
                            .svg-icon-position {
                                use {
                                    fill: $active;
                                }
                            }
                        }
                    }
                }
            }
        }

        &:hover, &.active {
            button.ui-icon-button.flat.full-screen,
            button.ui-icon-button.flat.add-variable {
                visibility: visible;
            }
        }

        &:hover {
            .ace-wrapper {
                border-color: $grey-darker-border-color;
            }
        }

        &.active {
            .help-text {
                visibility: visible;
            }
            .ace-wrapper {
                border-color: $active;
            }
        }

        &.readonly {
            .ace-wrapper {
                border-color: $grey-main-border-color;
            }
        }

        &.invalid {
            .error-text {
                visibility: visible;
            }
            .ace-wrapper {
                border-color: $danger;
            }
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
    @import '../../styles/colors';
    @import '../../styles/mixins';

    .or-code {
        .ace-wrapper {
            .ace_gutter {
                color: $text-grey;
                background-color: $grey-main-bg-color;
            }

            .ace_search {
                display: flex;
                flex-direction: column;

                .ace_searchbtn_close {
                    float: none;
                    position: absolute;
                    right: 0;
                    margin: 5px;
                }
                .ace_search_form {
                    margin-right: 18px;

                    .ace_search_field {
                        width: 190px;
                    }

                    .ace_searchbtn {
                        width: 32px;

                        &:last-child {
                            width: 34px;
                        }
                    }
                }
                .ace_replace_form {
                    margin-right: 18px;

                    .ace_search_field {
                        width: 190px;
                    }

                    .ace_replacebtn {
                        width: 64px;

                        &:last-child {
                            width: 34px;
                        }
                    }
                }
            }
            /* TODO: check and remove after update to Ace v1.4.5 */
            .ace_inline_button.ace_keyword.ace_toggle_wrap {
                position: initial !important;
            }
        }
    }
</style>
