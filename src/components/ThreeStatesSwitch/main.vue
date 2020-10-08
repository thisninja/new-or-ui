<template>
    <div
        class="cl-three-states-switch"
        :style="{
            width,
            height,
            borderRadius,
            justifyContent,
            'background-color': color,
            color: 'white',
        }"
        :class="{disabled}"
        @click.stop="switchHandler"
    >
        <div
            v-if="value"
            class="text-smaller"
        >
            {{ translate('on') }}
        </div>
        <div
            class="square"
            :style="{ width: squareSize, height: squareSize }"
        />
        <div
            v-if="value !== null && !value"
            class="text-smaller"
        >
            {{ translate('off') }}
        </div>
    </div>
</template>

<script>
import { t } from 'frenchkiss';
import {
    REGEX_CSS_LENGTH, COLOR_GREEN, COLOR_LIGHT_GREY_4, COLOR_DARK_ORANGE_1,
} from '../../constants';

export default {
    name: 'ClThreeStatesSwitch',
    data() {
        return {
        };
    },
    props: {
        value: {
            type: [Boolean],
            required: true,
        },
        offColor: {
            type: String,
            default: COLOR_LIGHT_GREY_4,
        },
        partialColor: {
            type: String,
            default: COLOR_DARK_ORANGE_1,
        },
        onColor: {
            type: String,
            default: COLOR_GREEN,
        },
        width: {
            type: String,
            default: '52px',
            validator: value => REGEX_CSS_LENGTH.test(value),
        },
        height: {
            type: String,
            default: '24px',
            validator: value => REGEX_CSS_LENGTH.test(value),
        },
        squareSize: {
            type: String,
            default: '16px',
            validator: value => REGEX_CSS_LENGTH.test(value),
        },
        borderRadius: {
            type: String,
            default: '4px',
            validator: value => REGEX_CSS_LENGTH.test(value),
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        color() {
            switch (this.value) {
            case false:
                return this.offColor;
            case null:
                return this.partialColor;
            case true:
                return this.onColor;
            default:
                console.error(`[color] Unknown checked key ${this.value}`);
                return '';
            }
        },
        justifyContent() {
            if ([true, false].includes(this.value)) {
                return 'space-around';
            }
            return 'center';
        },
    },
    methods: {
        translate: t,
        switchHandler() {
            if (this.disabled) {
                return;
            }
            if (this.value) {
                this.$emit('input', false);
            } else {
                this.$emit('input', true);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.cl-three-states-switch {
    display: flex;
    align-items: center;
    cursor: pointer;

    .square {
        border-radius: 2px;
    }
    .square {
        background-color: white;
    }
    &.disabled {
        opacity: 0.6;
    }
}
</style>
