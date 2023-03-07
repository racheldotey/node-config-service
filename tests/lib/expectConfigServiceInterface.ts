import { IConfigService } from '../../src/types';

export const expectConfigServiceInterface = (config: IConfigService) => {
	expect(config).toBeDefined();
	expect(config.constructor.name).toMatch('ConfigService');
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
