const defaultExport = require('../dist').default;
const { newConfigProperty, newConfigPropertyManager, newConfigService, } = require('../dist');
const {
    testObjectPropertiesToBeDefined,
    testNodeConfigServiceExports,
    testNodeConfigServiceGetMethod
} = require('./lib');


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