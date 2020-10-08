import SwitchIcon from './main.vue';
import Icon from '../Icon/index';

SwitchIcon.install = (Vue) => {
    Vue.use(Icon);
    Vue.component(SwitchIcon.name, SwitchIcon);
};

export default SwitchIcon;
