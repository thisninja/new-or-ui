import Component from '@/components/Popover/main.vue';

test('renders correctly', () => {
  const { element } = shallowMount(Component);
  expect(element).toMatchSnapshot();
});
