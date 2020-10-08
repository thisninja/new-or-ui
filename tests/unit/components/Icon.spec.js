import Component from '@/components/Icon/main.vue';

test('renders correctly', () => {
    const { element } = shallowMount(Component);
    expect(element).toMatchSnapshot();
});
