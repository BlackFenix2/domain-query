const path = require('path');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:storybook/recommended',
    path.resolve(__dirname, './eslint-base.js'),
  ],
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

    // use arrow functions
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

    // not using propTypes because typescript is used
    'react/require-default-props': 'off',

    // prevent multiple componets in one file
    'react/no-multi-comp': 'error',

    // self close tags without children
    'react/self-closing-comp': 'warn',
  },
  overrides: [
    // add linting rules for stories
    {
      files: ['*.stories.*'],
      rules: {
        // stories export multiple components in CSF
        'react/no-multi-comp': 'off',

        // lowercase *.stories.tsx files are part of the framework
        'unicorn/filename-case': 'off',

        // allow prop spreading in stories
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};
