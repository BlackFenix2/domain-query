/** @type {import('eslint').Linter.Config} */
module.exports = {
  ...require('eslint-config/eslint-ui'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
