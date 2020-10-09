/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import TextExpression from '@/components/TextExpression/main.vue';

storiesOf('TextExpression', module)
    .add(
        'default',
        () => ({
            components: { TextExpression },
            data() {
                return { };
            },
            template: '<text-expression />',
        }),
        {
            info: {},
        },
    );
