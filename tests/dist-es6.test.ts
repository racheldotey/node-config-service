import defaultExport from '../dist';
import { newConfigProperty, newConfigPropertyManager, newConfigService, } from '../dist';
import {
    testObjectPropertiesToBeDefined,
    testNodeConfigServiceExports,
    testNodeConfigServiceGetMethod
} from './lib';


let numbering = 1;

describe('Ensure the "/dist" exports are correct using es6 "import" methods', () => {
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
});