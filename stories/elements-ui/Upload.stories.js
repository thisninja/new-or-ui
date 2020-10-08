/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

const triggerButton = '<el-button type="primary">Upload</el-button>';

storiesOf('Upload', module).add('default', () => ({
    template: `<el-upload action="">${triggerButton}</el-upload>`,
}));
