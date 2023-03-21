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
	silenceErrors?: boolean;
	logErrors?: boolean;
	logFunction?: ConfigOnErrorCallback;
    init(props?: ConfigPropertyDefinitionsMap, envValues?:  NodeJS.ProcessEnv | { [key: string]: string }): ConfigPropertyManager;
	get length(): number;
	get properties(): { [key: string]: ConfigProperty; };
	addProperty(name: string, options: ConfigPropertyOptions, safeAdd?: boolean): void;
	setProperties(propertyOptions: ConfigPropertyDefinitionsMap, resetProperties?: boolean): void;
	get(find?: string | string[] | boolean): ConfigPropertyParsedValue | { [name: string]: ConfigPropertyParsedValue | undefined; } | undefined;
	getAll(): { [name: string]: ConfigPropertyParsedValue | undefined; };
	findOne(find: string): ConfigPropertyParsedValue | undefined;
	findSeveral(names: string[]): {
		[name: string]: ConfigPropertyParsedValue | undefined;
	};
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
		loadEnv(options?: dotenv.DotenvConfigOptions) {
			if (dotenvLoaded && JSON.stringify(dotenvOptions) === JSON.stringify(options)) return;
			// Load environment variables into process.env
			// @see https://www.npmjs.com/package/dotenv
			dotenv.config(options);
			dotenvOptions = options;
			dotenvLoaded = true;
		},
		addConfig(key: string, options?: ConfigPropertyManagerOptions) {
			if (service.getConfig(key)) throw new Error(`A config named "${key}" is already defined.`);
			const newConfig = nodeConfigPropertyManager(options);
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

	extraConfigs.default = service;
	service.loadEnv(envOptions);

	return service;
};


export {
	ConfigService,
	nodeConfigService,
};