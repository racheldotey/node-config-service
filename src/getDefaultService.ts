import { ConfigService } from './ConfigService';
import { IConfigService, ConfigPropertyOptions } from './types';

import { DEFAULT_SERVICE_PROPERTIES } from './constants';

var defaultService: undefined | IConfigService;

export const getDefaultService = (options: ConfigPropertyOptions = {}) => {
	if (defaultService) return defaultService;

    try {
        defaultService = new ConfigService({
            ...DEFAULT_SERVICE_PROPERTIES,
            ...options,
        });

        return defaultService;
    } catch (error) {
        throw new Error('Unable to initialize default config service.');
    }
};