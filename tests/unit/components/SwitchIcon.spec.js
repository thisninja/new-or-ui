import Component from '@/components/SwitchIcon/main.vue';

test('renders correctly', () => {
    const { element } = shallowMount(Component);
    expect(element).toMatchSnapshot();
});
