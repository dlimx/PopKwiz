module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended', 'prettier', 'prettier/react'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'react/jsx-props-no-spreading': 'off',
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'dot-notation': 'off',
    'react/forbid-prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'arrow-body-style': 'off',
    'react/require-default-props': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
};
