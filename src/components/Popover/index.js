import { Popover as ElPopover } from 'element-ui';
import Popover from './main.vue';

Popover.install = (Vue) => {
    Vue.use(ElPopover);
    Vue.component(Popover.name, Popover);
};

export default Popover;
