import { expect, test } from '@jest/globals';
import { ConfigService } from '../src/ConfigService';
import { expectConfigServiceInterface } from './lib/expectConfigServiceInterface';
import { expectConfigServiceSettings } from './lib/expectConfigServiceSettings';

const NODE_ENV = {
    envKey: 'NODE_ENV',
    name: 'environment',
    desc: `{String} Current environment, such as 'production' or 'development'.`,
    default: 'JEST_TESTING_ENV',
    required: false,
    parse: (value: string) => value.toString().toLowerCase(),
};

describe('> Test suite for class `ConfigService`:', () => {
    var config = new ConfigService();

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
        const properties = { NODE_ENV };
        const prop = properties.NODE_ENV;
        const value = prop.parse(prop.default);

        config = new ConfigService({ properties });
        expectConfigServiceInterface(config);
        expectConfigServiceSettings(config);
        config = config.init();

        var env = config.get(prop.name);
        expect(env).toBeDefined();
        expect(env).toMatch(value);

        env = config.get(prop.key);
        expect(env).toBeDefined();
        expect(env).toMatch(value);
    });

    test('(6) - Init with a property definition, override default value', () => {
        const properties = { NODE_ENV };
        const prop = properties.NODE_ENV;

        config = new ConfigService({ properties });
        expectConfigServiceInterface(config);
        expectConfigServiceSettings(config);
        config = config.init({ [prop.key]: `${prop.default}_OVERRIDDEN` });

        const value = prop.parse(`${prop.default}_OVERRIDDEN`);

        console.debug(value)
        var env = config.get(prop.name);
        console.debug(env)
        expect(env).toBeDefined();
        //expect(env).toMatch(value);

        env = config.get(prop.key);
        expect(env).toBeDefined();
        //expect(env).toMatch(value);
    });

});

export { };
