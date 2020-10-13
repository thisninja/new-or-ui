// const path = require('path');

// const rootPath = path.resolve(__dirname, '../src');

module.exports = ({ config }) => {
  // config.module.rules.push({
  //     test: /\.scss$/,
  //     use: [
  //         'vue-style-loader',
  //         'css-loader',
  //         {
  //             loader: 'sass-loader',
  //             options: {
  //                 data: '@import "@/src/styles/_index.scss";',
  //             },
  //         },
  //     ],
  // });

  config.module.rules.push({
    test: /\.vue$/,
    loader: 'storybook-addon-vue-info/loader',
    enforce: 'post'
  });

  // eslint-disable-next-line no-param-reassign

  return config;
};
