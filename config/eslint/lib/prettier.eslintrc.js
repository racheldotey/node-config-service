/**
 * @requires `prettier`
 * @desc ESLint rules for formatting test suites written for jest.
 * @link https://prettier.io/docs/en/
 * @link https://github.com/npetruzzelli/prettier-config-standard
 *
 * @requires `prettier-eslint`
 * @desc Formats your JavaScript using prettier followed by eslint --fix
 * @link https://github.com/prettier/prettier-eslint
 *
 * @requires `eslint-config-prettier`
 * @desc Turns off all rules that are unnecessary or might conflict with Prettier.
 * @link https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
 * @link https://github.com/prettier/eslint-config-prettier
 *
 */
module.exports = {
	extends: ['prettier', 'plugin:prettier/recommended'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 1,
		'arrow-body-style': 'off', // NOTE https://github.com/prettier/eslint-plugin-prettier#arrow-body-style-and-prefer-arrow-callback-issue
		'prefer-arrow-callback': 'off', // NOTE https://github.com/prettier/eslint-plugin-prettier#arrow-body-style-and-prefer-arrow-callback-issue
	},
};
