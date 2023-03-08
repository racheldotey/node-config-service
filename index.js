'use strict';

/**
 * ConfigService
 *
 * A Node.js app config management service for use in browser and on the server.
 *
 * Simplified config management for node applications.
 * ConfigManager accepts a configuration object of properties
 * to be defined using the node process env and run time overrides.
 *
 * @version 0.9.0
 * @module node-config-service
 * @author Rachel Dotey <hello@racheldotey.com>
 */
const { ConfigService, ConfigManager, ConfigProperty } = require('./dist/node-config-service');

/** Exports the Node-Config-Service entry point. */
module.exports = ConfigService;
module.exports.default = ConfigService;
module.exports.ConfigService = ConfigService;
module.exports.ConfigManager = ConfigManager;
module.exports.ConfigProperty = ConfigProperty;