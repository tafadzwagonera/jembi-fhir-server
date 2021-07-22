module.exports = {
  extends: '@jembi/eslint-config-backend',
  ignorePatterns: ["/*.*"],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
}