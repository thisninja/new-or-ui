/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

const radio = '<el-radio label="Radio" />';

storiesOf('RadioGroup', module)
    .add('default', () => ({
        template: `<el-radio-group>${radio}</el-radio-group>`,
    }))
    .add('column', () => ({
        template: `<el-radio-group class="column">${radio}</el-radio-group>`,
    }))
    .add('full-width', () => ({
        template: `<el-radio-group class="full-width">${radio}</el-radio-group>`,
    }));
