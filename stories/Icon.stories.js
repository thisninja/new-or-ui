/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import Icon from '@/components/Icon/main.vue';

storiesOf('Icon', module)
    .add(
        'default',
        () => ({
            components: { Icon },
            template: '<icon icon="activity" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'size=48px',
        () => ({
            components: { Icon },
            template: '<icon icon="activity" size="48px" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'color=red',
        () => ({
            components: { Icon },
            template: '<icon icon="activity" color="red" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'fill=true',
        () => ({
            components: { Icon },
            template: '<icon icon="activity" fill />',
        }),
        {
            info: {},
        },
    )
    .add(
        'dir=up',
        () => ({
            components: { Icon },
            template: '<icon icon="activity" dir="up" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'dir=right',
        () => ({
            components: { Icon },
            template: '<icon icon="activity" dir="right" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'dir=down',
        () => ({
            components: { Icon },
            template: '<icon icon="activity" dir="down" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'dir=left',
        () => ({
            components: { Icon },
            template: '<icon icon="activity" dir="left" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'fill=false',
        () => ({
            components: { Icon },
            template: '<icon icon="activity" :fill="false" />',
        }),
        {
            info: {},
        },
    )
    .add(
        'disabled=true',
        () => ({
            components: { Icon },
            template: '<icon icon="activity" disabled />',
        }),
        {
            info: {},
        },
    );
