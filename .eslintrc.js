module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    commonjs: true,
  },
  globals: {
    _: true,
    window: true,
    self: true,
    __DEV__: true,
  },
  extends: [
    // https://www.npmjs.com/package/eslint-plugin-vue
    // https://www.npmjs.com/package/eslint-config-standard
    "plugin:vue/recommended",
    "standard",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
  },
  plugins: ["standard", "vue"],
  rules: {
    // js
    semi: [2, "always"],
    indent: ["error", 2],
    "no-console": 0,
    "prefer-const": ["error", { destructuring: "all" }],
    "no-return-await": 0,
    "no-unused-expressions": 0,
    "no-trailing-spaces": 0,
    "no-multiple-empty-lines": ["error", { max: 2 }],
    "no-new": 0,
    "no-prototype-builtins": 0,
    "handle-callback-err": 0,
    "valid-typeof": 0,
    "dot-notation": 0,
    "no-mixed-operators": "off",
    "quote-props": ["error", "consistent"],

    // vue
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always",
      },
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    "vue/attribute-hyphenation": 0,
    "vue/require-prop-types": 0,
    "vue/require-default-prop": 0,
    "vue/no-v-html": 0,
  },
};
