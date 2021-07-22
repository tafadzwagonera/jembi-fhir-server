module.exports = {
  extends: '@jembi/eslint-config-frontend',
  ignorePatterns: ['*.*'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
}