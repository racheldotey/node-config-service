# nodejs-config-service

Manage a set of config variables that are dependent upon node environmental variables set on the server. Used to merge several configuration sources into a portable `get` method used throughout the app.

## Module requirements:

-  [dotenv](https://github.com/motdotla/dotenv)
-  [path](https://nodejs.org/docs/latest/api/path.html)

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