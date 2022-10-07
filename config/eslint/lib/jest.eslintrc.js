/**
 * @requires `eslint-plugin-jest`
 * @desc ESLint plugin for Jest.
 * @link https://github.com/jest-community/eslint-plugin-jest
 *
 * @requires `eslint-plugin-jest-formatting`
 * @desc ESLint rules for formatting test suites written for jest.
 * @link https://github.com/dangreenisrael/eslint-plugin-jest-formatting
 */
module.exports = {
	overrides: [
		{
			files: ['test/**'],
			plugins: ['jest', 'jest-formatting'],
			extends: ['plugin:jest/recommended', 'plugin:jest-formatting/recommended'],
			rules: {},
		},
	],
};
