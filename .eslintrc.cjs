module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['prettier', 'eslint-config-prettier', 'airbnb'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'max-len': 'off',
  },
  env: {
    browser: true,
    node: true,
  }
};
