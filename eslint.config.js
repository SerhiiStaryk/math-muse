import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      "react/prop-types": "off",
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "no-console": "warn",
      "no-undef": "error",
      "no-extra-semi": "error",
      "max-len": ["error", { "code": 120 }],
      "object-curly-spacing": [2, "always"],
      "arrow-parens": ["error", "as-needed"],
      "jsx-quotes": ["error", "prefer-single"],
      "operator-linebreak": ["error", "after", { "overrides": { "?": "ignore", ":": "ignore" } }],
    },
  },
])
