import { DEFAULT_OPTIONS, DEFAULT_PROPERTIES } from './constants';


describe('Expect constants file exports', () => {
    it('(1) - Expect DEFAULT_PROPERTIES to define a "environment" config property', () => {
        expect(DEFAULT_PROPERTIES).toBeDefined();
        expect(DEFAULT_PROPERTIES).toHaveProperty('environment');
    });

    it('(2) - Expect DEFAULT_OPTIONS to define config "properties" that match DEFAULT_PROPERTIES', () => {
        expect(DEFAULT_OPTIONS).toBeDefined();
        expect(DEFAULT_OPTIONS).toHaveProperty('properties');
        expect(JSON.stringify(DEFAULT_OPTIONS.properties)).toMatch(JSON.stringify(DEFAULT_PROPERTIES));
    });
});