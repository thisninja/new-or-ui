/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import TextExpression from '@/components/TextExpression/main.vue';

storiesOf('Content Builder (Slack)|TextExpression', module)
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
      template: '<text-expression class="or-text-expression--slack" placeholder="Type something..." v-model="textExpession" />'
    }),
    {
      info: {}
    }
  );
