/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import IconButton from '@/components/IconButton/main.vue';

storiesOf('IconButton', module)
    .add(
        'default',
        () => ({
            components: { IconButton },
            template: '<icon-button icon="like"></icon-button>',
        }),
        {
            info: {},
        },
    )
    .add(
        'small',
        () => ({
            components: { IconButton },
            template: '<icon-button small icon="incomprehension"></icon-button>',
        }),
        {
            info: {},
        },
    )
    .add(
        'mini',
        () => ({
            components: { IconButton },
            template: '<icon-button mini icon="settings"></icon-button>',
        }),
        {
            info: {},
        },
    )
    .add(
        'disabled',
        () => ({
            components: { IconButton },
            template: '<icon-button disabled icon="like"></icon-button>',
        }),
        {
            info: {},
        },
    );
