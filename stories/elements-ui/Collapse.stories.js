/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

const collapseItem = '<el-collapse-item title="Title">Collapse-item</el-collapse-item>';

storiesOf('Collapse', module)
    .add('default', () => ({
        template: `<el-collapse>${collapseItem}</el-collapse>`,
    }))
    .add('no-border', () => ({
        template: `<el-collapse class="no-border">${collapseItem}</el-collapse>`,
    }));
