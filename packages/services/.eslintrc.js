/** @type {import('eslint').Linter.Config} */
module.exports = {
  ...require('eslint-config/eslint-base'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
