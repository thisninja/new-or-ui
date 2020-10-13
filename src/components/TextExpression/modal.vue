<template>
  <transition :name="toggleTransition" @after-enter="onEnter" @after-leave="onLeave">
    <div
      :class="classes"
      :role="role"
      v-show="isOpen"

      class="ui-modal ui-modal__mask"
    >
      <div
        ref="backdrop"
        :class="{ 'has-dummy-scrollbar': preventShift }"

        @mouseup="wrapperMouseup"
        @mousedown="wrapperMousedown"
        class="ui-modal__wrapper"
      >
        <div
          ref="container"
          @mouseup="containerMouseup"
          @mousedown="containerMousedown"
          @keydown.esc="dismissOnEsc && closeModal($event)"
          class="ui-modal__container"
          tabindex="-1"
        >
          <div v-if="!removeHeader" class="ui-modal__header">
            <slot name="header">
              <h1 class="ui-modal__header-text">
                {{ title }}
              </h1>
            </slot>

            <div class="ui-modal__close-button">
              <ui-close-button
                @click="closeModal"
                v-if="dismissOnCloseButton && !removeCloseButton && dismissible"
              />
            </div>
          </div>

          <div class="ui-modal__body">
            <vue-markdown v-if="innerMarkdown.length" :source="innerMarkdown" />
            <slot />
          </div>

          <div v-if="hasFooter" class="ui-modal__footer">
            <slot name="footer" />
          </div>

          <div
            @focus.stop="redirectFocus"
            class="ui-modal__focus-redirect"

            tabindex="0"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { UiModal } from 'keen-ui';
import VueMarkdown from 'vue-markdown';
import messageBus from '../../message_bus';
import utils from '../../helpers/utils';

export default {
  name: 'OrModal',
  components: {
    vueMarkdown: VueMarkdown
  },
  extends: UiModal,

  props: {
    containFocus: {
      type: Boolean,
      default: false
    },
    innerMarkdown: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      wrapperClickStarted: false,
      containerClickStarted: false
    };
  },

  created () {
    this.$on('open', this.modalIsOpened);
    this.$on('close', this.modalIsClosed);
  },

  beforeDestroy () {
    this.$off('open', this.modalIsOpened);
    this.$off('close', this.modalIsClosed);
  },

  methods: {
    restrictFocus (...args) {
      return this.containFocus && !utils.isFocusRestrictionDisabledGlobally()
        ? this.$refs.container && UiModal.methods.restrictFocus.apply(this, args)
        : undefined;
    },
    wrapperMouseup (e) {
      if (this.dismissOnBackdrop && this.wrapperClickStarted) {
        this.closeModal(e);
      }
      this.wrapperClickStarted = false;
      this.containerClickStarted = false;
    },
    wrapperMousedown () {
      if (!this.containerClickStarted) {
        this.wrapperClickStarted = true;
      }
    },
    containerMouseup () {
      this.wrapperClickStarted = false;
      this.containerClickStarted = false;
    },
    containerMousedown () {
      this.containerClickStarted = true;
    },
    modalIsOpened () {
      messageBus.$emit('or-modal::opened', this._uid);
    },
    modalIsClosed () {
      messageBus.$emit('or-modal::closed', this._uid);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../styles/mixins';

    .ui-modal.no-padding {
        > .ui-modal__wrapper > .ui-modal__container {
            > .ui-modal__body {
                padding: 0;
            }
        }
    }

    .ui-modal {
        font-family: inherit;
        display: flex;

        > .ui-modal__wrapper {
            display: flex;
            height: 100%;
            flex-grow: 1;

            & > .ui-modal__container {
                align-self: center;

                > .ui-modal__header {
                    background-color: transparent;
                    box-shadow: none;
                    @include condensed-font;

                    padding: 24px 24px 8px 24px;

                    h1 {
                        font-size: 22px;
                    }
                }

                > .ui-modal__body {
                    padding: 16px 24px 8px 24px;
                    position: relative;
                }

                > .ui-modal__footer {
                    border-top: 1px solid #e4e4e4;
                    padding: 20px;
                }
            }
        }

        &.max-width > .ui-modal__wrapper > .ui-modal__container {
            width: calc(100% - 50px);
        }

        &.max-height,
        &.height-70 {
            > .ui-modal__wrapper {
                > .ui-modal__container {
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    overflow-x: hidden;
                    overflow-y: auto;

                    > .ui-modal__header,
                    > .ui-modal__footer {
                        flex-shrink: 0;
                        margin-top: 0;
                    }

                    > .ui-modal__body {
                        flex-grow: 1;
                        display: flex;
                        flex-direction: column;

                        /* if modal content is a tabs list then stretch it to the bottom of modal body */
                        > .ui-tabs {
                            flex-grow: 1;
                            .ui-tabs__body {
                                padding: 0;
                            }
                        }
                    }
                }
            }
        }

        &.max-height {
            > .ui-modal__wrapper > .ui-modal__container {
                height: calc(100% - 50px);
            }
        }

        &.height-70 {
            > .ui-modal__wrapper > .ui-modal__container {
                height: 70%;
            }
        }
    }
</style>
