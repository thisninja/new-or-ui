/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import EmojisPicker from '@/components/EmojisPicker/main.vue';

const reference = '<el-button type="primary" slot="reference">Show picker</el-button>';

storiesOf('EmojisPicker', module)
    .add(
        'default',
        () => ({
            components: { EmojisPicker },
            template: `<emojis-picker @select="action">${reference}</emojis-picker>`,
            methods: { action: action('select') },
        }),
        {
            info: {},
        },
    );
