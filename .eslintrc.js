module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2019,
  },
  rules: {
    camelcase: 'error',
    'no-param-reassign': 'warn',
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    'max-nested-callbacks': ['error', { max: 4 }],
    'no-console': 'off',
    'no-empty-function': 'error',
    'no-floating-decimal': 'error',
    'no-lonely-if': 'error',
    'no-multi-spaces': 'error',
    'no-shadow': ['error', { allow: ['err', 'resolve', 'reject'] }],
    'no-trailing-spaces': ['error'],
    'no-var': 'error',
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': 'error',
  },
};
