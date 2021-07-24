module.exports = {
  extends: '@jembi/eslint-config-frontend',
  ignorePatterns: ['.eslintrc.js', 'prettier.*', '.*'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
}