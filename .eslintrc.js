module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    shallowMount: true,
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  rules: {
    indent: ["error", 4],
    "vue/html-indent": ["error", 4],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "max-len": "off"
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
