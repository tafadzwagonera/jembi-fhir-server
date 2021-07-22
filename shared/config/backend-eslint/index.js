module.exports = {
  extends: ['plugin:adonis/typescriptApp', '../../../.eslintrc'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
    'import/extensions': ['.ts', '.tsx'],
  },
  rules: {
    'space-before-function-paren': 'off',
    'no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'import/no-cycle': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true, bundledDependencies: true }],
    'no-param-reassign': ['error', { props: false }],
    'import/extensions': ['error', { ts: 'never' }],
    '@typescript-eslint/space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
    '@typescript-eslint/no-unused-vars': 'error',
  },
}
