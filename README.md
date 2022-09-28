<h1 align="center">nodejs-config-service</h1>
<div align="center">
  Config manager for <code>node.js</code>.<br />
  <a href="/issues/new">Report a Bug</a>
  ·
  <a href="/subscription">Watch this Project</a>
  .
  <a href="/fork">Fork this Repository</a>
</div>
<br/>
<hr/>
<br/>
<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Installation](#installation)
    - [Module requirements:](#module-requirements)
    - [Dev requirements:](#dev-requirements)
    - [Dev tools:](#dev-tools)
- [Scripts](#scripts)
- [Usage](#usage)
  - [Expanded .env](#expanded-env)
- [Issues](#issues)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)
  
</details>
<br/>
<hr/>
<br/>
<br/>

## About

Manage a set of config variables that are dependent upon node environmental variables set on the server. 

Merge several configuration sources into a portable `get` method used throughout the app.

## Built With

- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env).
- [dotenv-expand](https://github.com/motdotla/dotenv-expand) - Adds variable expansion on top of dotenv.
- [path](https://nodejs.org/docs/latest/api/path.html) - Utilities for working with file and directory paths.

## Getting Started

> Note : You must have `git`, `node` and `npm` installed on your machine.
> `Yarn` is also recommended but not required.

### Prerequisites


Usage
Cookiecutter template
Manual setup
Variables reference

## Installation


In a terminal, type :

```bash
npm install clean-jsdoc-theme --save-dev
# or
yarn add clean-jsdoc-theme -D
```

#### Module requirements:

[dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env).
[dotenv-expand](https://github.com/motdotla/dotenv-expand) - Adds variable expansion on top of dotenv.
[path](https://nodejs.org/docs/latest/api/path.html) - Utilities for working with file and directory paths.

#### Dev requirements:

- [clean-jsdoc-theme]() -
- [concurrently](https://github.com/open-cli-tools/concurrently) - Run server commands concurrently.
- [connect-livereload](https://github.com/intesso/connect-livereload) - Middleware for adding the livereload script to the response. no browser plugin is needed.
- [express](https://expressjs.com/) - Used to server the docs locally.
- [jsdoc](https://jsdoc.app/) - API documentation generator for JavaScript.
- [jsdoc-to-markdown]() -
- [livereload](https://github.com/mmichelli/node-livereload) - LiveReload server in Node.js.
- [nodemon](https://github.com/remy/nodemon) - Auto restart the app when file changes are detected.
- [ntl](https://github.com/ruyadorno/ntl) - Interactive cli tool that lists and run `package.json` scripts.
- [open-cli](https://github.com/sindresorhus/open-cli) - Cross-platform command line, open urls, files, etc.


#### Dev tools:
-  [Git](https://git-scm.com/) or [GitHub Desktop](https://desktop.github.com/) - Code management.
-  [Yarn](https://prettier.io/docs/en/index.html) - Dependency management.
-  [Prettier](https://prettier.io/docs/en/index.html) - Code formatter.

## Scripts

View the interactive cli tool that lists and run package.json scripts by using:

```
yarn start
```

## Usage

Create a `.env` file in the root of your project:

```
NODE_ENV="development"
APP_ROOT_DIR="/srv/your-app/src/"
```

As early as possible in your application, import the `config-service` module to include environmental variables into node.

```
require('config-service');
```

Note: This populates the node `process.env` object with the contents of the `.env` file.

```
console.log(process.env);
```

### Expanded .env

[Dotenv-expand](https://github.com/motdotla/dotenv-expand) adds variable expansion on top of dotenv.

See [tests/.env](https://github.com/motdotla/dotenv-expand/blob/master/tests/.env) for simple and complex examples of variable expansion in your `.env`
file.

```
# github.com/motdotla/dotenv-expand/blob/master/tests/.env

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

## Issues

If you experience unexpected behavior please [create a GitHub issue](https://github.com/user/repository/issues/new). 

To help us quickly find and solve your problem, pease try to create bug reports that are:

- _Reproducible._ Include steps to reproduce the problem.
- _Specific._ Include as much detail as possible: which version, what environment, etc.
- _Unique._ Do not duplicate existing opened issues.
- _Scoped to a Single Bug._ One bug per report.

## Contributing

First off, thanks for taking the time to contribute! Contributions are what makes the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody else and are **greatly appreciated**.

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contact

If you like my work, then give me a [star](/). I also appreciate a [GitHub profile](https://github.com/racheldotey).

- <a href="https://racheldotey.ninja" target="_blank">GitHub discussions](https://github.com/racheldotey/nodejs-config-service/issues)
I can also be found  for more ways to 

## License

Copyright (C) 2022-present <a href="https://racheldotey.ninja" target="_blank">Rachel Dotey</a>, released under the <a href="/blob/main/LICENSE" target="_blank">MIT License</a>.