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
  COLOR_DARK_ORANGE_3
} from '../src/constants';

storiesOf('Colors', module)
  .addDecorator(() => ({
    template: '<div style="margin: 1em;"><story/></div>'
  }))
  // ---- GREY ----
  .add('COLOR_GREY', () => ({
    template: `<a-tag color=${COLOR_GREY}>${COLOR_GREY}</a-tag>`
  }))
  .add('COLOR_LIGHT_GREY_1', () => ({
    template: `<a-tag color=${COLOR_LIGHT_GREY_1}>${COLOR_LIGHT_GREY_1}</a-tag>`
  }))
  .add('COLOR_LIGHT_GREY_2', () => ({
    template: `<a-tag color=${COLOR_LIGHT_GREY_2}>${COLOR_LIGHT_GREY_2}</a-tag>`
  }))
  .add('COLOR_LIGHT_GREY_3', () => ({
    template: `<a-tag color=${COLOR_LIGHT_GREY_3}>${COLOR_LIGHT_GREY_3}</a-tag>`
  }))
  .add('COLOR_LIGHT_GREY_4', () => ({
    template: `<a-tag color=${COLOR_LIGHT_GREY_4}>${COLOR_LIGHT_GREY_4}</a-tag>`
  }))
  .add('COLOR_LIGHT_GREY_5', () => ({
    template: `<a-tag color=${COLOR_LIGHT_GREY_5}>${COLOR_LIGHT_GREY_5}</a-tag>`
  }))
  .add('COLOR_LIGHT_GREY_6', () => ({
    template: `<a-tag color=${COLOR_LIGHT_GREY_6}>${COLOR_LIGHT_GREY_6}</a-tag>`
  }))
  .add('COLOR_LIGHT_GREY_7', () => ({
    template: `<a-tag color=${COLOR_LIGHT_GREY_7}>${COLOR_LIGHT_GREY_7}</a-tag>`
  }))
  .add('COLOR_LIGHT_GREY_8', () => ({
    template: `<a-tag color=${COLOR_LIGHT_GREY_8}>${COLOR_LIGHT_GREY_8}</a-tag>`
  }))
  .add('COLOR_DARK_GREY_1', () => ({
    template: `<a-tag color=${COLOR_DARK_GREY_1}>${COLOR_DARK_GREY_1}</a-tag>`
  }))
  .add('COLOR_DARK_GREY_2', () => ({
    template: `<a-tag color=${COLOR_DARK_GREY_2}>${COLOR_DARK_GREY_2}</a-tag>`
  }))
  // ---- BLUE ----
  .add('COLOR_BLUE', () => ({
    template: `<a-tag color=${COLOR_BLUE}>${COLOR_BLUE}</a-tag>`
  }))
  .add('COLOR_LIGHT_BLUE_1', () => ({
    template: `<a-tag color=${COLOR_LIGHT_BLUE_1}>${COLOR_LIGHT_BLUE_1}</a-tag>`
  }))
  .add('COLOR_LIGHT_BLUE_2', () => ({
    template: `<a-tag color=${COLOR_LIGHT_BLUE_2}>${COLOR_LIGHT_BLUE_2}</a-tag>`
  }))
  .add('COLOR_LIGHT_BLUE_3', () => ({
    template: `<a-tag color=${COLOR_LIGHT_BLUE_3}>${COLOR_LIGHT_BLUE_3}</a-tag>`
  }))
  .add('COLOR_LIGHT_BLUE_4', () => ({
    template: `<a-tag color=${COLOR_LIGHT_BLUE_4}>${COLOR_LIGHT_BLUE_4}</a-tag>`
  }))
  .add('COLOR_DARK_BLUE_1', () => ({
    template: `<a-tag color=${COLOR_DARK_BLUE_1}>${COLOR_DARK_BLUE_1}</a-tag>`
  }))
  .add('COLOR_DARK_BLUE_2', () => ({
    template: `<a-tag color=${COLOR_DARK_BLUE_2}>${COLOR_DARK_BLUE_2}</a-tag>`
  }))
  // ---- GREEN ----
  .add('COLOR_GREEN', () => ({
    template: `<a-tag color=${COLOR_GREEN}>${COLOR_GREEN}</a-tag>`
  }))
  .add('COLOR_LIGHT_GREEN_1', () => ({
    template: `<a-tag color=${COLOR_LIGHT_GREEN_1}>${COLOR_LIGHT_GREEN_1}</a-tag>`
  }))
  .add('COLOR_LIGHT_GREEN_2', () => ({
    template: `<a-tag color=${COLOR_LIGHT_GREEN_2}>${COLOR_LIGHT_GREEN_2}</a-tag>`
  }))
  .add('COLOR_DARK_GREEN_1', () => ({
    template: `<a-tag color=${COLOR_DARK_GREEN_1}>${COLOR_DARK_GREEN_1}</a-tag>`
  }))
  .add('COLOR_DARK_GREEN_2', () => ({
    template: `<a-tag color=${COLOR_DARK_GREEN_2}>${COLOR_DARK_GREEN_2}</a-tag>`
  }))
  .add('COLOR_DARK_GREEN_3', () => ({
    template: `<a-tag color=${COLOR_DARK_GREEN_3}>${COLOR_DARK_GREEN_3}</a-tag>`
  }))
  // ---- RED ----
  .add('COLOR_RED', () => ({
    template: `<a-tag color=${COLOR_RED}>${COLOR_RED}</a-tag>`
  }))
  .add('COLOR_LIGHT_RED_1', () => ({
    template: `<a-tag color=${COLOR_LIGHT_RED_1}>${COLOR_LIGHT_RED_1}</a-tag>`
  }))
  .add('COLOR_LIGHT_RED_2', () => ({
    template: `<a-tag color=${COLOR_LIGHT_RED_2}>${COLOR_LIGHT_RED_2}</a-tag>`
  }))
  .add('COLOR_DARK_RED_1', () => ({
    template: `<a-tag color=${COLOR_DARK_RED_1}>${COLOR_DARK_RED_1}</a-tag>`
  }))
  .add('COLOR_DARK_RED_2', () => ({
    template: `<a-tag color=${COLOR_DARK_RED_2}>${COLOR_DARK_RED_2}</a-tag>`
  }))
  .add('COLOR_DARK_RED_3', () => ({
    template: `<a-tag color=${COLOR_DARK_RED_3}>${COLOR_DARK_RED_3}</a-tag>`
  }))
  // ---- TEAL ----
  .add('COLOR_TEAL', () => ({
    template: `<a-tag color=${COLOR_TEAL}>${COLOR_TEAL}</a-tag>`
  }))
  .add('COLOR_LIGHT_TEAL_1', () => ({
    template: `<a-tag color=${COLOR_LIGHT_TEAL_1}>${COLOR_LIGHT_TEAL_1}</a-tag>`
  }))
  .add('COLOR_LIGHT_TEAL_2', () => ({
    template: `<a-tag color=${COLOR_LIGHT_TEAL_2}>${COLOR_LIGHT_TEAL_2}</a-tag>`
  }))
  .add('COLOR_DARK_TEAL_1', () => ({
    template: `<a-tag color=${COLOR_DARK_TEAL_1}>${COLOR_DARK_TEAL_1}</a-tag>`
  }))
  .add('COLOR_DARK_TEAL_2', () => ({
    template: `<a-tag color=${COLOR_DARK_TEAL_2}>${COLOR_DARK_TEAL_2}</a-tag>`
  }))
  .add('COLOR_DARK_TEAL_3', () => ({
    template: `<a-tag color=${COLOR_DARK_TEAL_3}>${COLOR_DARK_TEAL_3}</a-tag>`
  }))
  // ---- PURPLE ----
  .add('COLOR_PURPLE', () => ({
    template: `<a-tag color=${COLOR_PURPLE}>${COLOR_PURPLE}</a-tag>`
  }))
  .add('COLOR_LIGHT_PURPLE_1', () => ({
    template: `<a-tag color=${COLOR_LIGHT_PURPLE_1}>${COLOR_LIGHT_PURPLE_1}</a-tag>`
  }))
  .add('COLOR_LIGHT_PURPLE_2', () => ({
    template: `<a-tag color=${COLOR_LIGHT_PURPLE_2}>${COLOR_LIGHT_PURPLE_2}</a-tag>`
  }))
  .add('COLOR_LIGHT_PURPLE_3', () => ({
    template: `<a-tag color=${COLOR_LIGHT_PURPLE_3}>${COLOR_LIGHT_PURPLE_3}</a-tag>`
  }))
  .add('COLOR_DARK_PURPLE_1', () => ({
    template: `<a-tag color=${COLOR_DARK_PURPLE_1}>${COLOR_DARK_PURPLE_1}</a-tag>`
  }))
  .add('COLOR_DARK_PURPLE_2', () => ({
    template: `<a-tag color=${COLOR_DARK_PURPLE_2}>${COLOR_DARK_PURPLE_2}</a-tag>`
  }))
  .add('COLOR_DARK_PURPLE_3', () => ({
    template: `<a-tag color=${COLOR_DARK_PURPLE_3}>${COLOR_DARK_PURPLE_3}</a-tag>`
  }))
  // ---- ORANGE ----
  .add('COLOR_ORANGE', () => ({
    template: `<a-tag color=${COLOR_ORANGE}>${COLOR_ORANGE}</a-tag>`
  }))
  .add('COLOR_LIGHT_ORANGE_1', () => ({
    template: `<a-tag color=${COLOR_LIGHT_ORANGE_1}>${COLOR_LIGHT_ORANGE_1}</a-tag>`
  }))
  .add('COLOR_LIGHT_ORANGE_2', () => ({
    template: `<a-tag color=${COLOR_LIGHT_ORANGE_2}>${COLOR_LIGHT_ORANGE_2}</a-tag>`
  }))
  .add('COLOR_DARK_ORANGE_1', () => ({
    template: `<a-tag color=${COLOR_DARK_ORANGE_1}>${COLOR_DARK_ORANGE_1}</a-tag>`
  }))
  .add('COLOR_DARK_ORANGE_2', () => ({
    template: `<a-tag color=${COLOR_DARK_ORANGE_2}>${COLOR_DARK_ORANGE_2}</a-tag>`
  }))
  .add('COLOR_DARK_ORANGE_3', () => ({
    template: `<a-tag color=${COLOR_DARK_ORANGE_3}>${COLOR_DARK_ORANGE_3}</a-tag>`
  }));
