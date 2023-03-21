const defaultExport = require('../dist').default;
const { newConfigProperty, newConfigPropertyManager, newConfigService, } = require('../dist');
const {
    testObjectPropertiesToBeDefined,
    testNodeConfigServiceExports,
    testNodeConfigServiceGetMethod
} = require('./lib');


let numbering = 1;

describe('Ensure the "/dist" exports are correct using commonjs "require" methods', () => {
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