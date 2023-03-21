const defaultExport = require('../').default;
const { nodeConfigProperty, nodeConfigPropertyManager, nodeConfigService, } = require('../');
const {
    testObjectPropertiesToBeDefined,
    testNodeConfigServiceExports,
    testNodeConfigServiceGetMethod
} = require('./lib');


let numbering = 1;

describe('Ensure the "package.json" defined entry points (dist) is correct for JavaScript files using commonjs require()', () => {
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