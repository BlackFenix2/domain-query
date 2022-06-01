const path = require('path');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['next/core-web-vitals', path.resolve(__dirname, './eslint-base.js')],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    // not using propTypes because typescript is used
    'react/no-unused-prop-types': 'warn',

    // use arrow function syntax over function(){}
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

    // prevent multiple componets in one file
    'react/no-multi-comp': 'error',

    // useEffect deps cause infinite API calls on route.isReady when reading querystring parameters from URL
    'react-hooks/exhaustive-deps': 'off',

    // self close tags without children
    'react/self-closing-comp': 'warn',
  },
};
