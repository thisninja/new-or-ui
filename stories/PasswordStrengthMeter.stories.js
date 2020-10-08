/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import PasswordStrengthMeter from '@/components/PasswordStrengthMeter/main.vue';

storiesOf('PasswordStrengthMeter', module)
    .add(
        'default',
        () => ({
            components: { PasswordStrengthMeter },
            data() {
                return { password: 'password' };
            },
            template: '<password-strength-meter v-model="password" show-entropy :min-entropy="80"/>',
        }),
        {
            info: {},
        },
    )
    .add(
        'Password Match mode',
        () => ({
            components: { PasswordStrengthMeter },
            data() {
                return { password: 'password', match: 'MindsayFTW' };
            },
            template: '<password-strength-meter v-model="password" password-match :match="match"/>',
        }),
        {
            info: {},
        },
    );
