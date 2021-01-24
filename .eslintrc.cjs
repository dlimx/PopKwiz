module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['prettier', 'eslint-config-prettier', 'airbnb'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
};
