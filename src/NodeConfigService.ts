//import * as dotenv from 'dotenv';

import type { IConfigService, ConfigServiceOptions } from './types';
import { DEFAULT_SERVICE_PROPERTIES } from './constants';
import { ConfigService } from './ConfigService';

export class NodeConfigService extends ConfigService {
	dotenvLoaded?: boolean | false;
	extraConfigs: {
		[key: string]: IConfigService;
	};

	constructor(options: ConfigServiceOptions = { properties: {} }) {
		super({
			...DEFAULT_SERVICE_PROPERTIES,
			...options,
		});
		this.extraConfigs = {};
	}

	init(processEnv: NodeJS.ProcessEnv = process.env) {
		this.loadEnv();
		return super.init(processEnv);
	}

	loadEnv(options?: { [key: string]: IConfigService; }) { // dotenv.DotenvConfigOptions) {
		// if (!options && this.dotenvLoaded) return;

		// // Load environment variables into process.env
		// // @see https://www.npmjs.com/package/dotenv
		// dotenv.config(options);
		// this.dotenvLoaded = true;
	}

	getConfig(key: string) {
		return this.extraConfigs[key] ? this.extraConfigs[key] : null;
	}
};
