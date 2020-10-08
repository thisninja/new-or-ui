<template>
    <button class="cl-icon-button"
            v-on="$listeners"
            :disabled="disabled"
            :class="[{ small, mini }]">
        <cl-icon :icon="icon" color="currentColor"></cl-icon>
    </button>
</template>

<script>

export default {
    name: 'ClIconButton',
    props: {
        mini: {
            type: Boolean,
            default: false,
        },
        small: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss">
    @import "../../styles/colors";

    .cl-icon-button {
        padding: 12px;
        width: 24px;
        height: 24px;
        background: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        border-radius: 50%;
        border: none;
        box-sizing: content-box;
        outline: none;
        color: $color_grey;
        transition: 250ms all;
        cursor: pointer;

        svg {
            transition-property: transform, fill;
        }

        &:hover {
            color: $color_blue;
        }

        &.small {
            padding: 4px;
        }

        &.mini {
            padding: 0;
        }

        &[disabled] {
            color: $color_light_grey2;
            cursor: default;

            &:hover {
                color: $color_light_grey2;
            }
        }
    }
</style>
