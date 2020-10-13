// .storybook/preview.js

// export const decorators = [
//   () => ({ template: '<div style="margin: 3em;"><story /></div>' }),
// ];

import { addDecorator } from "@storybook/vue";

addDecorator(() => ({
  template: '<div style="margin-left: 3em;"><story/></div>',
}));