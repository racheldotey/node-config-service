import { expect, test } from '@jest/globals';
import { ConfigManager } from '../src/ConfigManager';
import { DEFAULT_PROPERTY_DEFINITIONS } from '../src/constants';
import { expectConfigManagerInterface, expectConfigManagerSettings } from './lib/utils';


const properties = { ...DEFAULT_PROPERTY_DEFINITIONS };
const prop = DEFAULT_PROPERTY_DEFINITIONS.environment;
prop.parse = (value: string) => value.toString().toLowerCase();


describe('> Test suite for class `ConfigManager`:', () => {
    var config = new ConfigManager();

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
        expectConfigManagerInterface(config);
        expectConfigManagerSettings(config);
    });

    test('(2) - Init with empty settings', () => {
        config = config.init();
        expectConfigManagerInterface(config);
        expectConfigManagerSettings(config);
    });

    test('(3) - Init with empty but defined properties object', () => {
        config = new ConfigManager({ properties: {} });
        expectConfigManagerSettings(config);
        config = config.init();
        expectConfigManagerSettings(config);
    });

    test('(4) - Init with error logging and silenceErrors, no properties', () => {
        var options = {
            silenceErrors: true,
            logErrors: true,
            logFunction: (...args: any[]) => console.debug(...args)
        };
        config = new ConfigManager(options);
        expectConfigManagerSettings(config, options);
        config = config.init();
        expectConfigManagerSettings(config, options);
        options.silenceErrors = false;
        options.logErrors = false;
        config = new ConfigManager(options);
        expectConfigManagerSettings(config, options);
    });

    test('(5) - Init with a property definition using default values', () => {
        config = new ConfigManager({ properties });
        expectConfigManagerInterface(config);
        expectConfigManagerSettings(config);
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
        config = new ConfigManager({ properties });
        expectConfigManagerInterface(config);
        expectConfigManagerSettings(config);

        var value = `${defaultValue}_OVERRIDDEN`;
        config = config.init({ properties: { [envKey]: value } });

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
