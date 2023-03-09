//import { DEFAULT_PROPERTY_DEFINITIONS } from '../src/constants';

import ConfigService from '../dist/index';


const name = 'environment';
const envKey = 'NODE_ENV';
const defaultValue = 'production';


// const expectConfigServiceInstance = (config) => {
// 	expect(config).toBeDefined();
// 	expect(config.constructor.name).toMatch('ConfigService');
// }

// const expectConfigPropertyValue = (config, find, value) => {
//     var prop = config.get(find);
// 	expect(prop).toBeDefined();
//     expect(prop).toMatch(value);
// }

// const expectConfigService = (ConfigService) => {
//     const config = new ConfigService();

//     expectConfigServiceInstance(config);

//     expectConfigPropertyValue(config, name, defaultValue);
//     expectConfigPropertyValue(config, envKey, defaultValue);
// }

describe('Test the current `dist` build', () => {


    test('(1) - Verify `dist/node-config-service.js` default export.', () => {
        //console.debug(ConfigService);
        //expectConfigService(ConfigService);
    });

    /* test('(2) - Verify `dist/node-config-service.js` named exports.', () => {
        const { ConfigService } = require('../dist/node-config-service.js');
        console.debug(ConfigService);
        //expectConfigService(ConfigService);
    }); */

    /* test('(3) - Verify `dist/node-config-service.min.js` default export.', () => {
        const ConfigService = require('../dist/node-config-service.min.js');
        expectConfigService(ConfigService);
    });

    test('(4) - Verify `dist/node-config-service.min.js` exports.', () => {
        const { ConfigService } = require('../dist/node-config-service.min.js');
        expectConfigService(ConfigService);
    }); */
});

export { };