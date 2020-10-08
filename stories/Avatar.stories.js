/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import Avatar from '@/components/Avatar/main.vue';

storiesOf('Avatar', module)
    .add(
        'default',
        () => ({
            components: { Avatar },
            template: '<avatar>AF</avatar>',
        }),
        {
            info: {},
        },
    )
    .add(
        'outline=true',
        () => ({
            components: { Avatar },
            template: '<avatar outline>AF</avatar>',
        }),
        {
            info: {},
        },
    )
    .add(
        'full=true',
        () => ({
            components: { Avatar },
            template: '<avatar full>AF</avatar>',
        }),
        {
            info: {},
        },
    )
    .add(
        'size=medium',
        () => ({
            components: { Avatar },
            template: '<avatar size="medium">AF</avatar>',
        }),
        {
            info: {},
        },
    )
    .add(
        'size=small',
        () => ({
            components: { Avatar },
            template: '<avatar size="small">AF</avatar>',
        }),
        {
            info: {},
        },
    )
    .add(
        'size=mini',
        () => ({
            components: { Avatar },
            template: '<avatar size="mini">AF</avatar>',
        }),
        {
            info: {},
        },
    )
    .add(
        'color=teal',
        () => ({
            components: { Avatar },
            template: '<avatar color="teal">AF</avatar>',
        }),
        {
            info: {},
        },
    )
    .add(
        'color=orange',
        () => ({
            components: { Avatar },
            template: '<avatar color="orange">AF</avatar>',
        }),
        {
            info: {},
        },
    )
    .add(
        'color=blue',
        () => ({
            components: { Avatar },
            template: '<avatar color="blue">AF</avatar>',
        }),
        {
            info: {},
        },
    )
    .add(
        'color=red',
        () => ({
            components: { Avatar },
            template: '<avatar color="red">AF</avatar>',
        }),
        {
            info: {},
        },
    )
    .add(
        'color=purple',
        () => ({
            components: { Avatar },
            template: '<avatar color="purple">AF</avatar>',
        }),
        {
            info: {},
        },
    )
    .add(
        'autocolor',
        () => ({
            components: { Avatar },
            template: '<avatar name="Test Toto">AF</avatar>',
        }),
        {
            info: {},
        },
    );
