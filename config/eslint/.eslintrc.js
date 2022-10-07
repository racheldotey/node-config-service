/**
 * @requires `eslint`
 * @desc ESLint statically analyzes your code to quickly find problems. It is built into most
 * text editors and you can run ESLint as part of your continuous integration pipeline.
 * @link https://eslint.org/
 * @link https://github.com/eslint/eslint
 *
 * @requires `eslint-plugin-import`
 * @desc ESLint plugin with rules that help validate proper imports.
 * @link https://github.com/import-js/eslint-plugin-import
 *
 * @requires `eslint-plugin-inclusive-language`
 * @desc An ESLint plugin to raise awareness for using inclusive language.
 * @link https://github.com/muenzpraeger/eslint-plugin-inclusive-language
 *
 * @requires `eslint-plugin-promise`
 * @desc Enforce best practices for JavaScript promises
 * @link https://github.com/eslint-community/eslint-plugin-promise
 *
 * @requires `eslint-plugin-regexp`
 * @desc ESLint plugin for finding regex mistakes and style guide violations.
 * @link https://ota-meshi.github.io/eslint-plugin-regexp/
 * @link https://github.com/ota-meshi/eslint-plugin-regexp
 *
 * @requires `eslint-plugin-security`
 * @desc ESLint rules for Node Security.
 * @link https://github.com/nodesecurity/eslint-plugin-security
 *
 * @requires `eslint-plugin-sort-class-members`
 * @desc An ESLint rule for enforcing consistent ES6 class member order
 * @link https://github.com/bryanrsmith/eslint-plugin-sort-class-members
 *
 * @requires `eslint-plugin-prefer-arrow`
 * @desc ESLint plugin to prefer arrow functions
 * @link https://github.com/TristonJ/eslint-plugin-prefer-arrow
 */
module.exports = {
	env: {
		es2022: true,
	},
	extends: [
		// Base
		'eslint:recommended',
		'airbnb',
		// "plugin:unicorn/recommended",	// Verbose - https://github.com/sindresorhus/eslint-plugin-unicorn
		// Plugins
		'plugin:import/recommended',
		'plugin:promise/recommended',
		'plugin:regexp/recommended',
		'plugin:security/recommended',
		// Scoped
		'./lib/html.eslintrc.js',
		'./lib/jest.eslintrc.js',
		'./lib/json.eslintrc.js',
		'./lib/lodash.eslintrc.js',
		'./lib/markdown.eslintrc.js',
		'./lib/node.eslintrc.js',
		'./lib/react.eslintrc.js',
		'./lib/typescript.eslintrc.js',
		// Last on purpose
		"./lib/prettier.eslintrc.js"
	],
	plugins: [
		'import',
		'inclusive-language',
		'prefer-arrow',
		'promise',
		'regexp',
		'security',
		'sort-class-members',

		'@babel', // https://github.com/babel/babel/tree/main/eslint/babel-eslint-plugin
	],
	rules: {
		'inclusive-language/use-inclusive-words': 2,

		'prefer-arrow/prefer-arrow-functions': [
			1,
			{
				disallowPrototype: true,
				singleReturnOnly: false,
				classPropertiesAllowed: false,
			},
		],

		'sort-class-members/sort-class-members': [
			2,
			{
				order: [
					'[static-properties]',
					'[static-methods]',
					'[properties]',
					'[conventional-private-properties]',
					'constructor',
					'[methods]',
					'[conventional-private-methods]',
				],
				accessorPairPositioning: 'getThenSet',
			},
		],
	},
};
