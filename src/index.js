import './lang';
import './styles/index.scss';
import Avatar from './components/Avatar/index';
import EmojisPicker from './components/EmojisPicker/index';
import Icon from './components/Icon/index';
import PasswordStrengthMeter from './components/PasswordStrengthMeter/index';
import Popover from './components/Popover/index';
import SwitchButton from './components/SwitchButton/index';
import SwitchIcon from './components/SwitchIcon/index';
import ThreeStatesSwitch from './components/ThreeStatesSwitch/index';
import IconButton from './components/IconButton/index';

const components = [
    Avatar,
    EmojisPicker,
    Icon,
    PasswordStrengthMeter,
    Popover,
    SwitchButton,
    SwitchIcon,
    ThreeStatesSwitch,
    IconButton,
];

function install(Vue) {
    components.forEach((component) => {
        Vue.use(component);
    });
}

export * from './constants';
export default { install };
export {
    Avatar,
    EmojisPicker,
    Icon,
    PasswordStrengthMeter,
    Popover,
    SwitchButton,
    SwitchIcon,
    ThreeStatesSwitch,
    IconButton,
};
