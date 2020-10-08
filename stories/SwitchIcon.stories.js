/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import SwitchIcon from '@/components/SwitchIcon/main.vue';

storiesOf('SwitchIcon', module)
    .add(
        'default',
        () => ({
            components: { SwitchIcon },
            template: '<switch-icon icon-on="arrowto" icon-off="arrowto" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'value=true',
        () => ({
            components: { SwitchIcon },
            template: '<switch-icon :value="true" icon-on="arrowto" icon-off="arrowto" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'width=40px',
        () => ({
            components: { SwitchIcon },
            template: '<switch-icon icon-on="arrowto" icon-off="arrowto" width="40px" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'height=32px',
        () => ({
            components: { SwitchIcon },
            template: '<switch-icon icon-on="arrowto" icon-off="arrowto" height="32px" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'border-radius=4px',
        () => ({
            components: { SwitchIcon },
            template: '<switch-icon icon-on="arrowto" icon-off="arrowto" border-radius="4px" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'padding=4px',
        () => ({
            components: { SwitchIcon },
            template: '<switch-icon icon-on="arrowto" icon-off="arrowto" padding="4px" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'color-off=red',
        () => ({
            components: { SwitchIcon },
            template: '<switch-icon icon-on="arrowto" icon-off="arrowto" color-off="red" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'value=true & color-on=blue',
        () => ({
            components: { SwitchIcon },
            template: '<switch-icon :value="true" icon-on="arrowto" icon-off="arrowto" color-on="blue" />',
        }),
        {
            info: {},
        },
    );
