import * as dotenv from 'dotenv';

import { newConfigPropertyManager, ConfigPropertyManager, ConfigPropertyManagerOptions } from './propertyManager';


interface ConfigService extends ConfigPropertyManager {
	loadEnv(options?: dotenv.DotenvConfigOptions): void;
	addConfig(key: string, options?: ConfigPropertyManagerOptions): ConfigPropertyManager;
	getConfig(key?: string): ConfigPropertyManager | undefined;
	deleteConfig(key: string): void;
}


const newConfigService = (options?: ConfigPropertyManagerOptions, envOptions?: dotenv.DotenvConfigOptions): ConfigService => {

	const defaultConfig = newConfigPropertyManager(options);
	const extraConfigs: {
		[key: string]: ConfigPropertyManager;
	} = { 'default': defaultConfig };

	let dotenvLoaded = false;

	const service: ConfigService = {
		...defaultConfig,
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

	return service;
};



export {
	ConfigService,
	newConfigService,
};