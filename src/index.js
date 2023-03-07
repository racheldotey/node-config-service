'use strict';

/**
 * A Node.js app config management service for use in browser and on the server.
 *
 * @version 0.9.0
 * @module node-config-service
 * @author Rachel Dotey <hello@racheldotey.com>
 */

/** Exports the Node-Config-Service entry point. */
const { NodeConfigService } = require('./NodeConfigService');

module.exports = NodeConfigService;
module.exports.default = NodeConfigService;
module.exports.NodeConfigService = NodeConfigService;
