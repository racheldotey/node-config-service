<h1 align="center">node-config-service</h1>
<div align="center">

**Simple config config management for `node` apps.**

[![npm](https://img.shields.io/npm/v/node-config-service.svg?style=flat-square)](https://www.npmjs.com/package/node-config-service) [![GitHub all releases](https://img.shields.io/github/downloads/racheldotey/node-config-service/total?style=flat-square)](https://github.com/racheldotey/node-config-service/releases) [![GitHub issues](https://img.shields.io/github/issues/racheldotey/node-config-service?style=flat-square)](https://github.com/racheldotey/node-config-service/issues) [![GitHub last commit](https://img.shields.io/github/last-commit/racheldotey/node-config-service?style=flat-square)](https://github.com/racheldotey/node-config-service/commits/main)

[![NPM](https://nodei.co/npm/node-config-service.png)](https://nodei.co/npm/node-config-service/)

</div>

```js
const nodeConfigService = require('node-config-service');

console.log(process.env);
```

<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
  - [Example Env Variables](#example-env-variables)
- [API Reference](#api-reference)
- [NodeConfigService](#nodeconfigservice)
  - [NodeConfigService.NodeConfigService#version](#configserviceconfigserviceversion)
    - [Example:](#example)
  - [NodeConfigService.NodeConfigService#NodeConfigService](#configserviceconfigserviceconfigservice)
    - [Example:](#example-1)
  - [NodeConfigService.NodeConfigService#errors](#configserviceconfigserviceerrors)
  - [NodeConfigService.module.exports : <code>NodeConfigService</code>](#configservicemoduleexports--nodeconfigservice)
  - ["loadEnv"](#loadenv)
- [Issues](#issues)
- [Development](#development)
    - [Dev requirements](#dev-requirements)
- [Scripts](#scripts)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)

</details>

## About

![Keywords](https://img.shields.io/github/package-json/keywords/racheldotey/node-config-service?style=for-the-badge)

`NodeConfigService` is a `node` module used to manage a set of config variables that are dependent upon node environmental variables set on the server.

Merge several configuration sources into a portable `get` method used throughout the app.

## Getting Started

### Prerequisites

> Before starting, <a href="https://nodejs.org/en/download/" target="_blank" rel="noopener">download and install Node.js</a>. Node.js 14.0 or higher is required. <a href="https://git-scm.com/" target="_blank" rel="noopener">Git</a> is required to [contribute](#contributing) to the project.
>
> Optional tools include install <a href="https://classic.yarnpkg.com/en/docs/install#windows-stable" target="_blank" rel="noopener">yarn</a> if desired.
> `$ npm install --global yarn`

### Installation

`NodeConfigService` is a <a href="https://nodejs.org/en/" target="_blank" rel="noopener">Node.js</a> module available through the <a href="https://www.npmjs.com" target="_blank" rel="noopener">npm</a> and <a href="https://yarnpkg.com/" target="_blank" rel="noopener">yarn</a> package registries.


If you have not already done so, create a `package.json` for your project with the <a href="https://docs.npmjs.com/cli/v6/commands/npm-init" target="_blank" rel="noopener">`npm init`</a> or the <a href="https://classic.yarnpkg.com/en/docs/cli/init" target="_blank" rel="noopener">`yarn init`</a> command.

Including this module using the <a href="https://docs.npmjs.com/getting-started/installing-npm-packages-locally" target="_blank" rel="noopener">`npm install`</a> or the <a href="https://classic.yarnpkg.com/en/docs/cli/install" target="_blank" rel="noopener">`yarn install`</a> command:

In a terminal, type :

```bash
$ npm install node-config-service --save-dev
# or
$ yarn add node-config-service --dev
```

## Features

  * Define config params in a json file.
  * Load config variables with node env params, pass them programmatically, or load them from asynchronous sources.

## Usage

Process environmental variables can be set in a number of ways including the command line interface, in the `package.json` and using `.env` files in the root of your project.

Under the hood NodeConfigService uses <a href="https://github.com/motdotla/dotenv" target="_blank" rel="noopener">Dotenv</a> to populate the node `process.env` object with the defined variables.

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

## API Reference

<a name="module_ConfigService"></a>

## NodeConfigService
NodeJS Config Service.

Simplified config management for node applications.
NodeConfigService accepts a configuration object of properties
to be defined using the node process env and run time overrides.


* [NodeConfigService](#module_ConfigService)
    * [.NodeConfigService#version](#module_ConfigService.NodeConfigService+version)
    * [.NodeConfigService#NodeConfigService](#module_ConfigService.NodeConfigService+NodeConfigService)
    * [.NodeConfigService#errors](#module_ConfigService.NodeConfigService+errors)
    * [.module.exports](#module_ConfigService.module.exports) : <code>NodeConfigService</code>
    * ["loadEnv"](#module_ConfigService.event_loadEnv)

<a name="module_ConfigService.NodeConfigService+version"></a>

### NodeConfigService.NodeConfigService#version
The NodeConfigService version

#### Example:

    console.log(nodeConfigService.version); // '1.x.x'

**Kind**: static property of [<code>NodeConfigService</code>](#module_ConfigService)
**Api**: public
**Properties**

| Name |
| --- |
| version |

<a name="module_ConfigService.NodeConfigService+NodeConfigService"></a>

### NodeConfigService.NodeConfigService#NodeConfigService
The NodeConfigService constructor

The exports of the nodeConfigService module is an instance of this class.

#### Example:

    const appConfig = require('nodeConfigService');
    const moduleConfig = new nodeConfigService.NodeConfigService();

**Kind**: static property of [<code>NodeConfigService</code>](#module_ConfigService)
**Access**: public
**Properties**

| Name |
| --- |
| NodeConfigService |

<a name="module_ConfigService.NodeConfigService+errors"></a>

### NodeConfigService.NodeConfigService#errors
Key and class object map of custom error methods.

**Kind**: static property of [<code>NodeConfigService</code>](#module_ConfigService)
**Access**: public
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| errors | <code>Object</code> | Key and class object map of custom error methods. |

<a name="module_ConfigService.module.exports"></a>

### NodeConfigService.module.exports : <code>NodeConfigService</code>
The exports object is an instance of NodeConfigService.

**Kind**: static property of [<code>NodeConfigService</code>](#module_ConfigService)
**Access**: public
<a name="module_ConfigService.event_loadEnv"></a>

### "loadEnv"
Load environment variables into process.env using [dotenv](https://www.npmjs.com/package/dotenv).

NOTE: Should be placed as early as possible on startup.

**Kind**: event emitted by [<code>NodeConfigService</code>](#module_ConfigService)


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

To view an <a href="https://github.com/ruyadorno/ntl" target="_blank" rel="noopener">interactive menu</a> of project commands, first install the dependencies, then use execute the `start` command using either `npm` or `yarn`

View the interactive cli tool that lists and run package.json scripts by using:

```bash
$ npm install
$ npm start
# or
$ yarn install
$ yarn start
$ ntl
√  Node Task List
? Select a task to run: (Use arrow keys)
> start
  menu
  info
  test
  format
  build
  build-docs
(Move up and down to reveal more choices)
```

## Running Tests

To run the test suite, first install the dependencies, then run the `test` command:

```bash
$ npm install
$ npm test
# or
$ yarn install
$ yarn test
```

## Contributing

First off, thanks for taking the time to contribute! Pull requests are welcome. For major changes, please [open an issue](#issues) first to discuss what you would like to change.

[![GitHub forks](https://img.shields.io/github/forks/racheldotey/node-config-service?style=for-the-badge)](https://github.com/racheldotey/node-config-service/fork) [![GitHub last commit](https://img.shields.io/github/last-commit/racheldotey/node-config-service?style=for-the-badge)](https://github.com/racheldotey/node-config-service/commits/main) [![GitHub watchers](https://img.shields.io/github/watchers/racheldotey/node-config-service?style=for-the-badge)](https://github.com/racheldotey/node-config-service/watchers/)

## Contact

If you like my work, then give me a <a href="https://github.com/racheldotey/node-config-service/" target="_blank" rel="noopener">star</a> or <a href="https://github.com/racheldotey" target="_blank" rel="noopener">follow</a> my GitHub.

## License

Freely distributed under the <a href="https://github.com/racheldotey/node-config-service/blob/main/LICENSE" target="_blank" rel="noopener">MIT License</a>. Copyright © <a href="https://racheldotey.ninja" target="_blank" rel="noopener">Rachel Dotey</a>, 2021-present.