/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import ThreeStatesSwitch from '@/components/ThreeStatesSwitch/main.vue';

storiesOf('ThreeStatesSwitch', module)
    .add(
        'checked=SWITCH_OFF with default colors',
        () => ({
            components: { ThreeStatesSwitch },
            data() {
                return { value: false };
            },
            template: '<three-states-switch v-model="value" @change="action" />',
            methods: { action: action('change') },
        }),
        {
            info: {},
        },
    )
    .add(
        'checked=SWITCH_PARTIAL with default colors',
        () => ({
            components: { ThreeStatesSwitch },
            data() {
                return { value: null };
            },
            template: '<three-states-switch v-model="value" @change="action" />',
            methods: { action: action('change') },
        }),
        {
            info: {},
        },
    )
    .add(
        'checked=SWITCH_ON with default colors',
        () => ({
            components: { ThreeStatesSwitch },
            data() {
                return { value: true };
            },
            template: '<three-states-switch v-model="value" @change="action" />',
            methods: { action: action('change') },
        }),
        {
            info: {},
        },
    )
    .add(
        'off-color=green',
        () => ({
            components: { ThreeStatesSwitch },
            data() {
                return { value: false };
            },
            template: '<three-states-switch v-model="value" @change="action" off-color="green" />',
            methods: { action: action('change') },
        }),
        {
            info: {},
        },
    )
    .add(
        'partial-color=grey',
        () => ({
            components: { ThreeStatesSwitch },
            data() {
                return { value: null };
            },
            template: '<three-states-switch v-model="value" @change="action" partial-color="grey" />',
            methods: { action: action('change') },
        }),
        {
            info: {},
        },
    )
    .add(
        'on-color=orange',
        () => ({
            components: { ThreeStatesSwitch },
            data() {
                return { value: true };
            },
            template: '<three-states-switch v-model="value" @change="action" on-color="orange" />',
            methods: { action: action('change') },
        }),
        {
            info: {},
        },
    )
    .add(
        'width=80px',
        () => ({
            components: { ThreeStatesSwitch },
            data() {
                return { value: true };
            },
            template: '<three-states-switch v-model="value" @change="action" width="80px" />',
            methods: { action: action('change') },
        }),
        {
            info: {},
        },
    )
    .add(
        'height=48px',
        () => ({
            components: { ThreeStatesSwitch },
            data() {
                return { value: true };
            },
            template: '<three-states-switch v-model="value" @change="action" height="48px" />',
            methods: { action: action('change') },
        }),
        {
            info: {},
        },
    )
    .add(
        'square-size=12px',
        () => ({
            components: { ThreeStatesSwitch },
            data() {
                return { value: true };
            },
            template: '<three-states-switch v-model="value" @change="action" square-size="12px" />',
            methods: { action: action('change') },
        }),
        {
            info: {},
        },
    )
    .add(
        'border-radius=24px',
        () => ({
            components: { ThreeStatesSwitch },
            data() {
                return { value: true };
            },
            template: '<three-states-switch v-model="value" @change="action" border-radius="24px" />',
            methods: { action: action('change') },
        }),
        {
            info: {},
        },
    )
    .add(
        'disabled=true',
        () => ({
            components: { ThreeStatesSwitch },
            data() {
                return { value: true };
            },
            template: '<three-states-switch v-model="value" @change="action" :disabled="true" />',
            methods: { action: action('change') },
        }),
        {
            info: {},
        },
    );
