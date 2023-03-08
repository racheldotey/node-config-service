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

/** Exports the Node-Config-Service entry point. */
//import { NodeConfigService } from './NodeConfigService';

const NodeConfigService = { cat: "Luna" };
console.info("Hello World!", NodeConfigService);

export { NodeConfigService };
export default NodeConfigService;