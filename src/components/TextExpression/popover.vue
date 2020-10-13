<template>
  <div ref="popover" class="or-popover">
    <slot />
  </div>
</template>

<script>
// import * as _ from 'lodash';
import utils from '../../helpers/utils';
import Drop from 'tether-drop';

export default {
  name: 'OrPopover',

  props: {
    trigger: {
      type: [String, Object, HTMLDivElement],
      required: true
    },
    position: {
      type: String,
      default: 'bottom left'
    },
    openOn: {
      type: String,
      default: 'click'
    },
    closeOnBlur: {
      type: Boolean,
      default: true
    },
    constrainToParent: {
      type: Boolean,
      default: true
    },
    dropClasses: {
      type: String,
      default: ''
    },
    displayTail: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      drop: null
    };
  },

  mounted () {
    let target;
    if (utils.isString(this.trigger)) {
      target = this.$parent.$refs[this.trigger].$el || this.$parent.$refs[this.trigger];
    } else if (utils.isObject(this.trigger)) {
      target = this.trigger.$el || this.trigger;
    }

    this.drop = new Drop({
      target,
      content: this.$refs.popover,
      position: this.position,
      constrainToScrollParent: this.constrainToParent,
      openOn: this.openOn,
      classes: `${this.dropClasses} ${this.displayTail ? 'with-tail' : ''}`,
      beforeClose: () => {
        if (!(this.letClose || this.closeOnBlur) || this.denyClose) {
          return false;
        }
        this.letClose = false;
      },
      tetherOptions: {
        constraints: [
          {
            to: this.constrainToParent ? 'scrollParent' : 'window',
            attachment: 'together',
            pin: true
          }
        ]
      }
    });

    this.drop.on('close', this.closeHandler);
    this.drop.on('open', this.openHandler);
  },

  beforeDestroy () {
    this.drop.destroy();
  },

  methods: {
    openHandler () {
      this.$emit('open');
    },

    closeHandler () {
      this.$emit('close');
    },

    close () {
      this.letClose = true;
      this.drop.close();
    },

    open () {
      // deny close for awhile to not trigger close immediately
      // when clicking a button to show popover for example
      const denyCloseTimeout = 50;
      this.denyClose = true;

      if (this.drop) {
        this.drop.open();
      }

      setTimeout(() => {
        this.denyClose = false;
      }, denyCloseTimeout);
    },

    reposition () {
      this.drop.position();
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
    $tail-corner-padding: 7px;
    $popup-with-tail-displacement: 9px;

    .or-popover {
        border-radius: 4px;
        background-color: #ffffff;
        box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.08);
        border: solid 1px #e4e4e4;
    }

    .drop.with-tail {
        .drop-content {
            &::before {
                display: none;
                content: "";
                background-color: white;
                box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.12), 0 0 8px 0 rgba(0, 0, 0, 0.06);
                width: 10px;
                height: 10px;
                position: absolute;
                transform: rotate(45deg);
                z-index: -1;
            }
            &::after {
                display: none;
                content: "";
                background-color: white;
                width: 10px;
                height: 10px;
                position: absolute;
                transform: rotate(45deg);
            }
        }

        /* bottom left */
        &.drop-element-attached-top.drop-element-attached-left.drop-target-attached-left.drop-target-attached-bottom {
            margin-top: $popup-with-tail-displacement;
            .drop-content::before {
                display: block;
                top: -5px;
                left: $tail-corner-padding;
            }
            .drop-content::after {
                display: block;
                top: -4px;
                left: $tail-corner-padding;
            }
        }

        /* bottom middle */
        &.drop-element-attached-top.drop-element-attached-middle.drop-target-attached-bottom.drop-target-attached-middle {
            margin-top: $popup-with-tail-displacement;
            .drop-content::before {
                display: block;
                top: -5px;
                left: 50%;
                margin-left: -5px;
            }
            .drop-content::after {
                display: block;
                top: -4px;
                left: 50%;
                margin-left: -5px;
            }
        }

        /* bottom right */
        &.drop-element-attached-top.drop-element-attached-right.drop-target-attached-bottom.drop-target-attached-right {
            margin-top: $popup-with-tail-displacement;
            .drop-content::before {
                display: block;
                top: -5px;
                right: $tail-corner-padding;
            }
            .drop-content::after {
                display: block;
                top: -4px;
                right: $tail-corner-padding;
            }
        }

        /* top left */
        &.drop-element-attached-bottom.drop-element-attached-left.drop-target-attached-top.drop-target-attached-left {
            margin-top: -$popup-with-tail-displacement;
            .drop-content::before {
                display: block;
                bottom: -5px;
                left: $tail-corner-padding;
            }
            .drop-content::after {
                display: block;
                bottom: -4px;
                left: $tail-corner-padding;
            }
        }

        /* top middle */
        &.drop-element-attached-bottom.drop-element-attached-middle.drop-target-attached-top.drop-target-attached-middle {
            margin-top: -$popup-with-tail-displacement;
            .drop-content::before {
                display: block;
                bottom: -5px;
                left: 50%;
                margin-left: -5px;
            }
            .drop-content::after {
                display: block;
                bottom: -4px;
                left: 50%;
                margin-left: -5px;
            }
        }

        /* top right */
        &.drop-element-attached-bottom.drop-element-attached-right.drop-target-attached-top.drop-target-attached-right {
            margin-top: -$popup-with-tail-displacement;
            .drop-content::before {
                display: block;
                bottom: -5px;
                right: $tail-corner-padding;
            }
            .drop-content::after {
                display: block;
                bottom: -4px;
                right: $tail-corner-padding;
            }
        }

        /* right bottom */
        &.drop-element-attached-bottom.drop-element-attached-left.drop-target-attached-bottom.drop-target-attached-right {
            margin-left: $popup-with-tail-displacement;
            .drop-content::before {
                display: block;
                left: -5px;
                bottom: $tail-corner-padding;
            }
            .drop-content::after {
                display: block;
                left: -4px;
                bottom: $tail-corner-padding;
            }
        }

        /* right middle */
        &.drop-element-attached-middle.drop-element-attached-left.drop-target-attached-middle.drop-target-attached-right {
            margin-left: $popup-with-tail-displacement;
            .drop-content::before {
                display: block;
                left: -5px;
                bottom: 50%;
                margin-bottom: -5px;
            }
            .drop-content::after {
                display: block;
                left: -4px;
                bottom: 50%;
                margin-bottom: -5px;
            }
        }

        /* right top */
        &.drop-element-attached-top.drop-element-attached-left.drop-target-attached-top.drop-target-attached-right {
            margin-left: $popup-with-tail-displacement;
            .drop-content::before {
                display: block;
                left: -5px;
                top: $tail-corner-padding;
            }
            .drop-content::after {
                display: block;
                left: -4px;
                top: $tail-corner-padding;
            }
        }

        /* left bottom */
        &.drop-element-attached-bottom.drop-element-attached-right.drop-target-attached-bottom.drop-target-attached-left {
            margin-left: -$popup-with-tail-displacement;
            .drop-content::before {
                display: block;
                right: -5px;
                bottom: $tail-corner-padding;
            }
            .drop-content::after {
                display: block;
                right: -4px;
                bottom: $tail-corner-padding;
            }
        }

        /* left middle */
        &.drop-element-attached-middle.drop-element-attached-right.drop-target-attached-middle.drop-target-attached-left {
            margin-left: -$popup-with-tail-displacement;
            .drop-content::before {
                display: block;
                right: -5px;
                bottom: 50%;
                margin-bottom: -5px;
            }
            .drop-content::after {
                display: block;
                right: -4px;
                bottom: 50%;
                margin-bottom: -5px;
            }
        }

        /* left top */
        &.drop-element-attached-top.drop-element-attached-right.drop-target-attached-top.drop-target-attached-left {
            margin-left: -$popup-with-tail-displacement;
            .drop-content::before {
                display: block;
                right: -5px;
                top: $tail-corner-padding;
            }
            .drop-content::after {
                display: block;
                right: -4px;
                top: $tail-corner-padding;
            }
        }
    }
</style>
