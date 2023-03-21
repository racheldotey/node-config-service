import * as dotenv from 'dotenv';

import { newConfigPropertyManager, ConfigPropertyManager, ConfigPropertyManagerOptions } from './propertyManager';


type ConfigService = {
	loadEnv(options?: dotenv.DotenvConfigOptions): void;
	addConfig(key: string, options?: ConfigPropertyManagerOptions): ConfigPropertyManager;
	getConfig(key?: string): ConfigPropertyManager | undefined;
	deleteConfig(key: string): void;
}


const newConfigService = (options?: ConfigPropertyManagerOptions, envOptions?: dotenv.DotenvConfigOptions): ConfigService => {

	let dotenvLoaded = false;
	const extraConfigs: {
		[key: string]: ConfigPropertyManager;
	} = {};


	const service: ConfigService = {
		loadEnv(options?: dotenv.DotenvConfigOptions) {
			// Load environment variables into process.env
			// @see https://www.npmjs.com/package/dotenv
			dotenv.config(options);
			dotenvLoaded = true;
		},
		addConfig(key: string, options?: ConfigPropertyManagerOptions) {
			if (this.getConfig(key)) throw new Error(`A config named "${key}" is already defined.`);
			const newConfig = newConfigPropertyManager(options);
			return extraConfigs[key] = newConfig;
		},
		getConfig(key = 'default'): ConfigPropertyManager | undefined {
			return extraConfigs[key] ?? undefined;
		},
		deleteConfig(key: string) {
			if (key === 'default') throw new Error("Cannot delete default config.");
			if (extraConfigs[key]) {
				delete extraConfigs[key];
				return true;
			}
			return undefined;
		}
	};

	service.loadEnv(envOptions);
	service.addConfig('default', options);

	return service;
};



export {
	ConfigService,
	newConfigService,
};