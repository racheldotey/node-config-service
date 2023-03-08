/**
 * Prettier Config
 * @see https://prettier.io/docs/en/configuration.html
 * @see https://prettier.io/docs/en/options.html
 */
module.exports = {
    // Include parentheses around a sole arrow function parameter.
    arrowParens: 'avoid',
    // Put > of opening tags on the last line instead of on a new line.
    bracketSameLine: true,
    // Print spaces between brackets.
    bracketSpacing: true,
    // Which end of line characters to apply.
    endOfLine: 'auto',
    // How to handle whitespaces in HTML.
    htmlWhitespaceSensitivity: 'css',
    // Use single quotes in JSX.
    jsxSingleQuote: false,
    // Specify the line length that the printer will wrap on.
    printWidth: 100,
    // When to wrap text in Markdown files
    proseWrap: 'preserve',
    // Change when properties in objects are quoted.
    quoteProps: 'as-needed',
    // Print semicolons.
    semi: true,
    // Enforce single attribute per line in HTML, Vue and JSX.
    singleAttributePerLine: false,
    // Use single quotes instead of double quotes.
    singleQuote: true,
    // Number of spaces per indentation level.
    tabWidth: 4,
    // Print trailing commas wherever possible when multi-line.
    trailingComma: 'es5',
    // Indent with tabs instead of spaces.
    useTabs: false,
};
