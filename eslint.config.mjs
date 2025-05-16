// @ts-check

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import { fixupConfigRules } from '@eslint/compat'
import tsParser from '@typescript-eslint/parser'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier'
import eslint from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all
})

export default defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser
      },

      parser: tsParser
    },

    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier'
      )
    ),

    plugins: {
      'react-refresh': reactRefresh,
      prettier
    },

    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true
        }
      ],

      'prettier/prettier': 'error'
    }
  },
  globalIgnores([
    '**/build/',
    '**/dist/',
    '**/node_modules/',
    '**/.snapshots/',
    '**/.eslintrc.mjs',
    '**/*.min.js'
  ])
])
