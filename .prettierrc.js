export default {
  arrowParens: 'always',
  bracketSpacing: true,
  bracketSameLine: false,
  jsxSingleQuote: true,
  printWidth: 120,
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  svelteSortOrder: 'options-scripts-styles-markup',
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
        organizeImportsSkipDestructiveCodeActions: true,
      },
    },
  ],
}
