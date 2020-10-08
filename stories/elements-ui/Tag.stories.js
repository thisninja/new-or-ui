/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

storiesOf('Tag', module)
    .add('default', () => ({
        template: '<el-tag>Tag</el-tag>',
    }))
    .add('rounded', () => ({
        template: '<el-tag class="rounded">Tag</el-tag>',
    }))
    .add('grey', () => ({
        template: '<el-tag class="grey">Tag</el-tag>',
    }))
    .add('light-blue', () => ({
        template: '<el-tag class="light-blue">Tag</el-tag>',
    }))
    .add('blue', () => ({
        template: '<el-tag class="blue">Tag</el-tag>',
    }))
    .add('orange', () => ({
        template: '<el-tag class="orange">Tag</el-tag>',
    }))
    .add('purple', () => ({
        template: '<el-tag class="purple">Tag</el-tag>',
    }))
    .add('outlined grey', () => ({
        template: '<el-tag class="outlined grey">Tag</el-tag>',
    }))
    .add('outlined blue', () => ({
        template: '<el-tag class="outlined blue">Tag</el-tag>',
    }))
    .add('outlined orange', () => ({
        template: '<el-tag class="outlined orange">Tag</el-tag>',
    }))
    .add('arrow grey', () => ({
        template: '<el-tag class="arrow grey">Tag</el-tag>',
    }))
    .add('arrow blue', () => ({
        template: '<el-tag class="arrow blue">Tag</el-tag>',
    }))
    .add('arrow orange', () => ({
        template: '<el-tag class="arrow orange">Tag</el-tag>',
    }));
