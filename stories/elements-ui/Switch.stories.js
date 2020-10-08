/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import { COLOR_GREEN, COLOR_LIGHT_GREY_4 } from '../../src/constants';

storiesOf('Switch', module)
    .add('default inactive', () => ({
        template: '<el-switch active-text="active" inactive-text="inactive" />',
    }))
    .add('default active', () => ({
        template: '<el-switch active-text="active" inactive-text="inactive" :value="true" />',
    }))
    .add('with colors inactive', () => ({
        template: `<el-switch active-text="active" inactive-text="inactive" active-color="${COLOR_GREEN}" inactive-color="${COLOR_LIGHT_GREY_4}" />`,
    }))
    .add('with colors active', () => ({
        template: `<el-switch active-text="active" inactive-text="inactive" active-color="${COLOR_GREEN}" inactive-color="${COLOR_LIGHT_GREY_4}" :value="true" />`,
    }))
    .add('class="small" inactive', () => ({
        template: '<el-switch class="small" />',
    }))
    .add('class="small" active', () => ({
        template: '<el-switch class="small" :value="true" />',
    }));
