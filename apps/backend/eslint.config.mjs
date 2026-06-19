// @ts-check
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importX from 'eslint-plugin-import-x';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['dist', 'eslint.config.mjs'],
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  importX.flatConfigs.recommended,
  prettier,
  {
    files: ['**/*.{ts,js}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import-x': importX,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser: tseslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['prisma.config.ts', 'test/app.e2e-spec.ts'],
        },
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
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'class', format: ['PascalCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
      ],
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
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import-x/no-duplicates': 'error',
      'import-x/no-cycle': 'error',
      'import-x/exports-last': 'warn',
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    files: ['src/**/*.spec.ts', 'test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
);
