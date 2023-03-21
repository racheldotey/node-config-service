/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
    ConfigProperty,
    ConfigPropertyOptions,
    ConfigPropertyParseValueMethod,
    ConfigPropertyParsedValue,
    ConfigPropertyValue,
    ConfigOnErrorCallback,
    ConfigPropertyDefinitionsArray,
    ConfigPropertyDefinitionsMap,
    ConfigPropertyManager,
    ConfigPropertyManagerOptions,
    ConfigService,
} from '../types';

describe('Ensure the "/types" exports are correct', () => {
    test('Expect "types" exports to be defined, will likely fail from TypeScript instead of Jest.', () => {
        // Types
        type testConfigProperty = ConfigProperty;
        type testConfigPropertyOptions = ConfigPropertyOptions;
        type testConfigPropertyParseValueMethod = ConfigPropertyParseValueMethod;
        type testConfigPropertyParsedValue = ConfigPropertyParsedValue;
        type testConfigPropertyValue = ConfigPropertyValue;
        type testConfigOnErrorCallback = ConfigOnErrorCallback;
        type testConfigPropertyDefinitionsArray = ConfigPropertyDefinitionsArray;
        type testConfigPropertyDefinitionsMap = ConfigPropertyDefinitionsMap;
        type testConfigPropertyManager = ConfigPropertyManager;
        type testConfigPropertyManagerOptions = ConfigPropertyManagerOptions;

        // Interfaces
        interface testConfigService extends ConfigService { }
    })
});