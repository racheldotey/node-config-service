/**
 * @requires `@html-eslint/eslint-plugin`
 * @requires `@html-eslint/parser`
 * @desc ESLint plugin for linting HTML.
 * @link https://github.com/yeonjuan/html-eslint
 * @link https://yeonjuan.github.io/html-eslint/docs/all-rules
 *
 * @requires `eslint-plugin-html`
 * @desc An ESLint plugin to extract and lint scripts from HTML files.
 * @link https://github.com/BenoitZugmeyer/eslint-plugin-html
 *
 * @requires `eslint-plugin-no-unsanitized`
 * @desc Custom ESLint rule to disallows unsafe innerHTML, outerHTML, insertAdjacentHTML and alike.
 * @link https://github.com/mozilla/eslint-plugin-no-unsanitized
 */
module.exports = {
	overrides: [
		{
			files: ['*.html'],
			parser: '@html-eslint/parser',
			parserOptions: {
				sourceType: 'module',
			},
			plugins: ['@html-eslint', 'html', 'no-unsanitized'],
			extends: ['plugin:@html-eslint/recommended', 'plugin:no-unsanitized/DOM'],
			rules: {
				'no-unsanitized/method': 'error',
				'no-unsanitized/property': 'error',
			},
		},
	],
};
