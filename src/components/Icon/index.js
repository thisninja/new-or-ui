import VueSVGIcon from 'vue-svgicon';
import Icon from './main.vue';

Icon.install = (Vue) => {
    Vue.use(VueSVGIcon);
    Vue.component(Icon.name, Icon);
};

export default Icon;
