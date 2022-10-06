
/**
 * NodeJS Config Service.
 *
 * Simplified config management for node applications.
 * ConfigService accepts a configuration object of properties
 * to be defined using the node process env and run time overrides.
 *
 * @module ConfigService
 */

/**
 * Load environment variables into process.env using [dotenv](https://www.npmjs.com/package/dotenv).
 *
 * NOTE: Should be placed as early as possible on startup.
 *
 * @event loadEnv
 * @type {Object} process.env
 * @memberOf module:ConfigService
 */
require('./load-env');

const pkg = require('../package.json');

const errors = require('./errors');

const ConfigService = require('./config_service');
const defaultProperties = require('./default-properties');

/**
 * The ConfigService version
 *
 * #### Example:
 *
 *     console.log(configService.version); // '1.x.x'
 *
 * @api public
 * @property version
 * @memberOf module:ConfigService
 */
ConfigService.prototype.version = pkg.version;

/**
 * The ConfigService constructor
 *
 * The exports of the configService module is an instance of this class.
 *
 * #### Example:
 *
 *     const appConfig = require('configService');
 *     const moduleConfig = new configService.ConfigService();
 *
 * @public
 * @memberOf module:ConfigService
 * @property ConfigService
 */
ConfigService.prototype.ConfigService = ConfigService;

/**
 * Key and class object map of custom error methods.
 *
 * @public
 * @memberOf module:ConfigService
 * @property {Object} errors Key and class object map of custom error methods.
 */
ConfigService.prototype.errors = errors;

/**
 * The exports object is an instance of ConfigService.
 *
 * @public
 * @memberOf module:ConfigService
 * @type ConfigService
 */
exports = new ConfigService({
    debugging: true,
    silenceErrors: false,
    logErrors: true,
    logFunction: console.debug,
    properties: defaultProperties
});