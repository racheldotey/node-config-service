# Developer Notes:

## ESLint

We encourage incorporating <a target="_blank" rel="noopener" href="https://eslint.org/">eslint</a> into your development workflow to find and fix problems in your code as well as maintain consistent coding standards. The <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint">node eslint</a> package has been inclided in this project and can be run using the `yarn run dev:lint` and `yarn run dev:lint:watch` commands. Also see the <a target="_blank" rel="noopener" href="https://github.com/eslint/eslint">eslint github</a> repo for more documentation.

1. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-config-airbnb">eslint-config-airbnb</a> - https://github.com/airbnb/javascript
2. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-config-airbnb-base">eslint-config-airbnb-base</a> - https://github.com/airbnb/javascript
3. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-config-prettier">eslint-config-prettier</a> - Turns off all rules that are unnecessary or might conflict with [Prettier].
4. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/@babel/eslint-plugin">@babel/eslint-plugin</a>
5. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-deprecation">eslint-plugin-deprecation</a>
6. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-eslint-comments">eslint-plugin-eslint-comments</a>
7. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-filenames">eslint-plugin-filenames</a> - Eslint plugin to check filenames.
8. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-html">eslint-plugin-html</a> - A ESLint plugin to lint and fix inline scripts contained in HTML files.
9. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-import">eslint-plugin-import</a> - ESLint plugin with rules that help validate proper imports.
10. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-inclusive-language">eslint-plugin-inclusive-language</a> - An ESLint plugin to raise awareness for using inclusive language not only in your codebase, but in life.
11. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-jest-formatting">eslint-plugin-jest-formatting</a>
12. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-jsdoc">eslint-plugin-jsdoc</a>
13. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-jsonc">eslint-plugin-jsonc</a>
14. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-jsx-a11y">eslint-plugin-jsx-a11y</a>
15. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-lodash">eslint-plugin-lodash</a>
16. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-markdown">eslint-plugin-markdown</a>
17. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-n">eslint-plugin-n</a>
18. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-no-unsanitized">eslint-plugin-no-unsanitized</a>
19. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-package-json">eslint-plugin-package-json</a>
20. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-prefer-arrow">eslint-plugin-prefer-arrow</a>
21. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-prettier">eslint-plugin-prettier</a> - Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.
22. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-promise">eslint-plugin-promise</a>
23. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-react">eslint-plugin-react</a> - React-specific linting rules for ESLint
24. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-react-hooks">eslint-plugin-react-hooks</a> - This ESLint plugin enforces the <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-react-hooks">Rules of Hooks</a>.
25. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-react-redux">eslint-plugin-react-redux</a> - Enforcing best practices for `react-redux`.
26. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-regexp">eslint-plugin-regexp</a>
27. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-security">eslint-plugin-security</a>
28. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-sort-class-members">eslint-plugin-sort-class-members</a>
29. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-tsdoc">eslint-plugin-tsdoc</a>
30. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-unicorn">eslint-plugin-unicorn</a>
31. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-vuejs-accessibility">eslint-plugin-vuejs-accessibility</a>
32. <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-plugin-you-dont-need-lodash-underscore">eslint-plugin-you-dont-need-lodash-underscore</a>


## Webpack

<a target="_blank" rel="noopener" href="https://www.npmjs.com/package/eslint-webpack-plugin">eslint-webpack-plugin</a> This plugin uses eslint to find and fix problems in your JavaScript code

## JSDocs

## Inline comments

This was programmed using Visual Studio Code and the <a target="_blank" rel="noopener" href="https://marketplace.visualstudio.com/items?itemName=ExodiusStudios.comment-anchors">Comment Anchors</a> extension to add developer notes to the codebase.

The default settings come with anchors for the following tags:

ANCHOR - Used to indicate a section in your file
TODO - An item that is awaiting completion
FIXME - An item that requires a bugfix
STUB - Used for generated default snippets
NOTE - An important note for a specific code section
REVIEW - An item that requires additional review
SECTION - Used to define a region
LINK - Used to link to a file that can be opened within the editor