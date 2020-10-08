/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

const option = '<el-option label="Option 1" value="option1" />';

storiesOf('Select', module)
    .add('default', () => ({
        template: `<el-select placeholder="Enter a placeholder..." value="option1">${option}</el-select>`,
    }))
    .add('no-border', () => ({
        template: `<el-select class="no-border" placeholder="Enter a placeholder..." value="option1">${option}</el-select>`,
    }))
    .add('no-arrow', () => ({
        template: `<el-select class="no-arrow" placeholder="Enter a placeholder..." value="option1">${option}</el-select>`,
    }))
    .add('incognito', () => ({
        template: `<el-select class="incognito" placeholder="Enter a placeholder..." value="option1">${option}</el-select>`,
    }));
