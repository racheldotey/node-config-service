/**
 * @requires `eslint-plugin-lodash`
 * @desc ESLint rules for lodash.
 * @link https://github.com/wix/eslint-plugin-lodash
 *
 * @requires `eslint-plugin-you-dont-need-lodash-underscore`
 * @desc List of JavaScript methods which you can use natively + ESLint Plugin.
 * @link https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore
 */
module.exports = {
	extends: [
		"plugin:lodash/recommended",
		"plugin:you-dont-need-lodash-underscore/compatible"
	],
	plugins: [
		"lodash"
	],
	rules: {
		"lodash/prefer-constant": "off",
		"lodash/prefer-get": "off",
		"lodash/prefer-includes": "off",
		"lodash/prefer-is-nil": "off",
		"lodash/prefer-lodash-chain": "off",
		"lodash/prefer-lodash-method": "off",
		"lodash/prefer-lodash-typecheck": "off",
		"lodash/prefer-matches": "off",
		"lodash/prefer-noop": "off",
		"lodash/prefer-over-quantifier": "off",
		"lodash/prefer-some": "off",
		"lodash/prefer-startswith": "off",
		"lodash/prefer-times": "off"
	}
};