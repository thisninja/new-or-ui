import RoundedButton from './main.vue';
import Icon from '../Icon/index';

RoundedButton.install = (Vue) => {
    Vue.use(Icon);
    Vue.component(RoundedButton.name, RoundedButton);
};

export default RoundedButton;
