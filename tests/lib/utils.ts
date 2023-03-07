import { IConfigService, ConfigServiceLogFunction } from '../../src/types';


const expectConfigServiceProps = (config: IConfigService) => {
	// All props
	expect(config).toHaveProperty('silenceErrors');
	expect(config).toHaveProperty('logErrors');
	expect(config).toHaveProperty('logFunction');
	// All methods
	expect(typeof config.init).toBe('function');
	expect(typeof config.get).toBe('function');
	expect(typeof config.findOne).toBe('function');
	expect(typeof config.findSeveral).toBe('function');
};

export const expectConfigServiceInterface = (config: IConfigService) => {
	expect(config).toBeDefined();
	expect(config.constructor.name).toMatch('ConfigService');
	expectConfigServiceProps(config);
};

export const expectNodeConfigServiceInterface = (config: IConfigService) => {
	expect(config).toBeDefined();
	// expect(config.constructor.name).toMatch('NodeConfigService');
	expectConfigServiceProps(config);
};

export const expectConfigServiceSettings = (
    config: IConfigService,
    {
        silenceErrors,
        logErrors,
        logFunction,
    }: { silenceErrors?: boolean; logErrors?: boolean; logFunction?: ConfigServiceLogFunction } = {}
) => {
    if (silenceErrors) {
        expect(config.silenceErrors).toBeTruthy();
    } else {
        expect(config.silenceErrors).toBeFalsy();
    }

    if (logErrors) {
        expect(config.logErrors).toBeTruthy();
    } else {
        expect(config.logErrors).toBeFalsy();
    }

    if (logFunction) {
        expect(typeof config.logFunction).toBe('function');
    } else {
        expect(config.logFunction).toBeUndefined();
    }
};
