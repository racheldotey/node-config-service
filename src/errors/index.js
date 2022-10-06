/**
 * This namespace contains documentation for config service errors.
 *
 * To allow you to do easier debugging ConfigService provides custom error classes.
 * All of these errors are exposed on the ConfigService object and the configService constructor.
 *
 * This means that errors can be accessed using `ConfigService.ConfigError`
 *
 * @namespace ConfigErrors
 */
const ConfigError = require('./config_error');

/**
 * @memberOf ConfigErrors
 * @class ConfigAggregateErrors
 * @extends {AggregateError} 
 * @classdesc 
 * Several errors wrapped in a single error when multiple  errors need to be reported.
 * 
 * See [AggregateError](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/AggregateError) for more details.
 * @desc
 * Creates an instance representing several errors wrapped in a single error when multiple
 * errors need to be reported by an operation, for example by Promise.any().
 *
 * @param {String} message optional - A human-readable description of the error.
 * @param {Object} options optional - An object that has the following properties:
 * @param {String} options.cause optional - A property indicating the specific cause of the error.
 */
class ConfigAggregateError extends AggregateError {
	constructor(message, options) {
		super(arguments);

		this.desc =
			'Creates an instance representing several errors wrapped in a single error when multiple errors need to be reported by an operation, for example by Promise.any().';
	}
}

/**
 * @memberOf ConfigErrors
 * @class ConfigRangeError
 * @extends {RangeError} https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RangeError
 * @classdesc Several 
 * @desc
 * ConfigRangeError constructor.
 *
 * Creates an instance representing an error that occurs when a numeric variable or parameter
 * is outside its valid range.
 *
 * See [RangeError](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RangeError) for more details.
 *
 * @param {String} message optional - A human-readable description of the error.
 * @param {Object} options optional - An object that has the following properties:
 * @param {String} options.cause optional - A property indicating the specific cause of the error.
 */
class ConfigRangeError extends RangeError {
	constructor(message, options) {
		super(arguments);

		this.desc =
			'Creates an instance representing an error that occurs when a numeric variable or parameter is outside its valid range.';
	}
}

/**
 * @memberOf ConfigErrors
 * @class ConfigReferenceError
 * @extends {ReferenceError} https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/ReferenceError
 * @classdesc Several 
 * @desc
 * ConfigReferenceError constructor.
 *
 * Creates an instance representing an error that occurs when de-referencing an invalid reference.
 *
 * See [ReferenceError](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/ReferenceError) for more details.
 *
 * @param {String} message optional - A human-readable description of the error.
 * @param {Object} options optional - An object that has the following properties:
 * @param {String} options.cause optional - A property indicating the specific cause of the error.
 */
class ConfigReferenceError extends ReferenceError {
	constructor(message, options) {
		super(arguments);

		this.desc =
			'Creates an instance representing an error that occurs when de-referencing an invalid reference.';
	}
}

/**
 * @memberOf ConfigErrors
 * @class ConfigSyntaxError
 * @extends {SyntaxError} https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/SyntaxError
 * @classdesc Several 
 * @desc
 * ConfigSyntaxError constructor.
 *
 * Creates an instance representing a syntax error.
 *
 * See [SyntaxError](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/SyntaxError) for more details.
 *
 * @param {String} message optional - A human-readable description of the error.
 * @param {Object} options optional - An object that has the following properties:
 * @param {String} options.cause optional - A property indicating the specific cause of the error.
 */
class ConfigSyntaxError extends SyntaxError {
	constructor(message, options) {
		super(arguments);

		this.desc = 'Creates an instance representing a syntax error.';
	}
}

/**
 * @memberOf ConfigErrors
 * @class ConfigTypeError
 * @extends {TypeError} https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/TypeError
 * @classdesc Several 
 * @desc
 * ConfigTypeError constructor.
 *
 * Creates an instance representing an error that occurs when a variable or parameter
 * is not of a valid type.
 *
 * See [TypeError](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/TypeError) for more details.
 *
 * @param {String} message optional - A human-readable description of the error.
 * @param {Object} options optional - An object that has the following properties:
 * @param {String} options.cause optional - A property indicating the specific cause of the error.
 */
class ConfigTypeError extends TypeError {
	constructor(message, options) {
		super(arguments);

		this.desc =
			'Creates an instance representing an error that occurs when a variable or parameter is not of a valid type.';
	}
}

/**
 * @memberOf ConfigErrors
 * @class ConfigURIError
 * @extends {URIError} https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/URIError
 * @classdesc Several 
 * @desc
 * ConfigURIError constructor.
 *
 * Creates an instance representing an error that occurs when encodeURI() or decodeURI()
 * are passed invalid parameters.
 *
 * See [URIError](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/URIError) for more details.
 *
 * @param {String} message optional - A human-readable description of the error.
 * @param {Object} options optional - An object that has the following properties:
 * @param {String} options.cause optional - A property indicating the specific cause of the error.
 */
class ConfigURIError extends URIError {
	constructor(message, options) {
		super(arguments);

		this.desc =
			'Creates an instance representing an error that occurs when encodeURI() or decodeURI() are passed invalid parameters.';
	}
}



module.exports.Error = ConfigError;
module.exports.ConfigError = ConfigError;
module.exports.AggregateError = ConfigAggregateError;
module.exports.RangeError = ConfigRangeError;
module.exports.ReferenceError = ConfigReferenceError;
module.exports.SyntaxError = ConfigSyntaxError;
module.exports.TypeError = ConfigTypeError;
module.exports.URIError = ConfigURIError;
