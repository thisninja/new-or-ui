import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

Vue.config.productionTip = false;

const componentStub = {
    render(h) {
        return h('div', { class: this.$options.name }, Object.values(this.$slots));
    },
};

global.shallowMount = (component, options = {}) => {
    const mountOptions = {
        ...options,
        stubs: {
            ...options.stubs,
            'el-button': componentStub,
            'el-upload': componentStub,
            'el-tag': componentStub,
            'el-tab-pane': componentStub,
            'el-tabs': componentStub,
            'el-popover': componentStub,
        },
    };

    return shallowMount(component, mountOptions);
};
