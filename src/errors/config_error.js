/**
 * @memberOf ConfigErrors
 * @class ConfigError
 * @extends {Error} 
 * @classdesc ConfigError is the base class for all config specific errors.
 * @desc
 * The Error() constructor creates an error object.
 * 
 * See [Error](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error) for more details.
 *
 * @param {String} message optional - A human-readable description of the error.
 * @param {Object} options optional - An object that has the following properties:
 * @param {String} options.cause optional - A property indicating the specific cause of the error.
 */
class ConfigError extends Error { }

Object.defineProperty(ConfigError.prototype, 'name', {
    value: this.constructor.name
});

Object.defineProperty(ConfigError.prototype, 'desc', {
    value: 'An error occurred within the node config service module.'
});


module.exports = ConfigError;