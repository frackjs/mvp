module.exports = {
  root: true,
  env: {
    commonjs: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 6,
  },
  rules: {
    'no-console': 0,
    'quotes': 0,
    'semi': [2, 'never'],
    'quote-props': 0,
  },
};
