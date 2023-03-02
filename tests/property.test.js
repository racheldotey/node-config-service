require('dotenv').config({ path: './test.basic.env' });
const ConfigProperty = require('../src/ConfigProperty');


describe('> Test suite for class `ConfigProperty`:', () => {
    const key = 'bird';
    const options = {
        envKey: 'BIRD',
        desc: 'Have you herd the word?',
        default: 'word'
    };
    const data = {
        type: 'Birthday cake',
        flavor: 'Chocolate',
        filling: 'Cherry',
        layers: [1, 2, 3],
        sing: () => console.log('HAPPY BIRTHDAY!')
    };

    test('(1) - Init with empty options.', () => {
        const prop = new ConfigProperty('empty_options');

        expect(prop.name).toMatch('empty_options');
        expect(prop.envKey).toBeFalsy();
        expect(prop.desc).toMatch('');
        expect(prop.default).toBeUndefined();
        expect(prop.isRequired).toBeTruthy();
        expect(prop.isDefined).toBeFalsy();
    });

    test('(2) - Init with simple options.', () => {
        var prop = new ConfigProperty(key, { ...options, required: false });

        expect(prop.name).toMatch(key);
        expect(prop.envKey).toMatch(options.envKey);
        expect(prop.desc).toMatch(options.desc);
        expect(prop.default).toEqual(options.default);
        expect(prop.isRequired).toBeFalsy();
        expect(prop.isDefined).toBeFalsy();

        prop = new ConfigProperty(key, { ...options, required: true });
        expect(prop.isRequired).toBeTruthy();
    });

    test('(3) - Throw error if value is requested before being set.', () => {
        const prop = new ConfigProperty(key);

        expect(prop.isDefined).toBeFalsy();
        expect(() => prop.value).toThrow();
    });

    test('(3) - Do not throw error when value is requested if value is set in the constructor.', () => {
        const prop = new ConfigProperty(key, { ...options, value: key });

        expect(prop.isDefined).toBeTruthy();
        expect(prop.value).toMatch(key);
    });

    test('(4) - Throw error if isMatch() is called before value was set.', () => {
        const prop = new ConfigProperty(key);

        expect(prop.isDefined).toBeFalsy();
        expect(() => prop.isMatch()).toThrow();
    });

    test('(5) - Test isMatch() method when value is set in the constructor.', () => {
        const value = { foo: 'bar' };
        const prop = new ConfigProperty(key, { ...options, value });

        expect(prop.isDefined).toBeTruthy();
        expect(prop.isMatch()).toBeFalsy();
        expect(prop.isMatch(options.envKey)).toBeTruthy();
        expect(prop.isMatch(key)).toBeTruthy();
        expect(prop.isMatch('dog')).toBeFalsy();
    });

    test('(6) - Set advanced value in the constructor.', () => {
        const prop = new ConfigProperty(key, { ...options, value: data });

        expect(prop.isDefined).toBeTruthy();
        expect(prop.isRequired).toBeTruthy();
        expect(prop.default).toEqual(options.default);
        expect(JSON.stringify(prop.value)).toBe(JSON.stringify(data));
    });

    test('(7) - Set value using default value and parse method.', () => {
        const defaultValue = JSON.stringify(data);
        const prop = new ConfigProperty(key, { ...options, default: defaultValue, parse: prop => JSON.parse(prop) });

        expect(prop.isDefined).toBeFalsy();

        prop.setValue({});

        expect(prop.isDefined).toBeTruthy();
        expect(prop.isRequired).toBeTruthy();
        expect(prop.default).toEqual(defaultValue);
        expect(JSON.stringify(prop.value)).toBe(defaultValue);
    });

    test('(8) - Set value from env object. No parsing.', () => {
        const prop = new ConfigProperty(key, options);

        expect(prop.isDefined).toBeFalsy();

        prop.setValue({ [options.envKey]: 'Parrots can talk.' });

        expect(prop.isDefined).toBeTruthy();
        expect(prop.isRequired).toBeTruthy();
        expect(prop.default).toEqual(options.default);
        expect(prop.value).toBe('Parrots can talk.');

    });

    test('(9) - Set value from env object with parsing.', () => {
        const value = JSON.stringify(data);
        const prop = new ConfigProperty(key, { envKey: options.envKey, parse: prop => JSON.parse(prop) });

        expect(prop.isDefined).toBeFalsy();
        expect(prop.isRequired).toBeTruthy();

        prop.setValue({ [options.envKey]: value });

        expect(prop.isDefined).toBeTruthy();
        expect(JSON.stringify(prop.value)).toBe(value);
    });

    test('(10) - Throw error if setValue() cannot find its key when the property isRequired', () => {
        const prop = new ConfigProperty(key, { envKey: options.envKey });

        expect(prop.isDefined).toBeFalsy();
        expect(prop.isRequired).toBeTruthy();

        expect(() => prop.setValue({})).toThrow();
    });
});