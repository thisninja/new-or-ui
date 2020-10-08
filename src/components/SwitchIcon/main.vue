<template>
    <div
        class="cl-switch-icon clickable"
        :style="{ width, height, backgroundColor, justifyContent, borderRadius, padding }"
        @click="$emit('input', !value)"
    >
        <cl-icon :icon="icon" />
    </div>
</template>

<script>
import {
    COLOR_LIGHT_BLUE_3,
    COLOR_LIGHT_GREY_6,
    REGEX_CSS_LENGTH,
} from '../../constants';

export default {
    name: 'ClSwitchIcon',
    props: {
        width: {
            type: String,
            default: '48px',
            validator: value => REGEX_CSS_LENGTH.test(value),
        },
        height: {
            type: String,
            default: '28px',
            validator: value => REGEX_CSS_LENGTH.test(value),
        },
        borderRadius: {
            type: String,
            default: '14px',
            validator: value => REGEX_CSS_LENGTH.test(value),
        },
        padding: {
            type: String,
            default: '4px',
            validator: value => REGEX_CSS_LENGTH.test(value),
        },
        value: {
            type: Boolean,
            default: false,
        },
        iconOn: {
            type: String,
            required: true,
        },
        iconOff: {
            type: String,
            required: true,
        },
        colorOn: {
            type: String,
            default: COLOR_LIGHT_BLUE_3,
        },
        colorOff: {
            type: String,
            default: COLOR_LIGHT_GREY_6,
        },
    },
    computed: {
        icon() {
            return this.value ? this.iconOn : this.iconOff;
        },
        backgroundColor() {
            return this.value ? this.colorOn : this.colorOff;
        },
        justifyContent() {
            return this.value ? 'flex-start' : 'flex-end';
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';

.cl-switch-icon {
    display: flex;
    align-items: center;
}
</style>
