const { expectNodeConfigServiceInterface } = require('./lib/utils');
const { DEFAULT_PROPERTY_DEFINITIONS } = require('../src/constants');


const prop = DEFAULT_PROPERTY_DEFINITIONS.environment;
const name = prop.name || 'environment' || '';
const envKey = prop.envKey || prop.name || '';
const defaultValue = prop.default || '';



const expectNodeConfigServiceInstance = (config) => {
	expect(config).toBeDefined();
	expect(config.constructor.name).toMatch('NodeConfigService');
}

const expectConfigPropertyValue = (config, find, value) => {
    var prop = config.get(find);
	expect(prop).toBeDefined();
    expect(prop).toMatch(value);
}

const expectNodeConfigService = (NodeConfigService) => {
    const config = new NodeConfigService();

    expectNodeConfigServiceInstance(config);

    expectConfigPropertyValue(config, name, defaultValue);
    expectConfigPropertyValue(config, envKey, defaultValue);
}


describe('Test the current `dist` build', () => {

    test('(1) - Verify `dist/node-config-service.js` default export.', () => {
        const NodeConfigService = require('../index.js');
        console.debug(NodeConfigService);
        //expectNodeConfigService(NodeConfigService);
    });

    /* test('(2) - Verify `dist/node-config-service.js` named exports.', () => {
        const { NodeConfigService } = require('../dist/node-config-service.js');
        console.debug(NodeConfigService);
        //expectNodeConfigService(NodeConfigService);
    }); */

    /* test('(3) - Verify `dist/node-config-service.min.js` default export.', () => {
        const NodeConfigService = require('../dist/node-config-service.min.js');
        expectNodeConfigService(NodeConfigService);
    });

    test('(4) - Verify `dist/node-config-service.min.js` exports.', () => {
        const { NodeConfigService } = require('../dist/node-config-service.min.js');
        expectNodeConfigService(NodeConfigService);
    }); */

});

module.exports = {};