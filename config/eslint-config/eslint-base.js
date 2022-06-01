/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ['unicorn', 'import'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:unicorn/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        //project: ['tsconfig.json', 'package/tsconfig.json'],
      },
      typescript: {
        alwaysTryTypes: true,
        // project: ['tsconfig.json', 'package/tsconfig.json'],
      },
    },
  },
  rules: {
    // forces padding between functions (including es6 arrow functions)
    // disable base rule, utilize typescript parser variant
    'padding-line-between-statements': 'off',
    '@typescript-eslint/padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'function' },
      // enforces spacing between block scopes
      { blankLine: 'always', prev: '*', next: ['block-like', 'interface', 'type'] },
      { blankLine: 'always', prev: ['block-like', 'interface', 'type'], next: '*' },
    ],

    // disallow console.log, encourage console.warn, console.info and console.error
    'no-console': ['error', { allow: ['warn', 'info', 'error'] }],

    //force unix line endings
    'linebreak-style': ['error'],

    // remove brackets on arrow functions
    'arrow-body-style': ['warn', 'as-needed'],

    // enforce import order
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        // organize workspace paths as internal
        pathGroups: [
          {
            pattern: 'src/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'services/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'ui/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['type'],
        alphabetize: {
          order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
        },
        'newlines-between': 'always',
      },
    ],

    // force types to be imported with the 'import type' syntax
    '@typescript-eslint/consistent-type-imports': 'warn',

    // Use type for object definitions
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    // prevent abbreviations, enforce human readable names
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          props: true,
          Props: true,
        },
      },
    ],
  },
  overrides: [
    // enforce PascalCase in .tsx files
    {
      files: ['*.tsx'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              pascalCase: true,
            },
            // ignore target .tsx files beginning with '_'

            ignore: [/^_.*\.tsx$/i],
          },
        ],
      },
    },
    {
      files: ['*.ts'],
      rules: {
        // enforce camelCase in .ts files
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              camelCase: true,
            },
            // ignore target .ts files beginning with '_'
            ignore: [/^_.*\.ts$/i],
          },
        ],
      },
    },
    {
      // 3) Now we enable eslint-plugin-testing-library rules or preset only for matching files!
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      env: {
        jest: true,
      },
      extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
    },
  ],
  ignorePatterns: ['**/*.js', '**/*.cjs', '**/*.json', 'node_modules', '.turbo', '.next', 'public'],
};
