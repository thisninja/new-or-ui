<template>
    <el-popover
        v-bind="{ ...$attrs, title: null }"
        v-on="$listeners"
        :popper-class="`cl-popover${$attrs['popper-class'] ? ` ${$attrs['popper-class']}` : ''}`"
    >
        <template>
            <div v-if="hasHeader" class="header">
                <div class="title text-regular">{{ $attrs.title }}</div>
                <div class="icons"><slot name="icons" /></div>
            </div>
            <div class="content">
                <slot />
            </div>
        </template>
        <slot name="reference" slot="reference" />
    </el-popover>
</template>

<script>
export default {
    name: 'ClPopover',
    inheritAttrs: false,
    computed: {
        hasHeader() {
            return this.$attrs.title || this.$slots.icons;
        },
    },
};
</script>

<style lang="scss">
@import '../../styles/index.scss';

.cl-popover {
    border-radius: 8px;
    padding: 0px;
    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border-bottom: thin solid $color_light_grey4;
        height: 48px;
        box-sizing: border-box;
        .title {
            padding: 0px 16px;
            color: $color_light_grey1;
        }
        .icons {
            position: absolute;
            right: 16px;
        }
    }
    .content {
        padding: 16px;
        overflow-y: auto;
    }
}
</style>
