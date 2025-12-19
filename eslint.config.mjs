// @ts-check

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import * as tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
});

export default defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },

    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
      ),
    ),

    plugins: {
      'react-refresh': reactRefresh,
      prettier,
    },

    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],

      'prettier/prettier': 'error',
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreComments: true,
          ignoreTrailingComments: true,
        },
      ],
      'newline-before-return': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
      'import/extensions': [
        'error',
        'never',
        {
          json: 'always',
        },
      ],
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/consistent-type-specifier-style.md
      // https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how/
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md
      'import/newline-after-import': ['error'],
      'import/no-unresolved': [2, { commonjs: true }],
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      },
    },
  },
  globalIgnores(['**/build/', '**/dist/', '**/node_modules/', '**/.snapshots/', '**/.eslintrc.mjs', '**/*.min.js']),
]);
