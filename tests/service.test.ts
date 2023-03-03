import ConfigService from '../src/ConfigService';


describe('> Test suite for class `ConfigService`:', () => {
    test('(1) - Verify interface', () => {
        const config = new ConfigService();
        // All props
        expect(config.silenceErrors).toBeFalsy();
        expect(config.logErrors).toBeFalsy();
        expect(config.logFunction).toBeUndefined();
        // All methods
        expect(typeof config.init).toBe('function');
        expect(typeof config.get).toBe('function');
        expect(typeof config.findOne).toBe('function');
        expect(typeof config.findSeveral).toBe('function');
    });

    test('(2) - Init with empty settings', () => {
        const config = new ConfigService();
        const result = config.init();

        expect(result.constructor.name).toMatch('ConfigService');
    });
});



export {};