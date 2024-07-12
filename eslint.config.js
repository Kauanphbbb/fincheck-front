import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      quotes: ['error', 'single'],
      semi: [1, 'always'],
      'react/react-in-jsx-scope': 0,
      'react/display-name': 0
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
