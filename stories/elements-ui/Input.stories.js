/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

storiesOf('Input', module)
    .add('default', () => ({
        template: '<el-input placeholder="Placeholder" />',
    }))
    .add('no-border', () => ({
        template: '<el-input class="no-border" placeholder="Placeholder" />',
    }))
    .add('no-background', () => ({
        template: '<el-input class="no-background" placeholder="Placeholder" />',
    }));
