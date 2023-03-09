import { ConfigProperty } from '../src/ConfigProperty';
import { ConfigPropertyInterface } from '../src/types';

const expectConfigProperty = (prop: ConfigPropertyInterface) => {
    // All props
    expect(prop).toHaveProperty('silenceErrors');
    expect(prop).toHaveProperty('logErrors');
    expect(prop).toHaveProperty('logFunction');
    // All methods
    expect(typeof prop.isMatch).toBe('function');
};

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



    test('(1) - Verify the interface.', () => {
        const prop = new ConfigProperty('empty_options');

        expect(prop.name).toMatch('empty_options');
        expect(prop.envKey).toMatch(prop.name);
        expect(prop.description).toMatch('');
        expect(prop.defaultValue).toBeUndefined();
        expect(prop.isRequired).toBeFalsy();
        expect(prop.isDefined).toBeFalsy();

        expect(typeof prop.isMatch).toBe('function');
    });

    test('(2) - Init with simple options.', () => {
        var prop = new ConfigProperty(key, { ...options, required: false });

        expect(prop.name).toMatch(key);
        expect(prop.envKey).toMatch(options.envKey);
        expect(prop.description).toMatch(options.desc);
        expect(prop.defaultValue).toEqual(options.default);
        expect(prop.isRequired).toBeFalsy();
        expect(prop.isDefined).toBeTruthy();

        prop = new ConfigProperty(key, { ...options, required: true });
        expect(prop.isRequired).toBeTruthy();
        expect(prop.isDefined).toBeTruthy();
    });

    test('(3) - Throw error if value is requested before being set.', () => {
        const prop = new ConfigProperty(key);

        expect(prop.isDefined).toBeFalsy();
        expect(() => prop.value).toThrow();
    });

    test('(4) - Do not throw error when value is requested if value is set in the constructor.', () => {
        const prop = new ConfigProperty(key, { ...options, value: key });

        expect(prop.isDefined).toBeTruthy();
        expect(prop.value).toMatch(key);
    });

    test('(5) - Throw error if isMatch() is called before value was set.', () => {
        const prop = new ConfigProperty(key);

        expect(prop.isDefined).toBeFalsy();
        expect(() => prop.isMatch(key)).toThrow();
    });

    test('(6) - Test isMatch() method when value is set in the constructor.', () => {
        const value = JSON.stringify({ foo: 'bar' });
        const prop = new ConfigProperty(key, { ...options, value });

        expect(prop.isDefined).toBeTruthy();
        expect(prop.isMatch('')).toBeFalsy();
        expect(prop.isMatch(options.envKey)).toBeTruthy();
        expect(prop.isMatch(key)).toBeTruthy();
        expect(prop.isMatch('dog')).toBeFalsy();
    });

    test('(7) - Set advanced value in the constructor.', () => {
        const key = 'bird';
        const options = {
            default: 'chirp chirp',
            required: true,
            value: data
        };
        const prop = new ConfigProperty(key, options);

        expect(prop.isDefined).toBeTruthy();
        expect(prop.isRequired).toBeTruthy();
        expect(prop.defaultValue).toEqual(options.default);
        expect(JSON.stringify(prop.value)).toBe(JSON.stringify(data));
    });

    test('(8) - Set value using default value and parse method.', () => {
        const key = 'bird';
        const options = {
            defaultValue: JSON.stringify(data),
            isRequired: true,
            parse: (val: string) => JSON.parse(val)
        };
        const prop = new ConfigProperty(key, options);

        expect(prop.isDefined).toBeTruthy();
        expect(prop.setValue({})).toBeUndefined();

        expect(prop.defaultValue).toEqual(options.defaultValue);
        expect(JSON.stringify(prop.value)).toBe(options.defaultValue);
    });

    test('(9) - Set value from env object. No parsing.', () => {
        const value = 'Parrots can talk.';
        const prop = new ConfigProperty(key);

        expect(prop.isRequired).toBeFalsy();
        expect(prop.isDefined).toBeFalsy();
        expect(prop.defaultValue).toBeUndefined();
        expect(() => prop.value).toThrow();
        prop.setValue({ [key]: value });
        expect(prop.isDefined).toBeTruthy();
        expect(prop.value).toBe(value);
    });

    test('(10) - Set value from env object with parsing.', () => {
        const key = 'bird';
        const options = {
            envKey: 'BIRD',
            desc: 'Have you herd the word?',
            default: JSON.stringify({ type: 'Pie' }),
            required: true,
            parse: (val: string) => JSON.parse(val)
        };
        const value = JSON.stringify({
            type: 'Birthday cake',
            flavor: 'Chocolate',
            filling: 'Cherry',
            layers: [1, 2, 3],
            id: 12344457777890
        });
        const prop = new ConfigProperty(key, options);

        expect(prop.defaultValue).toEqual(options.default);
        expect(prop.isDefined).toBeTruthy();
        expect(JSON.stringify(prop.value)).toBe(options.default);

        prop.setValue({ [options.envKey]: value });
        expect(prop.isDefined).toBeTruthy();
        expect(JSON.stringify(prop.value)).toBe(value);
    });

    test('(11) - Throw error if setValue() cannot find its key when the property isRequired', () => {
        const key = 'bird';
        const options = {
            required: true
        };
        const prop = new ConfigProperty(key, options);

        expect(prop.isDefined).toBeFalsy();
        expect(prop.isRequired).toBeTruthy();

        expect(() => prop.setValue({})).toThrow();
    });
});



export { };