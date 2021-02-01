module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['prettier', 'eslint-config-prettier', 'airbnb'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'react/jsx-props-no-spreading': 'off',
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'dot-notation': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
};
