module.exports = {
  extends: ['../../.eslintrc.js'],
  rules: {
    camelcase: 'off',
    'import/no-extraneous-dependencies': ['error', { packageDir: [__dirname] }],
    '@typescript-eslint/ban-ts-comment': 'warn',
  },
};
