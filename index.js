'use strict';

/**
 * NodeConfigService
 *
 * A Node.js app config management service for use in browser and on the server.
 *
 * Simplified config management for node applications.
 * ConfigService accepts a configuration object of properties
 * to be defined using the node process env and run time overrides.
 *
 * @version 0.9.0
 * @module node-config-service
 * @author Rachel Dotey <hello@racheldotey.com>
 */
const { NodeConfigService, ConfigService, ConfigProperty } = require('./dist/node-config-service');

/** Exports the Node-Config-Service entry point. */
module.exports = NodeConfigService;
module.exports.default = NodeConfigService;
module.exports.NodeConfigService = NodeConfigService;
module.exports.ConfigService = ConfigService;
module.exports.ConfigProperty = ConfigProperty;
