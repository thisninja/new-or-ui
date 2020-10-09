import Component from '@/components/PasswordStrengthMeter/main.vue';

test('renders correctly on weak passwords', () => {
  const { element } = shallowMount(Component, {
    propsData: {
      minEntropy: 80,
      value: 'password'
    }
  });
  expect(element).toMatchSnapshot();
});

test('renders correctly on strong passwords', () => {
  const { element } = shallowMount(Component, {
    propsData: {
      minEntropy: 80,
      value: 'XKCD.com/792/'
    }
  });
  expect(element).toMatchSnapshot();
});

test('renders correctly on password matcher', () => {
  const { element } = shallowMount(Component, {
    propsData: {
      match: 'password',
      passwordMatch: true,
      value: 'password'
    }
  });
  expect(element).toMatchSnapshot();
});
