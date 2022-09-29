<h1 align="center">node-config-service</h1>
<div align="center">

**Simple config config management for `node` apps.**

[![GitHub last commit](https://img.shields.io/github/last-commit/racheldotey/node-config-service?style=flat-square)](https://github.com/racheldotey/node-config-service/commits/main) [![GitHub all releases](https://img.shields.io/github/downloads/racheldotey/node-config-service/total?style=flat-square)](https://github.com/racheldotey/node-config-service/releases) [![GitHub issues](https://img.shields.io/github/issues/racheldotey/node-config-service?style=flat-square)](https://github.com/racheldotey/node-config-service/issues) [![GitHub watchers](https://img.shields.io/github/watchers/racheldotey/node-config-service?style=flat-square)](https://github.com/racheldotey/node-config-service/watchers/) [![GitHub forks](https://img.shields.io/github/forks/racheldotey/node-config-service?style=flat-square)](https://github.com/racheldotey/node-config-service/fork)

</div>

<details>
<summary>Table of Contents</summary>

- [About](#about)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Example Env Variables](#example-env-variables)
- [Issues](#issues)
- [Development](#development)
    - [Dev requirements](#dev-requirements)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)

</details>

## About

![Keywords](https://img.shields.io/github/package-json/keywords/racheldotey/node-config-service?style=for-the-badge)

`ConfigService` is a `node` module used to manage a set of config variables that are dependent upon node environmental variables set on the server.

Merge several configuration sources into a portable `get` method used throughout the app.

## Built With

<ul>
<li><a href="https://github.com/motdotla/dotenv" target="_blank" rel="noopener">Dotenv</a> - Loads environment variables from a <code>.env</code> file into <a href="https://nodejs.org/docs/latest/api/process.html#process_process_env" target="_blank" rel="noopener">process.env</a>.</li>
<li><a href="https://github.com/motdotla/dotenv-expand" target="_blank" rel="noopener">Dotenv-expand</a> - Adds variable expansion on top of dotenv.</li>
<li><a href="https://github.com/motdotla/path" target="_blank" rel="noopener">Path</a> - Utilities for working with file and directory paths.</li>
</ul>

## Getting Started

### Prerequisites

> Note : You must have <a href="https://git-scm.com/" target="_blank" rel="noopener">git</a>, 
> <a href="https://nodejs.org/" target="_blank" rel="noopener">node</a> and
> <a href="https://www.npmjs.com/" target="_blank" rel="noopener">npm</a> installed on your machine.
> <a href="https://yarnpkg.com/" target="_blank" rel="noopener">Yarn</a> is recommended but not
> required.

### Installation

In a terminal, type :

```bash
$ npm install node-config-service --save-dev
# or
$ yarn add node-config-service --dev
```

## Usage

Process environmental variables can be set in a number of ways including the command line interface, in the `package.json` and using `.env` files in the root of your project.

Under the hood ConfigService uses <a href="https://github.com/motdotla/dotenv" target="_blank" rel="noopener">Dotenv</a> to populate the node `process.env` object with the defined variables.

```js
require('node-config-service');
console.log(process.env);
```

<a href="https://github.com/motdotla/dotenv-expand" target="_blank" rel="noopener">Dotenv-expand</a> adds variable expansion on top of `dotenv` . This allows the use of simple and complex examples of variable expansion in your `.env` file.

### Example Env Variables

<details open="open">
<summary>Example .env Variables</summary>
<blockquote>

<details>
<summary>Basic Example</summary>
<blockquote>

```bash
NODE_ENV=development
PROPERTY_KEY=property_value
```

</blockquote>
</details>

<details>
<summary>Example DB Config</summary>
<blockquote>

```bash
NODE_ENV=production

MONGOLAB_DATABASE=heroku_db
MONGOLAB_USER=username
MONGOLAB_PASSWORD=password
MONGOLAB_DOMAIN=abcd1234.mongolab.com
MONGOLAB_PORT=12345
MONGOLAB_URI=mongodb://${MONGOLAB_USER}:${MONGOLAB_PASSWORD}@${MONGOLAB_DOMAIN}:${MONGOLAB_PORT}/${MONGOLAB_DATABASE}
```

</blockquote>
</details>

<details>
<summary>Full Dotenv Expanded Example</summary>
<blockquote>

```bash
NODE_ENV=test
BASIC=basic

BASIC_EXPAND=$BASIC

MACHINE=machine_env
MACHINE_EXPAND=$MACHINE

UNDEFINED_EXPAND=$UNDEFINED_ENV_KEY

ESCAPED_EXPAND=\$ESCAPED

DEFINED_EXPAND_WITH_DEFAULT=${MACHINE:-default}
DEFINED_EXPAND_WITH_DEFAULT_NESTED=${MACHINE:-${UNDEFINED_ENV_KEY:-default}}

UNDEFINED_EXPAND_WITH_DEFINED_NESTED=${UNDEFINED_ENV_KEY:-${MACHINE:-default}}
UNDEFINED_EXPAND_WITH_DEFAULT=${UNDEFINED_ENV_KEY:-default}
UNDEFINED_EXPAND_WITH_DEFAULT_NESTED=${UNDEFINED_ENV_KEY:-${UNDEFINED_ENV_KEY_2:-default}}
UNDEFINED_EXPAND_WITH_DEFAULT_NESTED_TWICE=${UNDEFINED_ENV_KEY:-${UNDEFINED_ENV_KEY_2${UNDEFINED_ENV_KEY_3:-default}}}
UNDEFINED_EXPAND_WITH_DEFAULT_WITH_SPECIAL_CHARACTERS=${UNDEFINED_ENV_KEY:-/default/path}

MONGOLAB_DATABASE=heroku_db
MONGOLAB_USER=username
MONGOLAB_PASSWORD=password
MONGOLAB_DOMAIN=abcd1234.mongolab.com
MONGOLAB_PORT=12345
MONGOLAB_URI=mongodb://${MONGOLAB_USER}:${MONGOLAB_PASSWORD}@${MONGOLAB_DOMAIN}:${MONGOLAB_PORT}/${MONGOLAB_DATABASE}

MONGOLAB_USER_RECURSIVELY=${MONGOLAB_USER}:${MONGOLAB_PASSWORD}
MONGOLAB_URI_RECURSIVELY=mongodb://${MONGOLAB_USER_RECURSIVELY}@${MONGOLAB_DOMAIN}:${MONGOLAB_PORT}/${MONGOLAB_DATABASE}

WITHOUT_CURLY_BRACES_URI=mongodb://$MONGOLAB_USER:$MONGOLAB_PASSWORD@$MONGOLAB_DOMAIN:$MONGOLAB_PORT/$MONGOLAB_DATABASE
WITHOUT_CURLY_BRACES_USER_RECURSIVELY=$MONGOLAB_USER:$MONGOLAB_PASSWORD
WITHOUT_CURLY_BRACES_URI_RECURSIVELY=mongodb://$MONGOLAB_USER_RECURSIVELY@$MONGOLAB_DOMAIN:$MONGOLAB_PORT/$MONGOLAB_DATABASE
WITHOUT_CURLY_BRACES_UNDEFINED_EXPAND_WITH_DEFAULT_WITH_SPECIAL_CHARACTERS=$UNDEFINED_ENV_KEY:-/default/path
```

</blockquote>
</details>

<p>See <a href="https://github.com/motdotla/dotenv-expand#examples" target="_blank" rel="noopener">dotenv-expand#examples</a> for more information.</p>

</blockquote>
</details>

## Issues

If you experience unexpected behavior please [let the maintainers know](https://github.com/racheldotey/node-config-service/issues/new).

To help us quickly find and solve your problem, pease try to create bug reports that are:

*   _Reproducible._ Include steps to reproduce the problem.
*   _Specific._ Include as much detail as possible: which version, what environment, etc.
*   _Unique._ Do not duplicate [existing opened issues](https://github.com/racheldotey/node-config-service/issues).
*   _Scoped to a Single Bug._ One bug per report.

## Development

[![ForTheBadge built-by-developers](http://ForTheBadge.com/images/badges/built-by-developers.svg)](https://GitHub.com/racheldotey/)

#### Dev requirements

<ul>
<li><a href="" target="_blank" rel="noopener">clean-jsdoc-theme</a> -
<li><a href="https://github.com/open-cli-tools/concurrently" target="_blank" rel="noopener">Concurrently</a> - Run server commands concurrently.</li>
<li><a href="https://github.com/intesso/connect-livereload" target="_blank" rel="noopener">Connect-livereload</a> - Middleware for adding the livereload script to the response. no browser plugin is needed.</li>
<li><a href="https://expressjs.com/" target="_blank" rel="noopener">Express</a> - Used to server the docs locally.</li>
<li><a href="https://jsdoc.app/" target="_blank" rel="noopener">Jsdoc</a> - API documentation generator for JavaScript.</li>
<li><a href="" target="_blank" rel="noopener">Jsdoc-to-markdown</a> -</li>
<li><a href="https://github.com/mmichelli/node-livereload" target="_blank" rel="noopener">Livereload</a> - LiveReload server in Node.js.</li>
<li><a href="https://github.com/remy/nodemon" target="_blank" rel="noopener">Nodemon</a> - Auto restart the app when file changes are detected.</li>
<li><a href="https://github.com/ruyadorno/ntl" target="_blank" rel="noopener">Node Task List</a> - Interactive cli tool that lists and run `package.json` scripts.</li>
<li><a href="https://github.com/sindresorhus/open-cli" target="_blank" rel="noopener">Open-cli</a> - Cross-platform command line, open urls, files, etc.</li>
</ul>

## Scripts

Using either `npm` or `yarn`

View the interactive cli tool that lists and run package.json scripts by using:

```bash
$ yarn run info
yarn run v1.22.4
warning ..\..\..\package.json: No license field
$ ntl --info
√  Node Task List
? Select a task to run: (Use arrow keys)
>      start › ntl
        info › ntl --info
         run › node ./scripts/dev-server.js
       serve › nodemon ./scripts/dev-server.js
        test › echo 'Error: no test specified'
       build › npm run docs-build
         dev › npm run test && npm run build && npm run serve

```

## Contributing

First off, thanks for taking the time to contribute! Pull requests are welcome. For major changes, please [open an issue](#issues) first to discuss what you would like to change.

[![GitHub forks](https://img.shields.io/github/forks/racheldotey/node-config-service?style=for-the-badge)](https://github.com/racheldotey/node-config-service/fork) [![GitHub last commit](https://img.shields.io/github/last-commit/racheldotey/node-config-service?style=for-the-badge)](https://github.com/racheldotey/node-config-service/commits/main)

## Contact

If you like my work, then give me a <a href="https://github.com/racheldotey/node-config-service/" target="_blank" rel="noopener">star</a> or <a href="https://github.com/racheldotey" target="_blank" rel="noopener">follow</a> my GitHub.

## License

Freely distributed under the <a href="https://github.com/racheldotey/node-config-service/blob/main/LICENSE" target="_blank" rel="noopener">MIT License</a>. Copyright © <a href="https://racheldotey.ninja" target="_blank" rel="noopener">Rachel Dotey</a>, 2021-present.
