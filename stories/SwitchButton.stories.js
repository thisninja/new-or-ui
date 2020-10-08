/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import SwitchButton from '@/components/SwitchButton/main.vue';

const options = [
    { value: 'first', title: 'first title' },
    { value: 'second', title: 'second title' },
    { value: 'third', title: 'third title' },
];
const optionsWithNumbers = options.map((option, number) => ({
    ...option,
    number,
}));
const optionsWithSubtitles = options.map(option => ({
    ...option,
    subtitle: `${option.value} subtitle`,
}));
const optionsWithIcons = options.map(option => ({
    ...option,
    icon: 'samples',
}));

storiesOf('SwitchButton', module)
    .add(
        'default (1 button)',
        () => ({
            components: { SwitchButton },
            data() {
                return { options: [options[0]] };
            },
            template: '<switch-button :options="options" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'default (2 buttons)',
        () => ({
            components: { SwitchButton },
            data() {
                return { options: [options[0], options[1]] };
            },
            template: '<switch-button :options="options" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'default (3 buttons)',
        () => ({
            components: { SwitchButton },
            data() {
                return { options };
            },
            template: '<switch-button :options="options" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'with value',
        () => ({
            components: { SwitchButton },
            data() {
                return { options };
            },
            template: '<switch-button :options="options" value="second" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'with numbers',
        () => ({
            components: { SwitchButton },
            data() {
                return { options: optionsWithNumbers };
            },
            template: '<switch-button :options="options" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'with subtitles',
        () => ({
            components: { SwitchButton },
            data() {
                return { options: optionsWithSubtitles };
            },
            template: '<switch-button :options="options" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'disabled',
        () => ({
            components: { SwitchButton },
            data() {
                return { options };
            },
            template: '<switch-button :options="options" :disabled="true" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'with icon',
        () => ({
            components: { SwitchButton },
            data() {
                return { options: optionsWithIcons };
            },
            template: '<switch-button :options="options" value="first" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'full-width=true',
        () => ({
            components: { SwitchButton },
            data() {
                return { options };
            },
            template: '<switch-button :options="options" value="third" full-width />',
        }),
        {
            info: {},
        },
    )
    .add(
        'height=42px',
        () => ({
            components: { SwitchButton },
            data() {
                return { options };
            },
            template: '<switch-button :options="options" height="42px" />',
        }),
        {
            info: {},
        },
    );
