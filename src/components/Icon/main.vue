<template>
    <svgicon
        v-on="$listeners"
        class="cl-icon"
        :class="[dir, { disabled }]"
        :icon="icon"
        :width="size"
        :height="size"
        :color="disabled ? COLOR_LIGHT_GREY_4 : color"
        :fill="fill"
    />
</template>

<script>
import {
    COLOR_LIGHT_GREY_1,
    COLOR_LIGHT_GREY_4,
    REGEX_CSS_LENGTH,
} from '../../constants';

export default {
    name: 'ClIcon',
    data() {
        return {
            COLOR_LIGHT_GREY_4,
        };
    },
    props: {
        icon: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: '24px',
            validator: value => REGEX_CSS_LENGTH.test(value),
        },
        color: {
            type: String,
            default: COLOR_LIGHT_GREY_1,
        },
        dir: {
            type: String,
            default: '',
            validator: value => /(^$|up|right|down|left)/.test(value),
        },
        fill: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        icon: {
            handler() {
                import(`../../compiled-icons/${this.icon}`);
            },
            immediate: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';

.cl-icon {
    &.svg-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        color: inherit;
        vertical-align: middle;
        fill: none;
        stroke: currentColor;
    }
    &.svg-fill {
        fill: currentColor;
        stroke: none;
    }
    &.up {
        transform: rotate(0deg);
    }
    &.right {
        transform: rotate(90deg);
    }
    &.down {
        transform: rotate(180deg);
    }
    &.left {
        transform: rotate(-90deg);
    }
    &.disabled {
        cursor: default;
    }
}
</style>
