import Avatar from './main.vue';

Avatar.install = (Vue) => {
    Vue.component(Avatar.name, Avatar);
};

export default Avatar;
