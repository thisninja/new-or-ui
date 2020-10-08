/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

storiesOf('CollapseItem', module)
    .add('default', () => ({
        template:
            '<el-collapse><el-collapse-item title="Title">Content</el-collapse-item></el-collapse>',
    }))
    .add('disabled', () => ({
        template:
            '<el-collapse><el-collapse-item title="Title" class="disabled">Content</el-collapse-item></el-collapse>',
    }))
    .add('no-arrow', () => ({
        template:
            '<el-collapse><el-collapse-item title="Title" class="no-arrow">Content</el-collapse-item></el-collapse>',
    }));
