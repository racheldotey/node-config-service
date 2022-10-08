/**
 * @requires `@typescript-eslint/eslint-plugin`
 * @desc An ESLint plugin which provides lint rules for TypeScript codebases.
 * @link https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin
 *
 * @requires `@typescript-eslint/parser`
 * @desc An ESLint parser which leverages TypeScript ESTree to allow for ESLint to lint TypeScript source code.
 * @link https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser
 *
 * @requires `eslint-config-standard-with-typescript`
 * @desc An extension of eslint-config-standard, made for TypeScript.
 * @link https://github.com/standard/eslint-config-standard-with-typescript
 *
 * @requires `eslint-plugin-deprecation`
 * @desc ESLint rule that reports usage of deprecated code.
 * @link https://github.com/gund/eslint-plugin-deprecation
 */
module.exports = {
	overrides: [
		{
			// Enable typescript processor for all .ts files
			// https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser
			files: ['*.{ts,tsx}'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: './tsconfig.json',
				sourceType: 'module',
			},
			extends: ['plugin:@typescript-eslint/recommended'],
			plugins: [
				'@typescript-eslint/eslint-plugin', // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin
				'@typescript-eslint', // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser
				'deprecation', // https://github.com/gund/eslint-plugin-deprecation
			],
			rules: {
				'deprecation/deprecation': 'warn',
				'@typescript-eslint/switch-exhaustiveness-check': 'error',
			},
		},
	],
};
