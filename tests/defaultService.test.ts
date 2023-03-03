import { getDefaultService } from '../src/getDefaultService';

describe('> Test suite for function `getDefaultService`:', () => {
    var config = getDefaultService();

    test('(1) - Verify the interface.', () => {
        expect(config).toBeDefined();
        expect(config.constructor.name).toMatch('ConfigService');
    });

});

export { };
