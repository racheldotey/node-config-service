require('dotenv').config({ path: './test.basic.env' });
const path = require('path');
const ConfigProperty = require('../src/ConfigProperty');


describe('TESTING CLASS `ConfigProperty`', () => {
    const key = 'bird';
    const options = {
        envKey: 'BIRD',
        desc: 'Have you herd the word?',
        default: 'word',
        required: true
    };

    test('ConfigProperty Test - Empty options', () => {
        const prop = new ConfigProperty('empty_options');
        console.debug('ConfigProperty Test - Empty options', '\n\r\n\r', prop);
        expect(prop.name).toMatch('empty_options');
        expect(prop.envKey).toBeFalsy();
        expect(prop.desc).toMatch('');
        expect(prop.default).toBeUndefined();
        expect(prop.isRequired).toBeFalsy();
        expect(prop.isDefined).toBeFalsy();
        expect(() => prop.value).toThrow();
        expect(() => prop.isMatch()).toThrow();
    });

    test('ConfigProperty Test - Simple options', () => {
        const prop = new ConfigProperty(key, options);
        console.debug('ConfigProperty Test - Simple options', '\n\r\n\r', prop);
        expect(prop.name).toMatch(key);
        expect(prop.envKey).toMatch(options.envKey);
        expect(prop.desc).toMatch(options.desc);
        expect(prop.default).toEqual(options.default);
        expect(prop.isRequired).toEqual(options.required);
        expect(prop.isDefined).toBeFalsy();
        expect(() => prop.value).toThrow();
        expect(() => prop.isMatch()).toThrow();
    });

    test('ConfigProperty Test - Force value', () => {
        const value = { flavor: 'carrot', filling: 'cream cheese' };
        const prop = new ConfigProperty(key, { ...options, value });
        expect(prop.default).toEqual(options.default);
        expect(prop.isDefined).toBeTruthy();
        expect(JSON.stringify(prop.value)).toBe(JSON.stringify(value));
        console.debug('ConfigProperty Test - Force value', '\n\r\n\r', {
            name: prop.name,
            default: prop.default,
            isDefined: prop.isDefined,
            value: prop.value
        });
    });

    test('ConfigProperty Test - isMatch()', () => {
        const value = { foo: 'bar' };
        const prop = new ConfigProperty(key, { ...options, value });
        console.debug('ConfigProperty Test - isMatch()', '\n\r\n\r', {
            name: prop.name,
            envKey: prop.envKey
        });
        expect(prop.isMatch(options.envKey)).toBeTruthy();
        expect(prop.isMatch(key)).toBeTruthy();
        expect(prop.isMatch('dog')).toBeFalsy();
    });

    test('ConfigProperty Test - Simple parse', () => {
        const value = JSON.stringify({ flavor: 'chocolate', filling: 'cherry' });
        const prop = new ConfigProperty(key, { ...options, default: value, parse: value => JSON.parse(value) });
        prop.value = {};
        console.debug('ConfigProperty Test - Force value', '\n\r\n\r', {
            name: prop.name,
            default: prop.default,
            isDefined: prop.isDefined,
            value: prop.value
        });
    });

    test('ConfigProperty Test - API_URL', () => {
        const options = {
            envKey: 'API_URL',
            desc: 'Node.js process environment variable API_URL',
            default: 'production',
            required: true
        };
        const prop = new ConfigProperty('environment', options);
        prop.value = process.env;
        console.debug('ConfigProperty Test - API_URL', '\n\r\n\r', {
            name: prop.name,
            default: prop.default,
            isDefined: prop.isDefined,
            value: prop.value
        });
    });

});