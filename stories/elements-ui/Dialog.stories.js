/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

const content = '<div style="height: 200px;">content</div>';
const footer = '<div slot="footer">footer</div>';

storiesOf('Dialog', module)
    .add('default', () => ({
        template: `<el-dialog title="title" :visible="true">${content}${footer}</el-dialog>`,
    }))
    .add('scrollable', () => ({
        template: `<el-dialog title="title" :visible="true" custom-class="scrollable">${content}${footer}</el-dialog>`,
    }));
