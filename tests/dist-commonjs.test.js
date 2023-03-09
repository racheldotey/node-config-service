const { DEFAULT_PROPERTY_DEFINITIONS } = require('../src/constants');


const prop = DEFAULT_PROPERTY_DEFINITIONS.environment;
const name = prop.name || 'environment' || '';
const envKey = prop.envKey || prop.name || '';
const defaultValue = prop.default || '';



const expectConfigServiceInstance = (config) => {
	expect(config).toBeDefined();
	expect(config.constructor.name).toMatch('ConfigService');
}

const expectConfigPropertyValue = (config, find, value) => {
    var prop = config.get(find);
	expect(prop).toBeDefined();
    expect(prop).toMatch(value);
}

const expectConfigService = (ConfigService) => {
    const config = new ConfigService();

    expectConfigServiceInstance(config);

    expectConfigPropertyValue(config, name, defaultValue);
    expectConfigPropertyValue(config, envKey, defaultValue);
}


describe('Test the current `dist` build', () => {

    test('(1) - Verify `dist/index.js` default export.', () => {
        const ConfigService = require('../dist/index');
        //console.debug(ConfigService);
        //expectConfigService(ConfigService);
    });

    /* test('(2) - Verify `dist/index.js` named exports.', () => {
        const { ConfigService } = require('../dist/index.js');
        console.debug(ConfigService);
        //expectConfigService(ConfigService);
    }); */

    /* test('(3) - Verify `dist/index.min.js` default export.', () => {
        const ConfigService = require('../dist/index.min.js');
        expectConfigService(ConfigService);
    });

    test('(4) - Verify `dist/index.min.js` exports.', () => {
        const { ConfigService } = require('../dist/index.min.js');
        expectConfigService(ConfigService);
    }); */

});

module.exports = {};