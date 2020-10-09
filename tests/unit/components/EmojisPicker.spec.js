import Component from '@/components/EmojisPicker/main.vue';

test('renders correctly', () => {
  const { element } = shallowMount(Component);
  expect(element).toMatchSnapshot();
});
