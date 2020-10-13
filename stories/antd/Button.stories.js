/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

storiesOf('AntD|Button', module)
  .addDecorator(() => ({
    template: '<div style="margin: 1em;"><story/></div>'
  }))
  .add('default', () => ({
    template: '<a-button>text</a-button>'
  }))
  .add('primary', () => ({
    template:
      '<a-button type="primary">text</a-button>'
  }))
  .add('dashed', () => ({
    template:
      '<a-button type="dashed">text</a-button>'
  }))
  .add('danger', () => ({
    template:
      '<a-button type="danger">text</a-button>'
  }))
  .add('link', () => ({
    template:
      '<a-button type="link">text</a-button>'
  }));
