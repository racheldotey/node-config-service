import { ConfigService, IConfigService } from './ConfigService';

var defaultService: undefined | IConfigService;

export const getDefaultService = (options = {}) => {
	if (defaultService) return defaultService;

    try {
        defaultService = new ConfigService({
            properties: {
                NODE_ENV: {
                    envKey: 'environment',
                    desc: `{String} Current environment likely 'production' or 'development'.`,
                    default: 'development',
                    required: false,
                    parse: (value: string) => value.toString().toLowerCase(),
                },
            },
            ...options,
        });

        return defaultService;
    } catch (error) {
        throw new Error('Unable to initialize default config service.');
    }
};

export default getDefaultService;
