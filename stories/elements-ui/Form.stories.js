/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

const formItem = '<el-form-item label="Label"><el-input placeholder="Placeholder" /></el-form-item>';

storiesOf('Form', module).add('default', () => ({
    template: `<el-form>${formItem}</el-form>`,
}));
