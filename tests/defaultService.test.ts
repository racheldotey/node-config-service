import { expectConfigServiceInterface } from './lib/expectConfigServiceInterface';
import { getDefaultService } from '../src/getDefaultService';

describe('> Test suite for function `getDefaultService`:', () => {
    var config = getDefaultService();

    test('(1) - Verify the interface.', () => {
        expectConfigServiceInterface(config);
    });

});

export { };
