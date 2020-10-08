/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

storiesOf('FormItem', module)
    .add('default', () => ({
        template:
            '<el-form><el-form-item label="Label"><el-input placeholder="Placeholder" /></el-form-item></el-form>',
    }))
    .add('inline', () => ({
        template:
            '<el-form><el-form-item class="inline" label="Label"><el-input placeholder="Placeholder" /></el-form-item></el-form>',
    }))
    .add('is-required', () => ({
        template:
            '<el-form><el-form-item class="is-required" label="Label"><el-input placeholder="Placeholder" /></el-form-item></el-form>',
    }));
