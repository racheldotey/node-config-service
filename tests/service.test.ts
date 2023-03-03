import { expect, jest, test } from '@jest/globals';
import { ConfigService, IConfigService, ConfigServiceLogFunction } from '../src/ConfigService';

const NODE_ENV = {
    key: 'NODE_ENV',
    name: 'environment',
    desc: `{String} Current environment, such as 'production' or 'development'.`,
    default: 'JEST_TESTING_ENV',
    required: false,
    parse: (value: string) => value.toString().toLowerCase(),
};

const expectInterface = (config: IConfigService) => {
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

const expectConfigSettings = (
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

describe('> Test suite for class `ConfigService`:', () => {
    var config = new ConfigService();

    test('(1) - Verify interface', () => {
        expectInterface(config);
        expectConfigSettings(config);
    });

    test('(2) - Init with empty settings', () => {
        config = config.init();
        expectInterface(config);
        expectConfigSettings(config);
    });

    test('(3) - Init with empty but defined properties object', () => {
        config = new ConfigService({ properties: {} });
        expectConfigSettings(config);
        config = config.init();
        expectConfigSettings(config);
    });

    test('(4) - Init with error logging and silenceErrors, no properties', () => {
        var options = {
            silenceErrors: true,
            logErrors: true,
            logFunction: (...args: any[]) => console.debug(...args)
        };
        config = new ConfigService(options);
        expectConfigSettings(config, options);
        config = config.init();
        expectConfigSettings(config, options);
        options.silenceErrors = false;
        options.logErrors = false;
        config = new ConfigService(options);
        expectConfigSettings(config, options);
    });

    test('(5) - Init with a property definition using default values', () => {
        const properties = { NODE_ENV };
        const prop = properties.NODE_ENV;
        const value = prop.parse(prop.default);

        config = new ConfigService({ properties });
        expectInterface(config);
        expectConfigSettings(config);
        config = config.init();

        var env = config.get(prop.name);
        expect(env).toMatch(value);

        var env = config.get(prop.key);
        expect(env).toMatch(value);
    });

    test('(6) - Init with a property definition, override default value', () => {
        const properties = { NODE_ENV };
        const prop = properties.NODE_ENV;

        config = new ConfigService({ properties });
        expectInterface(config);
        expectConfigSettings(config);
        config = config.init({ [prop.key]: `${prop.default}_OVERRIDDEN` });

        const value = prop.parse(`${prop.default}_OVERRIDDEN`);

        var env = config.get(prop.name);
        expect(env).toMatch(value);

        var env = config.get(prop.key);
        expect(env).toMatch(value);
    });

});

export { };
