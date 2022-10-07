/*!
 * Default config properties.
 */

const path = require('path');

/**
 * CONFIG_PROPERTIES
 *
 * @memberOf NodeConfigService
 * @desc Object defining default config properties.
 * @constant
 * @type {Object}
 * @default
 */
const CONFIG_PROPERTIES = Object.freeze({
	NODE_ENV: {
		key: 'NODE_ENV',
		name: 'environment',
		desc: `{String} Current environment likely 'production' or 'development'.`,
		default: 'development',
		required: false,
		parse: (value) => value.toString().toLowerCase(),
	},
	ROOT_DIR: {
		key: 'ROOT_DIR',
		name: 'rootDir',
		desc: `{String} The root directory (absolute system path) for the application.`,
		default: __dirname,
		required: true,
		parse: (value) => path.normalize(value),
	},
});

module.exports = CONFIG_PROPERTIES;
