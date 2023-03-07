import { ConfigServiceOptions, DefinePropertyOptions } from './types';

export const DEFAULT_PROPERTY_DEFINITIONS: DefinePropertyOptions = {
	environment: {
		name: 'environment',
		envKey: 'NODE_ENV',
		desc: '{string? = "development"} Server environment such as "production" or "development".',
		default: 'development',
		required: false,
	},
};

export const DEFAULT_SERVICE_PROPERTIES: ConfigServiceOptions = {
	properties: { ...DEFAULT_PROPERTY_DEFINITIONS },
};
