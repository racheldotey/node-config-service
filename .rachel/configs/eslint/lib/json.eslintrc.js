/**
 * @requires `eslint-plugin-jsonc`
 * @desc Enable JSON processor for all .json, .json5, and .jsonc files.
 * @link https://github.com/ota-meshi/eslint-plugin-jsonc#parser-configuration
 */
module.exports = {
	overrides: [
		{
			files: ['*.json', '*.json5', '*.jsonc'],
			parser: 'jsonc-eslint-parser',
			plugins: ['jsonc'],
			extends: [
				'plugin:jsonc/base',
				'plugin:jsonc/recommended-with-json',
				'plugin:jsonc/recommended-with-jsonc',
				'plugin:jsonc/recommended-with-json5',
				'plugin:jsonc/prettier',
			],
		},
	],
};
