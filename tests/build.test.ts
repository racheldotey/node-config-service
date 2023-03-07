import { expectConfigServiceInterface } from './lib/expectConfigServiceInterface';
import config from '../dist';

describe('Test the current `dist` build', () => {

    test('(1) - Confirm expected module interface.', () => {
        expectConfigServiceInterface(config);
    });
});

export { };