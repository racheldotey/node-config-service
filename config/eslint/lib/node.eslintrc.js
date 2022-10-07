/**
 * @requires `eslint-plugin-n`
 * @desc Additional ESLint's rules for Node.js.
 * @link https://github.com/eslint-community/eslint-plugin-n
 *
 * @requires `eslint-plugin-package-json`
 * @desc Rules for valid and readable package.json files.
 * @link https://github.com/zetlen/eslint-plugin-package-json
 */
module.exports = {
	env: {
		'node': true,
		'shared-node-browser': true,
		'serviceworker': true,
	},
	plugins: ['n', 'package-json'],
	extends: ['plugin:n/recommended', 'plugin:package-json/recommended'],
	rules: {
		'n/exports-style': ['error', 'module.exports'],
		'n/file-extension-in-import': ['error', 'always'],
		'n/no-missing-require': [
			'error',
			{
				allowModules: ['node-config-service'],
			},
		],
		'n/prefer-global/buffer': ['error', 'always'],
		'n/prefer-global/console': ['error', 'always'],
		'n/prefer-global/process': ['error', 'always'],
		'n/prefer-global/url-search-params': ['error', 'always'],
		'n/prefer-global/url': ['error', 'always'],
		'n/prefer-promises/dns': 'error',
		'n/prefer-promises/fs': 'error',

		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
	},
};
