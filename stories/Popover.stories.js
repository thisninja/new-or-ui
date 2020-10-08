/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import Popover from '@/components/Popover/main.vue';
import Icon from '@/components/Icon/main.vue';

const content = '<div>Content<div>Line</div><div>Line</div><div>Line</div></div>';
const icons = '<div slot="icons"><icon icon="info" /><icon icon="bin" /></div>';

storiesOf('Popover', module)
    .add(
        'default',
        () => ({
            components: { Popover, Icon },
            template: `<popover :value="true">${content}</popover>`,
        }),
        {
            info: {},
        },
    )
    .add(
        'with title',
        () => ({
            components: { Popover, Icon },
            template: `<popover :value="true" title="trololo">${content}</popover>`,
        }),
        {
            info: {},
        },
    )
    .add(
        'with icons',
        () => ({
            components: { Popover, Icon },
            template: `<popover :value="true">${icons}${content}</popover>`,
        }),
        {
            info: {},
        },
    )
    .add(
        'with title & icons',
        () => ({
            components: { Popover, Icon },
            template: `<popover :value="true" title="trololo" width="500" popper-class="yolo">${icons}${content}</popover>`,
        }),
        {
            info: {},
        },
    );
