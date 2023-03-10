import { ConfigManagerOptions, DefinePropertyOptions } from './types';

export const DEFAULT_PROPERTIES: DefinePropertyOptions = {
	nodeConfigService: {
		envKey: 'NODE_CONFIG_SERVICE',
		description: 'Optional - Demo env variable.',
		defaultValue: 'Hello World!',
		isRequired: false,
	},
	environment: {
		key: 'NODE_ENV',
		desc: '{string = "production"} Optional - Server environment such as "production" or "development".',
		default: 'production',
		required: false,
	},
};

export const DEFAULT_OPTIONS: ConfigManagerOptions = {
	properties: { ...DEFAULT_PROPERTIES },
};
