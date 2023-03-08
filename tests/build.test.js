const { expectNodeConfigServiceInterface } = require('./lib/utils');


const expectNodeConfigServiceInstance = (config) => {
	expect(config).toBeDefined();
	expect(config.constructor.name).toMatch('NodeConfigService');
}

describe('Test the current `dist` build', () => {

    test('(1) - Verify `dist/node-config-service.js` export.', () => {
        const config = require('../dist/node-config-service.js');
        console.log(JSON.parse(JSON.stringify(config)));

        expectNodeConfigServiceInstance(config);
    });

    test('(2) - Verify `dist/node-config-service.min.js` export.', () => {
        const config = require('../dist/node-config-service.min.js');
        console.log(JSON.parse(JSON.stringify(config)));

        expectNodeConfigServiceInstance(config);
    });
});

module.exports = {};