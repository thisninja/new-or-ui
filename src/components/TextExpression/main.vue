<template>
  <div :class="{'readonly' : readonly, 'invalid' : invalid, 'active' : active}" class="or-text-expression">
    text-expression local
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
        <g id="jsIcon" fill="inherit">
          <path
            id="&lt;/&gt;"
            d="M7.30008574,9.06932409 L2.74549302,6.96880416 L2.74549302,6.83708839 L7.30008574,4.73656846 L7.30008574,2.64991334 L0.693499949,6.08838821 L0.693499949,7.71750433 L7.30008574,11.1559792 L7.30008574,9.06932409 Z M11.5575752,13 L14.469187,1 L12.5697069,1 L9.69968961,13 L11.5575752,13 Z M16.8687909,9.06932409 L16.8687909,11.1559792 L23.4753767,7.71750433 L23.4753767,6.08838821 L16.8687909,2.64991334 L16.8687909,4.73656846 L21.4233836,6.83708839 L21.4233836,6.96880416 L16.8687909,9.06932409 Z"
          />
        </g>
      </defs>
    </svg>
    <!-- SVG ICONS CONTAINER END -->

    <div class="header">
      <div class="label">
        <div class="label-wrapper">
          {{ label }}
        </div>
      </div>
      <a-button
        ref="mergeTagButton"
        @click="addMergeTag()"
        class="add-variable flat"
        type="link"
        shape="circle"
      >
        <a-icon :component="MergeTagSvg" />
      </a-button>
      <!-- <or-icon-button
        ref="mergeTagButton"
        v-if="hasVariables && displayTextInput"
        @click="addMergeTag()"
        class="add-variable flat"
        type="secondary"
      >
        <div slot="default" @mousedown="mouseDown" class="svg-icon-position">
          <svg width="24px" height="14px">
            <use xlink:href="#varIcon" />
          </svg>
        </div>
      </or-icon-button> -->
      <!-- <or-icon-button
        v-if="!readonly && !displayTextInput"
        @click="openFullScreen"
        class="full-screen flat"
        type="secondary"
        tooltip="Full screen"
        tabindex="-1"
        icon="fullscreen"
      /> -->
      <!-- <or-icon-button
        ref="addVariable"
        v-if="hasVariables && !displayTextInput"
        @click.stop.prevent="openDataOutPopover"
        class="add-variable flat"
        type="secondary"
      >
        <div slot="default" class="svg-icon-position">
          <svg width="24px" height="14px">
            <use xlink:href="#varIcon" />
          </svg>
        </div>
      </or-icon-button> -->
      <!-- <or-icon-button
        v-if="!readonly && hasCodeMode"
        :class="['flat', {'js-mode-btn' : displayTextInput, 'js-mode-btn active' : !displayTextInput}]"
        :disabled="!canStringify"
        @click="toggleMode"
        type="secondary"
      >
        <div slot="default" class="svg-icon-position">
          <svg width="24px" height="14px">
            <use xlink:href="#jsIcon" />
          </svg>
        </div>
      </or-icon-button> -->
      <a-button
        ref="addVariable"
        v-if="!readonly && hasCodeMode"
        :class="['flat', {'js-mode-btn' : displayTextInput, 'js-mode-btn active' : !displayTextInput}]"
        :disabled="!canStringify"
        @click="toggleMode"
        type="link"
        shape="circle"
      >
        <a-icon :component="CodeModeSvg" />
      </a-button>
    </div>
    <div class="input-wrapper">
      <!-- mergeFields - {{ mergeFields }}
      steps - {{ steps }}
      stepId - {{ stepId }}
      disableVariables - {{ disableVariables }}
      placeholder - {{ placeholder }} -->
      <!-- editableValue - {{ editableValue }}
      value - {{ value }} -->
      <editable
        ref="editable"
        v-if="displayTextInput"
        :readonly="readonly"
        @focus="onFocus"
        @blur="onBlur"
        :multi-line="multiLine"
        :steps="steps"
        :step-id="stepId"
        :merge-fields="mergeFields"
        :disable-variables="disableVariables"
        v-model="editableValue"
        :placeholder="placeholder"
        @stats-change="editableStatsChangeHandler"
      />
      <!-- displayTextInput - {{ displayTextInput }}
      codeValue - {{ codeValue }} -->
      <or-code
        ref="code"
        v-if="!displayTextInput"
        :hide-header="true"
        :readonly="readonly"
        :steps="steps"
        :step-id="stepId"
        :merge-fields="mergeFields"
        :is-inner-component="true"
        v-model="codeValue"
        @focus="onFocus"
        @blur="onBlur"
        label="Code"
      />
    </div>
    <div v-if="helpText && !invalid" class="help-text">
      {{ helpText }}
    </div>
    <div v-if="invalid" class="error-text">
      {{ error }}
    </div>
    <!--popover component -->
    <or-popover
      ref="dataOutPopover"
      v-if="hasVariables && !displayTextInput && dataOutPopoverOpened"
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
            @mousedown="selectDataOut(dataOut)"
            :class="[getDataOutClass(dataOut, index), 'list-item']"
            :key="`${dataOut.flowId}:s${dataOut.variableName}`"
          >
            {{ dataOut.variableName }}
          </div>
        </div>
      </div>
    </or-popover>
    <or-modal ref="helpModal" v-if="!!componentInfoText" title="Help">
      <vue-markdown :source="componentInfoText" />
    </or-modal>
  </div>
</template>

<script>
import * as _ from 'lodash';
import VueMarkdown from 'vue-markdown';
import dataOuts from '../../mixins/data_outs';
import Editable from './views/editable.vue';
import OrCode from './code.vue';
// import HeartIcon from '../Icon/Icon';
// import OrIconButton from './icon_button.vue';
import OrModal from './modal.vue';
import OrPopover from './popover.vue';
import utils from '../../helpers/utils';

console.log('utils -> ', utils);

const POPOVER_MARGIN = 40;

const MergeTagSvg = {
  template: `
    <div class="svg-icon-position">
      <svg width="24px" height="14px">
          <use xlink:href="#varIcon"/>
      </svg>
    </div>
  `
};

const CodeModeSvg = {
  template: `
    <div class="svg-icon-position">
      <svg width="24px" height="14px">
        <use xlink:href="#jsIcon" />
      </svg>
    </div>
  `
};


/* eslint-disable no-magic-numbers */
export default {
  name: 'OrTextExpression',
  components: {
    // HeartIcon,
    editable: Editable,
    orCode: OrCode,
    // orIconButton: OrIconButton,
    orPopover: OrPopover,
    OrModal,
    vueMarkdown: VueMarkdown
  },

  mixins: [
    dataOuts
  ],

  props: {
    stepId: {
      type: String,
      default: ''
    },
    steps: {
      type: Array,
      default () {
        return [];
      }
    },
    value: {
      type: String,
      default: '``'
    },
    label: {
      type: String,
      default: ''
    },
    readonly: {
      default: false,
      type: Boolean
    },
    multiLine: {
      type: Boolean,
      default: false
    },
    helpText: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disableVariables: {
      type: Boolean,
      default: false
    },
    disableCodeMode: {
      type: Boolean,
      default: false
    },
    componentInfoText: {
      type: String,
      default: ''
    },
    invalid: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    mergeFields: {
      type: Array,
      default () {
        return [];
      }
    }
  },

  data () {
    return {
      CodeModeSvg,
      MergeTagSvg,
      showText: true,
      active: false,
      dataOutPopoverOpened: false
    };
  },
  computed: {
    hasVariables () {
      return !this.readonly && !this.disableVariables && this.steps;
    },

    hasCodeMode () {
      return !this.readonly && !this.disableCodeMode && this.steps;
    },

    displayTextInput () {
      console.log('this.showText -> ', this.showText);
      console.log('this.canStringify -> ', this.canStringify);

      return this.showText && this.canStringify;
    },

    canStringify () {
      console.log('this.value -> ', this.value);
      const isStringExp = utils.isStringExpression(this.value);
      console.log('isStringExp -> ', isStringExp);
      return isStringExp;
    },

    codeValue: {
      get () {
        return this.value;
      },
      set (value) {
        if (!this.displayTextInput) {
          this.$emit('input', value);
        }
      }
    },

    editableValue: {
      get () {
        return utils.stringifyExpression(this.value);
      },

      set (value) {
        if (this.displayTextInput) {
          const stringified = _.reduce(value, (memo, item) => {
            if (_.isString(item)) {
              memo += _.chain(item).replace(/\\/g, '\\\\')
                .replace(/`/g, '\\`')
                .replace(/\$\{/g, '\\${')
                .value();
            } else {
              memo += this.convertItemPathToValue(item.path);
            }
            return memo;
          }, '');

          this.$emit('input', `\`${stringified}\``);
        }
      }
    },

    switchModeColor () {
      return this.displayTextInput ? 'default' : 'primary';
    },

    wrapperClass () {
      return `or-text-expression ${this.active ? 'active' : ''}`;
    },

    mode () {
      return this.displayTextInput ? 'text' : 'code';
    },

    usedMergeFieldsCount () {
      return _.filter(this.editableValue, item => _.isObject(item)).length;
    },

    mergeFieldInUse () {
      return Boolean(this.usedMergeFieldsCount);
    }
  },

  watch: {
    mode (value) {
      this.$emit('mode-changed', value);
    }
    // disabled as there is no need to trigger mode on value change
    // value () {
    //     this.resetMode();
    // }
  },

  created () {
    console.log('this -> ', this);
  },

  methods: {
    mouseDown () {
      this.$refs.editable.suppressBlur = true;
    },
    resetMode () {
      this.showText = this.canStringify;
    },

    toggleMode () {
      this.showText = !this.showText;
    },

    openFullScreen () {
      this.$refs.code.openFullScreen();
    },

    openModal (ref) {
      this.$refs[ref].open();
    },

    addMergeTag (tag) {
      console.log('this.displayTextInput -> ', this.displayTextInput);
      if (this.displayTextInput) {
        this.$refs.editable.insertAndFocusMergeTagAtSelection(tag, !tag);
      } else if (tag) {
        this.selectDataOut({ variableName: tag });
      } else {
        this.openDataOutPopover();
      }
    },

    editableStatsChangeHandler (stats) {
      this.$emit('or-text-expression:value:changed', stats); // legacy
      this.$emit('stats-change', stats);
    },

    onFocus () {
      if (!this.readonly) {
        this.active = true;
      }
      this.$emit('focus');
    },

    onBlur () {
      this.active = false;
      this.$emit('blur');
    },

    openDataOutPopover () {
      this.dataOutPopoverOpened = true;

      this.$nextTick(() => {
        const maxWidth = Math.floor(window.innerHeight / 2 - POPOVER_MARGIN);
        this.$refs.dataOutsWrapper.style.maxHeight = `${maxWidth}px`;
        this.$refs.dataOutPopover.open();
      });
    },

    dataOutPopoverClosed () {
      this.dataOutPopoverOpened = false;
    },

    /**
             * Handle dataOut variable insertion
             * @param {Object} dataOut is an Object of selected step
             */
    selectDataOut (dataOut) {
      console.log('this.$refs.code -> ', this.$refs.code);
      this.$refs.code.insertCode({ code: this.convertMergeTagToCode(dataOut.variableName) });
      this.$refs.dataOutPopover.close();
    }
  }
};
/* eslint-enable no-magic-numbers */
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import '../../styles/colors';
    @import '../../styles/mixins';

    .or-text-expression {
        display: flex;
        flex-direction: column;
        margin-bottom: 12px;
        font-family: $font-family;

        .svg-icon-holder {
            display: none;
        }

        .header {
            display: flex;
            flex-direction: row;
            min-height: 36px;
            max-width: 100%;

            .label {
                display: flex;
                align-items: center;
                flex-grow: 1;
                font-size: 12px;
                line-height: 1.3;
                color: $text-grey;
                transition: color 0.1s ease;
                max-width: 100%;

                .label-wrapper {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
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
        }

        .or-code {
            margin-bottom: 0;
        }

        .help-text {
            color: rgba(0, 0, 0, 0.38);
            line-height: 1.3;
            font-size: 12px;
            visibility: hidden;
        }

        .error-text {
            color: $danger;
            visibility: hidden;
            font-size: 12px;
            line-height: 1.3;
        }

        &.active {
            .help-text {
                visibility: visible;
            }
        }

        &.invalid {
            .help-text {
                visibility: hidden;
            }

            .error-text {
                visibility: visible;
            }
        }
    }

    .or-text-expression--slack {
      .input-wrapper .or-editable-wrapper.single-line {
        border: none;
        background: none;
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

    .or-text-expression {
        button.ui-icon-button.flat.full-screen,
        button.ui-icon-button.flat.js-mode-btn,
        button.ui-icon-button.flat.add-variable,
        button.ui-icon-button.flat.info-btn {
            border-radius: 30px;
            visibility: hidden;
            flex-shrink: 0;
        }

        button.ui-icon-button.flat.info-btn {
            visibility: visible;
        }

        button.ui-icon-button.flat.full-screen,
        button.ui-icon-button.flat.add-variable,
        button.ui-icon-button.flat.js-mode-btn {
            &:hover, &.active {
                .ui-icon-button__icon {
                    use {
                        fill: $active;
                    }
                }
            }
        }

        &:hover, &.active {
            button.ui-icon-button.flat.full-screen,
            button.ui-icon-button.flat.js-mode-btn,
            button.ui-icon-button.flat.add-variable {
                visibility: visible;
            }
        }

        &.invalid {
            .ace-wrapper {
                border-color: $danger;
            }
            .or-editable-wrapper {
                border-color: $danger;
            }
        }
    }
</style>
