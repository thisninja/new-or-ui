/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

storiesOf('Text', module)
    .add('el-h1', () => ({
        template: '<div class="el-h1">Text</div>',
    }))
    .add('el-h2', () => ({
        template: '<div class="el-h2">Text</div>',
    }))
    .add('el-h3', () => ({
        template: '<div class="el-h3">Text</div>',
    }))
    .add('text-regular', () => ({
        template: '<div class="text-regular">Text</div>',
    }))
    .add('text-small', () => ({
        template: '<div class="text-small">Text</div>',
    }))
    .add('text-smaller', () => ({
        template: '<div class="text-smaller">Text</div>',
    }));
