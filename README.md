<h1 align="center">node-config-service</h1>
<div align="center">
  Config manager for <code>node.js</code>.<br />
  <a href="/issues/new">Report a Bug</a>
  ·
  <a href="/subscription">Watch this Project</a>
  ·
  <a href="/fork">Fork this Repository</a>
</div>

<details>
<summary>Table of Contents</summary>

- [About](#about)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Dev requirements:](#dev-requirements)
    - [Dev tools:](#dev-tools)
- [Scripts](#scripts)
- [Usage](#usage)
  - [Example Env Variables](#example-env-variables)
- [Issues](#issues)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)
  
</details>

## About

`ConfigService` is a `node` module used to manage a set of config variables that are dependent upon node environmental variables set on the server. 

Merge several configuration sources into a portable `get` method used throughout the app.

## Built With

- <a href="https://github.com/motdotla/dotenv" target="_blank">Dotenv</a> - Loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env).
- <a href="https://github.com/motdotla/dotenv-expand" target="_blank">Dotenv-expand</a> - Adds variable expansion on top of dotenv.
- <a href="https://github.com/motdotla/path" target="_blank">Path</a> - Utilities for working with file and directory paths.

## Getting Started

### Prerequisites

> Note : You must have `git`, `node` and `npm` installed on your machine.
> `Yarn` is also recommended but not required.

### Installation


In a terminal, type :

```bash
npm install node-config-service --save-dev
# or
yarn add node-config-service --dev
```


#### Dev requirements:

- <a href="" target="_blank">clean-jsdoc-theme</a> -
- <a href="https://github.com/open-cli-tools/concurrently" target="_blank">Concurrently</a> - Run server commands concurrently.
- <a href="https://github.com/intesso/connect-livereload" target="_blank">Connect-livereload</a> - Middleware for adding the livereload script to the response. no browser plugin is needed.
- <a href="https://expressjs.com/" target="_blank">Express</a> - Used to server the docs locally.
- <a href="https://jsdoc.app/" target="_blank">Jsdoc</a> - API documentation generator for JavaScript.
- <a href="" target="_blank">Jsdoc-to-markdown</a> -
- <a href="https://github.com/mmichelli/node-livereload" target="_blank">Livereload</a> - LiveReload server in Node.js.
- <a href="https://github.com/remy/nodemon" target="_blank">Nodemon</a> - Auto restart the app when file changes are detected.
- <a href="https://github.com/ruyadorno/ntl" target="_blank">Node Task List</a> - Interactive cli tool that lists and run `package.json` scripts.
- <a href="https://github.com/sindresorhus/open-cli" target="_blank">Open-cli</a> - Cross-platform command line, open urls, files, etc.


#### Dev tools:
-  <a href="https://git-scm.com/" target="_blank">Git</a> or <a href="https://desktop.github.com/" target="_blank">GitHub Desktop</a> - Code management.
-  <a href="https://prettier.io/docs/en/index.html" target="_blank">Yarn</a> - Dependency management.
-  <a href="https://prettier.io/docs/en/index.html" target="_blank">Prettier</a> - Code formatter.

## Scripts

Using either `npm` or `yarn` 

View the interactive cli tool that lists and run package.json scripts by using:


		"help": "npm run",
		"start": "ntl",
		"start:dev": "concurrently \"npm:docs:watch\" \"npm:docs:run\"",
		"serve": "nodemon ./src/index.js",
		"dev": "npm run docs:build:auto",
		"build:check": "node --check",
		"build:test": "echo \"Error: no test specified\" && exit 1",
		"docs:run": "nodemon ./docs/server.js",
		"docs:view": "open-cli http://localhost:5555/",
		"docs:build": "jsdoc --configure jsdoc.json --debug",
		"docs:watch": "nodemon --exec \"jsdoc --configure jsdoc.json\""

```bash
yarn start
```



## Usage

Process environmental variables can be set in a number of ways including the command line interface, in the `package.json` and using `.env` files in the root of your project. 

Under the hood ConfigService uses <a href="https://github.com/motdotla/dotenv" target="_blank">Dotenv</a> to populate the node `process.env` object with the defined variables.

```js
require('node-config-service');
console.log(process.env);
```

<a href="https://github.com/motdotla/dotenv-expand" target="_blank">Dotenv-expand</a> adds variable expansion on top of `dotenv`. This allows the use of simple and complex examples of variable expansion in your `.env`
file.

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

<p>See <a href="https://github.com/motdotla/dotenv-expand#examples" target="_blank">dotenv-expand#examples</a> for more information.</p>

</blockquote>
</details>

## Issues

If you experience unexpected behavior please <a href="https://github.com/racheldotey/node-config-service/issues/new" target="_blank">let the maintainers know</a>. 

To help us quickly find and solve your problem, pease try to create bug reports that are:

- _Reproducible._ Include steps to reproduce the problem.
- _Specific._ Include as much detail as possible: which version, what environment, etc.
- _Unique._ Do not duplicate  <a href="https://github.com/racheldotey/node-config-service/issues" target="_blank">existing opened issues</a>.
- _Scoped to a Single Bug._ One bug per report.

## Contributing

First off, thanks for taking the time to contribute! Pull requests are welcome. For major changes, please [open an issue](#issues) first to discuss what you would like to change.

<a href="https://github.com/racheldotey/node-config-service/fork" target="_blank">Fork this Repository</a>.

## Contact

If you like my work, then give me a <a href="https://github.com/racheldotey/node-config-service/" target="_blank">star</a>. I also appreciate a <a href="https://github.com/racheldotey" target="_blank">follow</a>.

## License

May be freely distributed under the <a href="https://github.com/racheldotey/node-config-service/blob/main/LICENSE" target="_blank">MIT License</a>.

Copyright (C) 2022-present <a href="https://racheldotey.ninja" target="_blank">Rachel Dotey</a>.