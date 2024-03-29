module.exports = {
  extends: '@jembi/eslint-config-backend',
  ignorePatterns: ['.eslintrc.js', 'prettier.*', '.*'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
}