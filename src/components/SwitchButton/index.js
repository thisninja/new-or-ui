import { Tag } from 'element-ui';
import SwitchButton from './main.vue';
import Icon from '../Icon/index';

SwitchButton.install = (Vue) => {
    Vue.use(Tag);
    Vue.use(Icon);
    Vue.component(SwitchButton.name, SwitchButton);
};

export default SwitchButton;
