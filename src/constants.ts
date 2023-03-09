import { ConfigManagerOptions, DefinePropertyOptions } from './types';

export const DEFAULT_PROPERTIES: DefinePropertyOptions = {
	nodeConfigService: {
		name: 'nodeConfigService',
		envKey: 'NODE_CONFIG_SERVICE',
		desc: 'Optional - Demo env variable.',
		default: 'Hello World!',
		required: false,
	},
	environment: {
		name: 'environment',
		envKey: 'NODE_ENV',
		desc: '{string = "production"} Optional - Server environment such as "production" or "development".',
		default: 'production',
		required: false,
	},
};

export const DEFAULT_OPTIONS: ConfigManagerOptions = {
	properties: { ...DEFAULT_PROPERTIES },
};
