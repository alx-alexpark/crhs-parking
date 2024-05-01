export default [
  {
    extends: [
      'eslint:recommended',
      'next/core-web-vitals',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
    ],
    rules: {
      'no-unused-vars': 'warn',
      'no-constant-binary-expression': 'error',
      'react/no-unescaped-entities': 'warn',
      'react-hooks/exhaustive-deps': 'error',
    },
    globals: {
      React: 'readonly',
      JSX: 'readonly',
    },
  },
];
