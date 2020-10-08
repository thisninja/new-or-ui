/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

const dropdownItem = '<el-dropdown-item>Dropdown Item</el-dropdown-item>';
const triggerButton = '<el-button type="primary">Dropdown List</el-button>';

storiesOf('DropdownMenu', module).add('default', () => ({
    template: `<el-dropdown trigger="click">${triggerButton}<el-dropdown-menu slot="dropdown">${dropdownItem}</el-dropdown-menu></el-dropdown>`,
}));
