import Component from '@/components/ThreeStatesSwitch/main.vue';

test('renders correctly', () => {
  const { element } = shallowMount(Component, {
    propsData: { value: true }
  });
  expect(element).toMatchSnapshot();
});

test('checked=SWITCH_PARTIAL', () => {
  const { element } = shallowMount(Component, {
    propsData: { value: null }
  });
  expect(element.classList.contains('cl-three-states-switch')).toBe(true);
});
