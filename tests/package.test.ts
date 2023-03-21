/* eslint-disable @typescript-eslint/no-unused-vars */
import defaultExport from '../';
import { nodeConfigProperty, nodeConfigPropertyManager, nodeConfigService, } from '../';
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
} from '../';
import {
    testObjectPropertiesToBeDefined,
    testNodeConfigServiceExports,
    testNodeConfigServiceGetMethod
} from './lib';


let numbering = 1;

describe('Ensure the "package.json" defined entry points (dist & typos) are correct for TypeScript files using es6 import', () => {
    describe('Expect "node package" exports to be defined', () => {
        numbering = testObjectPropertiesToBeDefined({ defaultExport, nodeConfigProperty, nodeConfigPropertyManager, nodeConfigService }, numbering);
    });

    describe('Expect exported methods and interfaces', () => {
        numbering = testNodeConfigServiceExports({ defaultExport, nodeConfigProperty, nodeConfigPropertyManager, nodeConfigService }, numbering);
    });

    describe('Test nodeConfigService().get() method', () => {
        numbering = testNodeConfigServiceGetMethod(nodeConfigService, numbering);
    });

    describe('Test defaultExport().get() method', () => {
        numbering = testNodeConfigServiceGetMethod(defaultExport, numbering);
    });
});