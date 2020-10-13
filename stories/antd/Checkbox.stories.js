/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

storiesOf('AntD|Checkbox', module)
  .addDecorator(() => ({
    template: '<div style="margin: 1em;"><story/></div>'
  }))
  .add('default', () => ({
    template: '<a-checkbox>Checkbox</a-checkbox>'
  }))
  .add('disabled', () => ({
    template: '<a-checkbox disabled/>'
  }))
  .add('defaultChecked', () => ({
    template: '<a-checkbox default-checked/>'
  }))
  .add('checked', () => ({
    template: '<a-checkbox checked/>'
  }))
  .add('autoFocus', () => ({
    template: '<a-checkbox auto-focus/>'
  }));
