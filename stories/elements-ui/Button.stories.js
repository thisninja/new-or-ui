/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

storiesOf('Button', module)
    .add('default', () => ({
        template: '<el-button>text</el-button>',
    }))
    .add('with-icon', () => ({
        template: '<el-button class="with-icon"><span class="margin-right-8">icon</span>text</el-button>',
    }));
