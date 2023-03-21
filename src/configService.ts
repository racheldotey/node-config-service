import * as dotenv from 'dotenv';
import {
	ConfigProperty,
	ConfigPropertyOptions,
	ConfigPropertyParsedValue
} from './property';
import {
	nodeConfigPropertyManager,
	ConfigOnErrorCallback,
	ConfigPropertyDefinitionsMap,
	ConfigPropertyManager,
	ConfigPropertyManagerOptions
} from './propertyManager';


interface ConfigService extends ConfigPropertyManager {
	loadEnv(options?: dotenv.DotenvConfigOptions): void;
	addConfig(key: string, options?: ConfigPropertyManagerOptions): ConfigPropertyManager;
	getConfig(key?: string): ConfigPropertyManager | undefined;
	deleteConfig(key: string): void;
}


const nodeConfigService = (options?: ConfigPropertyManagerOptions, envOptions?: dotenv.DotenvConfigOptions): ConfigService => {

	const defaultConfig = nodeConfigPropertyManager(options);
	const extraConfigs: {
		[key: string]: ConfigPropertyManager;
	} = {};

	let dotenvLoaded = false;
	let dotenvOptions: dotenv.DotenvConfigOptions | undefined = undefined;

	const service: ConfigService = {
		...defaultConfig,
		loadEnv(options) {
			if (dotenvLoaded && JSON.stringify(dotenvOptions) === JSON.stringify(options)) return;
			// Load environment variables into process.env
			// @see https://www.npmjs.com/package/dotenv
			dotenv.config(options);
			dotenvOptions = options;
			dotenvLoaded = true;
		},
		addConfig(key, options) {
			if (service.getConfig(key)) throw new Error(`A config named "${key}" is already defined.`);
			const newConfig = nodeConfigPropertyManager(options);
			return extraConfigs[key] = newConfig;
		},
		getConfig(key = 'default'): ConfigPropertyManager | undefined {
			return extraConfigs[key] ?? undefined;
		},
		deleteConfig(key) {
			if (key === 'default') throw new Error("Cannot delete default config.");
			if (extraConfigs[key]) {
				delete extraConfigs[key];
				return true;
			}
			return undefined;
		}
	};

	extraConfigs.default = service;
	service.loadEnv(envOptions);

	return service;
};


export {
	ConfigService,
	nodeConfigService,
};