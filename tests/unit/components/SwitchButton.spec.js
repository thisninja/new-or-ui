import Component from '@/components/SwitchButton/main.vue';

test('renders correctly', () => {
  const { element } = shallowMount(Component);
  expect(element).toMatchSnapshot();
});
