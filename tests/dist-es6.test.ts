//import { DEFAULT_PROPERTIES } from '../src/constants';

// import NodeConfigService from '../dist/index';


// const name = 'environment';
// const envKey = 'NODE_ENV';
// const defaultValue = 'production';


// const expectConfigServiceInstance = (config) => {
// 	expect(config).toBeDefined();
// 	expect(config.constructor.name).toMatch('NodeConfigService');
// }

// const expectConfigPropertyValue = (config, find, value) => {
//     let prop = config.get(find);
// 	expect(prop).toBeDefined();
//     expect(prop).toMatch(value);
// }

// const expectConfigService = (NodeConfigService) => {
//     const config = new NodeConfigService();

//     expectConfigServiceInstance(config);

//     expectConfigPropertyValue(config, name, defaultValue);
//     expectConfigPropertyValue(config, envKey, defaultValue);
// }

describe('Test the current `dist` build', () => {


    test('(1) - Verify `dist/node-config-service.js` default export.', () => {
        //console.debug(NodeConfigService);
        //expectConfigService(NodeConfigService);
    });

    /* test('(2) - Verify `dist/node-config-service.js` named exports.', () => {
        const { NodeConfigService } = require('../dist/node-config-service.js');
        console.debug(NodeConfigService);
        //expectConfigService(NodeConfigService);
    }); */

    /* test('(3) - Verify `dist/node-config-service.min.js` default export.', () => {
        const NodeConfigService = require('../dist/node-config-service.min.js');
        expectConfigService(NodeConfigService);
    });

    test('(4) - Verify `dist/node-config-service.min.js` exports.', () => {
        const { NodeConfigService } = require('../dist/node-config-service.min.js');
        expectConfigService(NodeConfigService);
    }); */
});

export { };