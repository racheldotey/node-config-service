# nodejs-config-service

Manage a set of config variables that are dependent upon node environmental variables set on the server. Used to merge several configuration sources into a portable `get` method used throughout the app.

## Module requirements:

-  [dotenv](https://github.com/motdotla/dotenv)
-  [path](https://nodejs.org/docs/latest/api/path.html)
-  [prettier](https://prettier.io/docs/en/index.html)
-  [nodemon](https://prettier.io/docs/en/index.html)
-  [Node Task List](https://github.com/ruyadorno/ntl)

## Scripts

View the interactive cli tool that lists and run package.json scripts by using:

```
yarn start
```

## Usage

Create a .env file in the root of your project:

```
ENVIRONMENT="development"
APP_ROOT_DIR="/srv/app/src"
```

As early as possible in your application, import the `config-service` module to include environmental variables into node.

```
require('config-service');
```

**Note that this does not initialize the config service.** It just populates the node `process.env` object with the contents of the `.env` file.

```
console.log(process.env);
```

## Developer Notes

### Cross-platform Shell Reference
A quick reference of the shell operators & commands that work the same on Unix and Windows.

Use && to run commands in sequence. If a command fails, the script exits.
Use | to pipe the stdout of one command into the stdin of the next. (do-something | something else)
Use > to write the stdout of a command to a file. (do-something > file)
Use < to send the contents of a file to a command's stdin. (command < file)
Use cd <dir> to change the current working directory to <dir>. Note that cd alone prints the current working directory on windows, but changes the working directory to ~ on *nix.