// import './lang';
import './styles/index.scss';
// import EmojisPicker from './components/EmojisPicker/index';
// import PasswordStrengthMeter from './components/PasswordStrengthMeter/index';
import TextExpression from './components/TextExpression/index';


const components = [TextExpression];

function install(Vue) {
    components.forEach((component) => {
        Vue.use(component);
    });
}

export * from './constants';
export default { install };
export { TextExpression };
