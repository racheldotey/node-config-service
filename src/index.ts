/**
 * NodeJS Config Service.
 *
 * Simplified config management for node applications.
 * ConfigService accepts a configuration object of properties
 * to be defined using the node process env and run time overrides.
 *
 * @module NodeConfigService
 */
import { getDefaultService } from './getDefaultService';
import * as dotenv from 'dotenv';

// Load environment variables into process.env
// @see https://www.npmjs.com/package/dotenv
dotenv.config();

export const defaultService = getDefaultService();

export default defaultService;