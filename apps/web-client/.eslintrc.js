module.exports = {
  ...require('eslint-config/eslint-next'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['next-env.d.ts', 'next.config.mjs', 'cypress'],
};
