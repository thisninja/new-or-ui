/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import { Button, Tag, Icon } from 'ant-design-vue';
import VueSVGIcon from 'vue-svgicon';
import { configure, addDecorator } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import '../../src/styles/index.scss';

import ComponentsLibrary from '../../src/index';

addDecorator(withInfo);

Vue.use(Button);
Vue.use(Tag);
Vue.use(Icon);
Vue.use(VueSVGIcon);
Vue.use(ComponentsLibrary);

const req = require.context('../../stories', true, /.stories.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
