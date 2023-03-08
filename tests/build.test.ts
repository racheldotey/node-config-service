import { expectConfigManagerInterface } from './lib/expectConfigManagerInterface';
import config from '../dist/node-config-service.js';

describe('Test the current `dist` build', () => {

    console.log(JSON.parse(JSON.stringify(config)));

    test('(1) - Confirm expected module interface.', () => {
        expectConfigManagerInterface(config);
    });

    test('(2) - Confirm empty properties.', () => {
    });
});

export { };