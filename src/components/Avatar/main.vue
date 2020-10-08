<template>
    <span :class="[{ outline, full }, size, color]" class="cl-avatar">
        <slot/>
    </span>
</template>

<script>
/* eslint-disable no-bitwise */
export default {
    name: 'ClAvatar',
    props: {
        outline: {
            type: Boolean,
            default: false,
        },
        full: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'default',
            validator: value => /(default|medium|small|mini)/.test(value),
        },
        name: {
            type: String,
            default: '',
        },
        color: {
            type: String,
            default() {
                const name = this.name || '';
                const colors = ['teal', 'orange', 'blue', 'red', 'purple'];
                if (name.length) {
                    let hash = 0;
                    for (let i = 0, len = name.length; i < len; i += 1) {
                        hash = ((hash << 5) - hash) + name.charCodeAt(i);
                        hash |= 0;
                    }
                    return colors[hash % 5];
                }
                return colors[0];
            },
            validator: value => /(teal|orange|blue|red|purple)/.test(value),
        },
    },
};
</script>

<style lang="scss">
@import '../../styles/index.scss';

.cl-avatar {
    width: 32px;
    height: 32px;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 1.33;
    font-size: 12px;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    padding: 9px 0;
    box-sizing: border-box;
    &.default {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        padding-top: 15px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
    }
    &.medium {
        width: 32px;
        height: 32px;
        line-height: 1.33;
    }
    &.small {
        width: 24px;
        height: 24px;
        line-height: 6px;
    }
    &.mini {
        width: 12px;
        height: 12px;
        line-height: 4px;
    }
    &.teal {
        background-color: $color_light_teal2;
        color: $color_teal;
    }
    &.blue {
        background-color: $color_light_blue2;
        color: $color_blue;
    }
    &.purple {
        background-color: $color_light_purple2;
        color: $color_purple;
    }
    &.red {
        background-color: $color_light_red2;
        color: $color_red;
    }
    &.orange {
        background-color: $color_light_orange2;
        color: $color_orange;
    }
    &.full {
        color: #fff;
        &.teal {
            background-color: $color_teal;
        }
        &.blue {
            background-color: $color_blue;
        }
        &.purple {
            background-color: $color_purple;
        }
        &.red {
            background-color: $color_red;
        }
        &.orange {
            background-color: $color_orange;
        }
    }
    &.outline {
        border: solid 1px transparent;
        background-color: transparent;
        &.teal {
            border-color: $color_teal;
            color: $color_teal;
        }
        &.blue {
            border-color: $color_blue;
            color: $color_blue;
        }
        &.purple {
            border-color: $color_purple;
            color: $color_purple;
        }
        &.red {
            border-color: $color_red;
            color: $color_red;
        }
        &.orange {
            border-color: $color_orange;
            color: $color_orange;
        }
    }
}
</style>
