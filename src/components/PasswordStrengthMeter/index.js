import { Input } from 'element-ui';
import PasswordStrengthMeter from './main.vue';

PasswordStrengthMeter.install = (Vue) => {
    Vue.use(Input);
    Vue.component(PasswordStrengthMeter.name, PasswordStrengthMeter);
};

export default PasswordStrengthMeter;
