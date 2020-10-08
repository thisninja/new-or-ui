import Component from '@/components/Avatar/main.vue';

test('renders correctly', () => {
    const { element } = shallowMount(Component);
    expect(element).toMatchSnapshot();
});
