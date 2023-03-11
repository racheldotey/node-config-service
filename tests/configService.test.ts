import { ConfigService } from '../src/ConfigService';
import { DEFAULT_PROPERTIES } from '../src/constants';


describe('> Test suite for class `ConfigService`:', () => {
    test('(1) - Was the class `ConfigService` imported correctly', () => {
        expect(ConfigService).toBeDefined();
        expect(ConfigService.name).toMatch('ConfigService');
    });

    test('(2) - Create default `new ConfigService()` instance', () => {
        const service = new ConfigService();
        expect(service instanceof ConfigService).toBeTruthy();
        // All methods
        expect(typeof service.init).toBe('function');
        expect(typeof service.loadEnv).toBe('function');
        expect(typeof service.getConfig).toBe('function');

        // Inherited methods
        expect(service).toHaveProperty('silenceErrors');
        expect(service).toHaveProperty('logErrors');
        expect(service).toHaveProperty('logFunction');
        // All methods
        expect(typeof service.init).toBe('function');
        expect(typeof service.get).toBe('function');
        expect(typeof service.findOne).toBe('function');
        expect(typeof service.findSeveral).toBe('function');
    });

    test('(3) -Default properties', () => {
        const config = new ConfigService();

        expect(config.silenceErrors).toBeFalsy();
        expect(config.logErrors).toBeFalsy();
        expect(config.logFunction).toBeUndefined();

        expect(config.length).toBe(Object.keys(DEFAULT_PROPERTIES).length);

        Object.keys(DEFAULT_PROPERTIES).forEach(name => {
            const val = config.get(name);
            expect(val).toBeDefined()
        });
    });
});

module.exports = {};
