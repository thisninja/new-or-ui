<template>
    <div :class="['cl-password-strength-meter', approved ? 'approved' : 'not-approved']">
        <el-input
            :value="value"
            :type="peek ? 'text' : 'password'"
            :placeholder="placeholder"
            v-on="eventListener"
        >
            <i slot="prefix"
               class="el-input__icon el-icon-view"
               @click="peek = !peek"
               @mouseleave="peek = false">
            </i>
        </el-input>
        <div class="password-info" v-if="!passwordMatch">
            <div class="entropy-container">
                <div
                    :class="['entropy-bar', entropyLevel]"
                    :style="{ width: entropyBarSize, opacity: entropyOpacity }"
                >
                    {{ (showEntropy && entropy) ? entropy : '' }}
                </div>
            </div>
            <span v-for="signal in signalList"
                  :key="signal.label"
                  :class="['signal', { active: signalValues[signal.condition] }]">
                {{ signal.label }}
                <i v-if="signalValues[signal.condition]" class="el-icon-check active-marker"/>
            </span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ClPasswordStrengthMeter',
    props: {
        value: {
            type: String,
            default: '',
        },
        match: {
            type: String,
            default: '',
        },
        minEntropy: {
            type: Number,
            default: 1,
        },
        showEntropy: {
            type: Boolean,
            default: false,
        },
        passwordMatch: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            peek: false,
            signalList: [
                {
                    label: 'abc',
                    condition: 'hasLowerCase',
                },
                {
                    label: 'ABC',
                    condition: 'hasUpperCase',
                },
                {
                    label: '123',
                    condition: 'hasNumeric',
                },
                {
                    label: '!?#',
                    condition: 'hasNonAlphaNumeric',
                },
            ],
        };
    },
    computed: {
        approved() {
            return this.passwordMatch
                ? this.match === this.value
                : this.entropy >= this.minEntropy;
        },
        characterPoolSize() {
            let pool = 0;
            pool += this.signalValues.hasNumeric ? 10 : 0;
            pool += this.signalValues.hasLowerCase ? 26 : 0;
            pool += this.signalValues.hasUpperCase ? 26 : 0;
            pool += this.signalValues.hasNonAlphaNumeric ? 32 : 0;
            return pool;
        },
        entropy() {
            const length = this.value ? this.value.length : 0;
            return (this.characterPoolSize === 0 || length === 0)
                ? 0
                : Math.floor(Math.log2(this.characterPoolSize) * length);
        },
        entropyBarSize() {
            return `${Math.floor(Math.min(this.entropy / (this.minEntropy * 2.0), 1) * 100)}%`;
        },
        entropyLevel() {
            return (this.entropy >= this.minEntropy) ? 'entropy-high' : 'entropy-low';
        },
        entropyOpacity() {
            if (this.entropy >= (2 * this.minEntropy)) {
                return 1;
            }
            if (this.entropy >= this.minEntropy) {
                return (this.entropy * 1.0) / (this.minEntropy * 2.0);
            }
            return 1 - (this.entropy * 1.0) / (this.minEntropy * 2.0);
        },
        eventListener() {
            return {
                ...this.$listeners,
                input: (value) => {
                    this.$emit('input', value);
                },
            };
        },
        signalValues() {
            return {
                hasLowerCase: /[a-z]+/.test(this.value),
                hasUpperCase: /[A-Z]+/.test(this.value),
                hasNonAlphaNumeric: /[^a-zA-Z\d\s:]+/.test(this.value),
                hasNumeric: /\d+/.test(this.value),
            };
        },
    },
};
</script>
<style lang="scss">
@import '../../styles/index.scss';
.cl-password-strength-meter {
    display: flex;
    flex-direction: column;
    &.approved .el-input__inner{
        border-color: $color_blue;
        box-shadow: $color_blue 0 0 0 1px;
        outline: none;
        border-style: none;
    }
    &.not-approved .el-input__inner{
        border-color: $color_purple;
        box-shadow: $color_purple 0 0 0 1px;
        outline: none;
        border-style: none;
    }
    .el-input {
        .el-input__inner {
            height: 32px;
            &:focus {
                border-style: solid;
            }
        }
        .el-input__icon {
            font-size: 14px;
            line-height: 32px;
            cursor: pointer;
            &:hover {
                color: $color_grey;
            }
        }
    }
    .password-info {
        display: flex;
        flex-direction: row;
        margin-top: 3px;
        .entropy-container {
            flex: 1 0 0;
            display: flex;
            flex-direction: row;
            background: $color_light_grey4;
            border-radius: 6px;
            color: white;
            font-size: 10px;
            font-weight: bold;
            margin-right: 2px;
            .entropy-bar {
                padding: 2px 0;
                border-radius: 6px;
                transition: width 0.5s ease-out;
                text-align: center;
            }
            .entropy-low {
                background: $color_purple;
            }
            .entropy-high {
                background: $color_blue;
            }
        }
        .signal {
            position: relative;
            flex: 0 0 auto;
            font-size: 10px;
            font-weight: 600;
            color: $color-purple;
            background: $color_light_purple3;
            padding: 3px 6px;
            margin: 0 2px;
            border-radius: 7px;
            &.active {
                background: $color_light_blue3;
                color: $color_blue;
            }
            .active-marker {
                position: absolute;
                font-weight: bold;
                bottom: -2px;
                right: -3px;
                color: $color_blue;
            }
        }

    }
}
</style>
