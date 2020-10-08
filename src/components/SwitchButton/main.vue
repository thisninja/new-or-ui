<template>
    <div class="cl-switch-button" :class="{ 'full-width': fullWidth }">
        <button
            v-for="(option, index) in options"
            :class="{
                'btn-icon': !!option.icon,
                selected: option.value === value,
                left: index === 0,
                right: index === options.length - 1,
            }"
            :key="index"
            :disabled="disabled"
            class="switch-button"
            @click="$emit('input', option.value)"
            :style="{ height }"
        >
            <cl-icon
                v-if="option.icon"
                :icon="option.icon"
                :color="option.value === value ? COLOR_BLUE : ''"
            />
            <span class="button-text">
                <span class="custom-title">
                    {{ option.title }}
                    <el-tag
                        v-if="option.number"
                        :type="option.value === value ? 'primary' : 'info'"
                        size="mini"
                        class="rounded"
                    >
                        {{ option.number }}
                    </el-tag>
                </span>
                <br>
                <span v-if="option.subtitle" class="custom-subtitle">
                    <br>{{ option.subtitle }}
                </span>
            </span>

        </button>
    </div>
</template>

<script>
import { COLOR_BLUE, REGEX_CSS_LENGTH } from '../../constants';

export default {
    name: 'ClSwitchButton',
    data() {
        return { COLOR_BLUE };
    },
    props: {
        value: {
            type: [String, Number, Boolean],
            default: null,
        },
        options: {
            type: Array,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        fullWidth: {
            type: Boolean,
            default: false,
        },
        height: {
            type: String,
            default: '',
            validator: value => REGEX_CSS_LENGTH.test(value),
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';

.cl-switch-button {
    .switch-button {
        cursor: pointer;
        line-height: 1.88;
        border: 0 solid transparent;
        font-size: 14px;
        font-weight: 500;
        text-transform: none;
        display: inline !important;
        text-align: left;
        padding: 3px 10px;
        background-color: #fff;
        box-shadow: 0 0 0 1px rgba(50, 72, 92, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        opacity: 0.85;
        &:focus {
            outline: none;
        }
        &:hover:not([disabled]) {
            box-shadow: 0 0 0 1px $color_blue, 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            opacity: 1;
        }
        &:focus {
            opacity: 1;
        }
        &[disabled] {
            cursor: default;
            color: $color_grey;
        }
        &.selected {
            background-color: #e8f4ff;
            color: $color_blue !important;
            opacity: 1;
            z-index: 2;
            .custom-subtitle {
                color: $color_blue !important;
            }
        }
        &.left {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
        }
        &.right {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }
        &.btn-icon {
            line-height: 1.85;
            .svg-icon {
                display: block;
                float: left;
                width: 24px;
                height: 24px;
                margin-top: 0px;
                margin-right: 4px;
            }
        }
        .button-text {
            text-align: left !important;
            display: inline-block;
            .custom-title {
                font-size: 14px !important;
                display: inline-block;
            }
            .custom-subtitle {
                color: $color_grey;
                font-size: 12px;
                margin-top: -5px;
                display: flex;
                line-height: 1.43;
            }
        }
        .icon-up {
            margin-top: 0px !important;
        }
    }
    &.full-width {
        display: flex;
        .switch-button {
            flex: 1 0;
            display: flex !important;
            justify-content: center;
        }
    }
}
</style>
