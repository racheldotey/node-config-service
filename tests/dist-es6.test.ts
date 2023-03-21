/* eslint-disable @typescript-eslint/no-unused-vars */
import defaultExport from '../dist';
import { newConfigProperty, newConfigPropertyManager, newConfigService, } from '../dist';
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
} from '../dist';
import {
    testObjectPropertiesToBeDefined,
    testNodeConfigServiceExports,
    testNodeConfigServiceGetMethod
} from './lib';


let numbering = 1;

describe('Expect "dist" exports to be defined', () => {
    numbering = testObjectPropertiesToBeDefined({ defaultExport, newConfigProperty, newConfigPropertyManager, newConfigService }, numbering);
});

describe('Expect exported methods and interfaces', () => {
    numbering = testNodeConfigServiceExports({ defaultExport, newConfigProperty, newConfigPropertyManager, newConfigService }, numbering);
});

describe('Test newConfigService().get() method', () => {
    numbering = testNodeConfigServiceGetMethod(newConfigService, numbering);
});

describe('Test defaultExport().get() method', () => {
    numbering = testNodeConfigServiceGetMethod(defaultExport, numbering);
});

module.exports = {};

export { };