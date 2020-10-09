import Component from '@/components/IconButton/main.vue';

test('renders correctly', () => {
  const { element } = shallowMount(Component);
  expect(element).toMatchSnapshot();
});
