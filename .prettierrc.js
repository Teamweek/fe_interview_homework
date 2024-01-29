export default {
	singleQuote: true,
	trailingComma: 'es5',
	printWidth: 80,
	arrowParens: 'always',
	semi: true,
	useTabs: true,
	svelteSortOrder: 'options-scripts-styles-markup',
	bracketSameLine: true,
	plugins: [
		'prettier-plugin-svelte',
		'prettier-plugin-organize-imports',
		'prettier-plugin-tailwindcss',
	],
	overrides: [
		{
			files: ['*.scss', '*.css'],
			options: {
				singleQuote: false,
			},
		},
		{
			files: '*.svelte',
			options: {
				parser: 'svelte',
				organizeImportsSkipDestructiveCodeActions: true,
			},
		},
	],
};
