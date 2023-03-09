//import * as dotenv from 'dotenv';

import type { IConfigManager, DefinePropertyOptions, ConfigManagerOptions } from './types';
import { ConfigManager } from './ConfigManager';

export class ConfigService extends ConfigManager {
	dotenvLoaded?: boolean | false;
	extraConfigs: {
		[key: string]: IConfigManager;
	};

	constructor(options: ConfigManagerOptions = { properties: {} }) {
		super({
			...options,
		});
		this.extraConfigs = {};
	}

	init(props?: DefinePropertyOptions, envValues?: { [key: string]: string }) {
		this.loadEnv();
		return super.init(props, envValues);
	}

	loadEnv() { // dotenv.DotenvConfigOptions) {
		if (this.dotenvLoaded) return;

		// Load environment variables into process.env
		// @see https://www.npmjs.com/package/dotenv
		//dotenv.config();
		this.dotenvLoaded = true;
	}

	getConfig(key: string) {
		return this.extraConfigs[key] ? this.extraConfigs[key] : null;
	}
};
