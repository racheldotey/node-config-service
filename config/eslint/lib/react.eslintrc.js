/**
 * @requires `eslint-plugin-react`
 * @desc React-specific linting rules for ESLint.
 * @link https://github.com/jsx-eslint/eslint-plugin-react
 *
 * @requires `eslint-plugin-react-hooks`
 * @desc Rules for valid and readable package.json files.
 * @link https://reactjs.org/docs/hooks-rules.html
 * @link https://www.npmjs.com/package/eslint-plugin-react-hooks
 *
 * @requires `eslint-plugin-react-redux`
 * @desc Enforcing best practices for react-redux.
 * @link https://github.com/DianaSuvorova/eslint-plugin-react-redux
 *
 * @requires `eslint-plugin-jsx-a11y`
 * @desc Static AST checker for a11y rules on JSX elements.
 * @link https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
 */
module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"worker": true
	},
	"parserOptions": {
		"sourceType": "module",
		"ecmaVersion": "latest",
		"ecmaFeatures": {
			"jsx": true
		},
		"settings": {
			"react": {
				"version": "detect"
			}
		}
	},
	"extends": [
		"plugin:jsx-a11y/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:react-redux/recommended"
	],
	"plugins": [
		"jsx-a11y", // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
		"react", // https://github.com/jsx-eslint/eslint-plugin-react
		"react-hooks", // https://www.npmjs.com/package/eslint-plugin-react-hooks
		"react-redux" // https://github.com/DianaSuvorova/eslint-plugin-react-redux
	],
	"rules": {
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error"
	}
}
