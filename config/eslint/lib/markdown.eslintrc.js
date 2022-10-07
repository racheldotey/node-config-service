/**
 * @requires `eslint-plugin-markdown`
 * @desc Enable Markdown processor for all .md files.
 * @link https://github.com/eslint/eslint-plugin-markdown#advanced-configuration
 */
module.exports = {
	overrides: [
		{
			files: ['**/*.md'],
			processor: 'markdown/markdown',
		},
	],
	extends: ['plugin:markdown/recommended'],
	plugins: ['markdown'],
};
