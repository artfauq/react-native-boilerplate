/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['import', 'prettier', 'promise', 'unused-imports'],
  extends: [
    '@react-native',
    'airbnb-base',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Standard rules
    'class-methods-use-this': 'off',
    'consistent-return': 'error',
    'curly': ['error', 'multi-line'],
    'default-case': 'error',
    'global-require': 'warn',
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    'max-classes-per-file': 'off',
    'no-console': 'off',
    'no-extra-semi': 'off',
    'no-param-reassign': 'off',
    'no-promise-executor-return': 'off',
    'no-underscore-dangle': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'any', prev: '*', next: 'import' },
      { blankLine: 'any', prev: 'case', next: ['case', 'default'] },
      { blankLine: 'any', prev: 'if', next: 'if' },
      { blankLine: 'any', prev: 'export', next: 'export' },
      { blankLine: 'any', prev: 'expression', next: 'expression' },
      { blankLine: 'always', prev: ['const', 'let'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
    ],
    'prefer-regex-literals': 'off',
    'semi': ['error', 'never'],

    // eslint-plugin-import rules
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
      },
    ],
    'import/no-cycle': 'warn',
    'import/order': [
      'error',
      {
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        'pathGroups': [
          {
            pattern: '{next,next/*,react,react/*}',
            group: 'builtin',
            position: 'after',
          },
        ],
        'warnOnUnassignedImports': false,
        'pathGroupsExcludedImportTypes': ['builtin'],
      },
    ],
    'import/prefer-default-export': 'off',

    // eslint-plugin-unused-imports rules
    'unused-imports/no-unused-imports': 'error',
  },
  // overrides: [
  //   {
  //     files: ["*.ts", "*.tsx"],
  //     plugins: ["@typescript-eslint"],
  //     extends: [
  //       "airbnb-typescript/base",
  //       "plugin:@typescript-eslint/recommended",
  //       "plugin:@typescript-eslint/recommended-requiring-type-checking",
  //       "plugin:import/typescript",
  //     ],
  //     rules: {
  //       "@typescript-eslint/ban-ts-comment": "warn",
  //       "@typescript-eslint/ban-types": "warn",
  //       "@typescript-eslint/naming-convention": [
  //         "error",
  //         {
  //           selector: "variable",
  //           format: ["camelCase", "PascalCase", "UPPER_CASE"],
  //           leadingUnderscore: "allow",
  //         },
  //         {
  //           selector: "function",
  //           format: ["camelCase", "PascalCase"],
  //         },
  //         {
  //           selector: "typeLike",
  //           format: ["PascalCase"],
  //         },
  //       ],
  //       "@typescript-eslint/no-empty-interface": "warn",
  //       "@typescript-eslint/no-explicit-any": "warn",
  //       "@typescript-eslint/no-misused-promises": "warn",
  //       "@typescript-eslint/no-unsafe-argument": "warn",
  //       "@typescript-eslint/no-unused-vars": "warn",
  //       "@typescript-eslint/no-use-before-define": "off",
  //       "@typescript-eslint/no-var-requires": "warn",
  //     },
  //   },
  //   {
  //     files: [".jsx", ".tsx"],
  //     extends: [
  //       "airbnb",
  //       "airbnb/hooks",
  //       "airbnb-typescript",
  //       "plugin:react/recommended",
  //       "plugin:react-hooks/recommended",
  //     ],
  //     rules: {
  //       "react/jsx-props-no-spreading": "off",
  //       "react/no-array-index-key": "warn",
  //       "react/require-default-props": "off",
  //       "react/style-prop-object": "off",
  //     },
  //   },
  // ],
}
