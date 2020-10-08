/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import {
    COLOR_GREY,
    COLOR_LIGHT_GREY_1,
    COLOR_LIGHT_GREY_2,
    COLOR_LIGHT_GREY_3,
    COLOR_LIGHT_GREY_4,
    COLOR_LIGHT_GREY_5,
    COLOR_LIGHT_GREY_6,
    COLOR_LIGHT_GREY_7,
    COLOR_LIGHT_GREY_8,
    COLOR_DARK_GREY_1,
    COLOR_DARK_GREY_2,
    COLOR_BLUE,
    COLOR_LIGHT_BLUE_1,
    COLOR_LIGHT_BLUE_2,
    COLOR_LIGHT_BLUE_3,
    COLOR_LIGHT_BLUE_4,
    COLOR_DARK_BLUE_1,
    COLOR_DARK_BLUE_2,
    COLOR_GREEN,
    COLOR_LIGHT_GREEN_1,
    COLOR_LIGHT_GREEN_2,
    COLOR_DARK_GREEN_1,
    COLOR_DARK_GREEN_2,
    COLOR_DARK_GREEN_3,
    COLOR_RED,
    COLOR_LIGHT_RED_1,
    COLOR_LIGHT_RED_2,
    COLOR_DARK_RED_1,
    COLOR_DARK_RED_2,
    COLOR_DARK_RED_3,
    COLOR_TEAL,
    COLOR_LIGHT_TEAL_1,
    COLOR_LIGHT_TEAL_2,
    COLOR_DARK_TEAL_1,
    COLOR_DARK_TEAL_2,
    COLOR_DARK_TEAL_3,
    COLOR_PURPLE,
    COLOR_LIGHT_PURPLE_1,
    COLOR_LIGHT_PURPLE_2,
    COLOR_LIGHT_PURPLE_3,
    COLOR_DARK_PURPLE_1,
    COLOR_DARK_PURPLE_2,
    COLOR_DARK_PURPLE_3,
    COLOR_ORANGE,
    COLOR_LIGHT_ORANGE_1,
    COLOR_LIGHT_ORANGE_2,
    COLOR_DARK_ORANGE_1,
    COLOR_DARK_ORANGE_2,
    COLOR_DARK_ORANGE_3,
} from '../src/constants';

storiesOf('Colors', module)
    // ---- GREY ----
    .add('COLOR_GREY', () => ({
        template: `<el-tag color=${COLOR_GREY}>${COLOR_GREY}</el-tag>`,
    }))
    .add('COLOR_LIGHT_GREY_1', () => ({
        template: `<el-tag color=${COLOR_LIGHT_GREY_1}>${COLOR_LIGHT_GREY_1}</el-tag>`,
    }))
    .add('COLOR_LIGHT_GREY_2', () => ({
        template: `<el-tag color=${COLOR_LIGHT_GREY_2}>${COLOR_LIGHT_GREY_2}</el-tag>`,
    }))
    .add('COLOR_LIGHT_GREY_3', () => ({
        template: `<el-tag color=${COLOR_LIGHT_GREY_3}>${COLOR_LIGHT_GREY_3}</el-tag>`,
    }))
    .add('COLOR_LIGHT_GREY_4', () => ({
        template: `<el-tag color=${COLOR_LIGHT_GREY_4}>${COLOR_LIGHT_GREY_4}</el-tag>`,
    }))
    .add('COLOR_LIGHT_GREY_5', () => ({
        template: `<el-tag color=${COLOR_LIGHT_GREY_5}>${COLOR_LIGHT_GREY_5}</el-tag>`,
    }))
    .add('COLOR_LIGHT_GREY_6', () => ({
        template: `<el-tag color=${COLOR_LIGHT_GREY_6}>${COLOR_LIGHT_GREY_6}</el-tag>`,
    }))
    .add('COLOR_LIGHT_GREY_7', () => ({
        template: `<el-tag color=${COLOR_LIGHT_GREY_7}>${COLOR_LIGHT_GREY_7}</el-tag>`,
    }))
    .add('COLOR_LIGHT_GREY_8', () => ({
        template: `<el-tag color=${COLOR_LIGHT_GREY_8}>${COLOR_LIGHT_GREY_8}</el-tag>`,
    }))
    .add('COLOR_DARK_GREY_1', () => ({
        template: `<el-tag color=${COLOR_DARK_GREY_1}>${COLOR_DARK_GREY_1}</el-tag>`,
    }))
    .add('COLOR_DARK_GREY_2', () => ({
        template: `<el-tag color=${COLOR_DARK_GREY_2}>${COLOR_DARK_GREY_2}</el-tag>`,
    }))
    // ---- BLUE ----
    .add('COLOR_BLUE', () => ({
        template: `<el-tag color=${COLOR_BLUE}>${COLOR_BLUE}</el-tag>`,
    }))
    .add('COLOR_LIGHT_BLUE_1', () => ({
        template: `<el-tag color=${COLOR_LIGHT_BLUE_1}>${COLOR_LIGHT_BLUE_1}</el-tag>`,
    }))
    .add('COLOR_LIGHT_BLUE_2', () => ({
        template: `<el-tag color=${COLOR_LIGHT_BLUE_2}>${COLOR_LIGHT_BLUE_2}</el-tag>`,
    }))
    .add('COLOR_LIGHT_BLUE_3', () => ({
        template: `<el-tag color=${COLOR_LIGHT_BLUE_3}>${COLOR_LIGHT_BLUE_3}</el-tag>`,
    }))
    .add('COLOR_LIGHT_BLUE_4', () => ({
        template: `<el-tag color=${COLOR_LIGHT_BLUE_4}>${COLOR_LIGHT_BLUE_4}</el-tag>`,
    }))
    .add('COLOR_DARK_BLUE_1', () => ({
        template: `<el-tag color=${COLOR_DARK_BLUE_1}>${COLOR_DARK_BLUE_1}</el-tag>`,
    }))
    .add('COLOR_DARK_BLUE_2', () => ({
        template: `<el-tag color=${COLOR_DARK_BLUE_2}>${COLOR_DARK_BLUE_2}</el-tag>`,
    }))
    // ---- GREEN ----
    .add('COLOR_GREEN', () => ({
        template: `<el-tag color=${COLOR_GREEN}>${COLOR_GREEN}</el-tag>`,
    }))
    .add('COLOR_LIGHT_GREEN_1', () => ({
        template: `<el-tag color=${COLOR_LIGHT_GREEN_1}>${COLOR_LIGHT_GREEN_1}</el-tag>`,
    }))
    .add('COLOR_LIGHT_GREEN_2', () => ({
        template: `<el-tag color=${COLOR_LIGHT_GREEN_2}>${COLOR_LIGHT_GREEN_2}</el-tag>`,
    }))
    .add('COLOR_DARK_GREEN_1', () => ({
        template: `<el-tag color=${COLOR_DARK_GREEN_1}>${COLOR_DARK_GREEN_1}</el-tag>`,
    }))
    .add('COLOR_DARK_GREEN_2', () => ({
        template: `<el-tag color=${COLOR_DARK_GREEN_2}>${COLOR_DARK_GREEN_2}</el-tag>`,
    }))
    .add('COLOR_DARK_GREEN_3', () => ({
        template: `<el-tag color=${COLOR_DARK_GREEN_3}>${COLOR_DARK_GREEN_3}</el-tag>`,
    }))
    // ---- RED ----
    .add('COLOR_RED', () => ({
        template: `<el-tag color=${COLOR_RED}>${COLOR_RED}</el-tag>`,
    }))
    .add('COLOR_LIGHT_RED_1', () => ({
        template: `<el-tag color=${COLOR_LIGHT_RED_1}>${COLOR_LIGHT_RED_1}</el-tag>`,
    }))
    .add('COLOR_LIGHT_RED_2', () => ({
        template: `<el-tag color=${COLOR_LIGHT_RED_2}>${COLOR_LIGHT_RED_2}</el-tag>`,
    }))
    .add('COLOR_DARK_RED_1', () => ({
        template: `<el-tag color=${COLOR_DARK_RED_1}>${COLOR_DARK_RED_1}</el-tag>`,
    }))
    .add('COLOR_DARK_RED_2', () => ({
        template: `<el-tag color=${COLOR_DARK_RED_2}>${COLOR_DARK_RED_2}</el-tag>`,
    }))
    .add('COLOR_DARK_RED_3', () => ({
        template: `<el-tag color=${COLOR_DARK_RED_3}>${COLOR_DARK_RED_3}</el-tag>`,
    }))
    // ---- TEAL ----
    .add('COLOR_TEAL', () => ({
        template: `<el-tag color=${COLOR_TEAL}>${COLOR_TEAL}</el-tag>`,
    }))
    .add('COLOR_LIGHT_TEAL_1', () => ({
        template: `<el-tag color=${COLOR_LIGHT_TEAL_1}>${COLOR_LIGHT_TEAL_1}</el-tag>`,
    }))
    .add('COLOR_LIGHT_TEAL_2', () => ({
        template: `<el-tag color=${COLOR_LIGHT_TEAL_2}>${COLOR_LIGHT_TEAL_2}</el-tag>`,
    }))
    .add('COLOR_DARK_TEAL_1', () => ({
        template: `<el-tag color=${COLOR_DARK_TEAL_1}>${COLOR_DARK_TEAL_1}</el-tag>`,
    }))
    .add('COLOR_DARK_TEAL_2', () => ({
        template: `<el-tag color=${COLOR_DARK_TEAL_2}>${COLOR_DARK_TEAL_2}</el-tag>`,
    }))
    .add('COLOR_DARK_TEAL_3', () => ({
        template: `<el-tag color=${COLOR_DARK_TEAL_3}>${COLOR_DARK_TEAL_3}</el-tag>`,
    }))
    // ---- PURPLE ----
    .add('COLOR_PURPLE', () => ({
        template: `<el-tag color=${COLOR_PURPLE}>${COLOR_PURPLE}</el-tag>`,
    }))
    .add('COLOR_LIGHT_PURPLE_1', () => ({
        template: `<el-tag color=${COLOR_LIGHT_PURPLE_1}>${COLOR_LIGHT_PURPLE_1}</el-tag>`,
    }))
    .add('COLOR_LIGHT_PURPLE_2', () => ({
        template: `<el-tag color=${COLOR_LIGHT_PURPLE_2}>${COLOR_LIGHT_PURPLE_2}</el-tag>`,
    }))
    .add('COLOR_LIGHT_PURPLE_3', () => ({
        template: `<el-tag color=${COLOR_LIGHT_PURPLE_3}>${COLOR_LIGHT_PURPLE_3}</el-tag>`,
    }))
    .add('COLOR_DARK_PURPLE_1', () => ({
        template: `<el-tag color=${COLOR_DARK_PURPLE_1}>${COLOR_DARK_PURPLE_1}</el-tag>`,
    }))
    .add('COLOR_DARK_PURPLE_2', () => ({
        template: `<el-tag color=${COLOR_DARK_PURPLE_2}>${COLOR_DARK_PURPLE_2}</el-tag>`,
    }))
    .add('COLOR_DARK_PURPLE_3', () => ({
        template: `<el-tag color=${COLOR_DARK_PURPLE_3}>${COLOR_DARK_PURPLE_3}</el-tag>`,
    }))
    // ---- ORANGE ----
    .add('COLOR_ORANGE', () => ({
        template: `<el-tag color=${COLOR_ORANGE}>${COLOR_ORANGE}</el-tag>`,
    }))
    .add('COLOR_LIGHT_ORANGE_1', () => ({
        template: `<el-tag color=${COLOR_LIGHT_ORANGE_1}>${COLOR_LIGHT_ORANGE_1}</el-tag>`,
    }))
    .add('COLOR_LIGHT_ORANGE_2', () => ({
        template: `<el-tag color=${COLOR_LIGHT_ORANGE_2}>${COLOR_LIGHT_ORANGE_2}</el-tag>`,
    }))
    .add('COLOR_DARK_ORANGE_1', () => ({
        template: `<el-tag color=${COLOR_DARK_ORANGE_1}>${COLOR_DARK_ORANGE_1}</el-tag>`,
    }))
    .add('COLOR_DARK_ORANGE_2', () => ({
        template: `<el-tag color=${COLOR_DARK_ORANGE_2}>${COLOR_DARK_ORANGE_2}</el-tag>`,
    }))
    .add('COLOR_DARK_ORANGE_3', () => ({
        template: `<el-tag color=${COLOR_DARK_ORANGE_3}>${COLOR_DARK_ORANGE_3}</el-tag>`,
    }));
