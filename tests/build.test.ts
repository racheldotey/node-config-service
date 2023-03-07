import { expectConfigServiceInterface } from './lib/expectConfigServiceInterface';
import config from '../dist/node-config-service.js';

describe('Test the current `dist` build', () => {

    console.log(JSON.parse(JSON.stringify(config)));

    test('(1) - Confirm expected module interface.', () => {
        expectConfigServiceInterface(config);
    });

    test('(2) - Confirm empty properties.', () => {
    });
});

export { };