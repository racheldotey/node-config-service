const defaultExport = require('../').default;
const { newConfigProperty, newConfigPropertyManager, newConfigService, } = require('../');
const {
    testObjectPropertiesToBeDefined,
    testNodeConfigServiceExports,
    testNodeConfigServiceGetMethod
} = require('./lib');


let numbering = 1;

describe('Ensure the "package.json" defined entry points (dist) is correct for JavaScript files using commonjs require()', () => {
    describe('Expect "node package" exports to be defined', () => {
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