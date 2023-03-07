import { expect, test } from '@jest/globals';
import { ConfigService } from '../src/ConfigService';
import { DEFAULT_PROPERTY_DEFINITIONS } from '../src/constants';
import { expectConfigServiceInterface } from './lib/expectConfigServiceInterface';
import { expectConfigServiceSettings } from './lib/expectConfigServiceSettings';


const properties = { ...DEFAULT_PROPERTY_DEFINITIONS };
const prop = DEFAULT_PROPERTY_DEFINITIONS.environment;
prop.parse = (value: string) => value.toString().toLowerCase();


describe('> Test suite for class `ConfigService`:', () => {
    var config = new ConfigService();

    var name: string = prop.name || 'environment' || '';
    var envKey: string = prop.envKey || prop.name || '';
    var defaultValue: string = prop.default || '';

    test('(Setup) - Verify default config used', () => {
        expect(name).not.toBe('');
        expect(envKey).not.toBe('');
        expect(name).not.toBe(envKey);
        expect(defaultValue).not.toBe('');
        expect(typeof prop.parse).toBe('function');
    });

    test('(1) - Verify interface', () => {
        expectConfigServiceInterface(config);
        expectConfigServiceSettings(config);
    });

    test('(2) - Init with empty settings', () => {
        config = config.init();
        expectConfigServiceInterface(config);
        expectConfigServiceSettings(config);
    });

    test('(3) - Init with empty but defined properties object', () => {
        config = new ConfigService({ properties: {} });
        expectConfigServiceSettings(config);
        config = config.init();
        expectConfigServiceSettings(config);
    });

    test('(4) - Init with error logging and silenceErrors, no properties', () => {
        var options = {
            silenceErrors: true,
            logErrors: true,
            logFunction: (...args: any[]) => console.debug(...args)
        };
        config = new ConfigService(options);
        expectConfigServiceSettings(config, options);
        config = config.init();
        expectConfigServiceSettings(config, options);
        options.silenceErrors = false;
        options.logErrors = false;
        config = new ConfigService(options);
        expectConfigServiceSettings(config, options);
    });

    test('(5) - Init with a property definition using default values', () => {
        config = new ConfigService({ properties });
        expectConfigServiceInterface(config);
        expectConfigServiceSettings(config);
        // Send a blank {} or it will default to process.env
        config = config.init({});

        var env = config.get(name);
        expect(env).toBeDefined();
        expect(env).toMatch(defaultValue);

        env = config.get(envKey);
        expect(env).toBeDefined();
        expect(env).toMatch(defaultValue);
    });

    test('(6) - Init with a property definition, override default value', () => {
        config = new ConfigService({ properties });
        expectConfigServiceInterface(config);
        expectConfigServiceSettings(config);

        var value = `${defaultValue}_OVERRIDDEN`;
        config = config.init({ [envKey]: value });

        expect(typeof prop.parse).toBe('function');
        if(prop.parse) value = prop.parse(value);

        var env = config.get(name);
        expect(env).toBeDefined();
        expect(env).toMatch(value);

        env = config.get(envKey);
        expect(env).toBeDefined();
        expect(env).toMatch(value);
    });

});

export { };
