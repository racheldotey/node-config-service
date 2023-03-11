import { NodeConfigService } from '../src/NodeConfigService';
import { DEFAULT_PROPERTIES } from '../src/constants';


describe('> Test suite for class `NodeConfigService`:', () => {
    test('(1) - Was the class `NodeConfigService` imported correctly', () => {
        expect(NodeConfigService).toBeDefined();
        expect(NodeConfigService.name).toMatch('NodeConfigService');
    });

    test('(2) - Create default `new NodeConfigService()` instance', () => {
        const service = new NodeConfigService();
        expect(service instanceof NodeConfigService).toBeTruthy();
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
        const config = new NodeConfigService();

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
