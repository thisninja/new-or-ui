import { Popover, Tabs, TabPane } from 'element-ui';
import EmojisPicker from './main.vue';

EmojisPicker.install = (Vue) => {
    Vue.use(Popover);
    Vue.use(Tabs);
    Vue.use(TabPane);
    Vue.component(EmojisPicker.name, EmojisPicker);
};

export default EmojisPicker;
