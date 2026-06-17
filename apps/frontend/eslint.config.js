import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importX from 'eslint-plugin-import-x';
import { defineConfig, globalIgnores } from 'eslint/config';
import boundaries from 'eslint-plugin-boundaries';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'import-x': importX,
      boundaries: boundaries,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.strict,
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      eqeqeq: ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],
      'no-var': 'error',
      'prefer-const': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      'react/jsx-no-bind': 'warn',
      'react/no-array-index-key': 'error',
      'react/jsx-boolean-value': 'error',
      'react/self-closing-comp': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import-x/no-duplicates': 'error',
      'import-x/no-cycle': 'error',
      'import-x/exports-last': 'warn',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: ['app'],
              allow: ['pages', 'widgets', 'features', 'entities', 'shared'],
            },
            {
              from: ['pages'],
              allow: ['widgets', 'features', 'entities', 'shared'],
            },
            {
              from: ['widgets'],
              allow: ['features', 'entities', 'shared'],
            },
            {
              from: ['features'],
              allow: ['entities', 'shared'],
            },
            {
              from: ['entities'],
              allow: ['shared'],
            },
            {
              from: ['shared'],
              allow: ['shared'],
            },
          ],
        },
      ],
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json'],
        },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'app/*' },
        { type: 'pages', pattern: 'pages/*' },
        { type: 'widgets', pattern: 'widgets/*' },
        { type: 'features', pattern: 'features/*' },
        { type: 'entities', pattern: 'entities/*' },
        { type: 'shared', pattern: 'shared/*' },
      ],
    },
  },
]);
