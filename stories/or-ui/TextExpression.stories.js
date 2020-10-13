/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import TextExpression from '@/components/TextExpression/main.vue';

storiesOf('OneReach UI|TextExpression', module)
  .addDecorator(() => ({
    template: '<div style="margin: 1em;"><story/></div>'
  }))
  .add(
    'default',
    () => ({
      components: { TextExpression },
      data () {
        return {
          textExpession: '``'
        };
      },
      template: '<text-expression v-model="textExpession" />'
    }),
    {
      info: {}
    }
  );
