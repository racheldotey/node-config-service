import { ConfigProperty } from '../src/ConfigProperty';


describe('> Test suite for class `ConfigProperty`:', () => {
    const key = 'bird';

    test('(1) - Was the class `ConfigProperty` imported correctly', () => {
        expect(ConfigProperty).toBeDefined();
        expect(ConfigProperty.name).toMatch('ConfigProperty');
    });

    let prop = new ConfigProperty(key);

    test('(2) - Create default `new ConfigProperty()` instance', () => {
        // All props
        expect(prop).toHaveProperty('name');
        expect(prop).toHaveProperty('envKey');
        expect(prop).toHaveProperty('description');
        expect(prop).toHaveProperty('parse');
        expect(prop).toHaveProperty('isRequired');
        // Setters Getters
        expect(typeof prop.isDefined).toBe('boolean');
        // All methods
        expect(typeof prop.setValue).toBe('function');
        expect(typeof prop.isMatch).toBe('function');
    });

    test('(3) - Expect default properties', () => {
        expect(prop.name).toMatch(key);
        // envKey was not set so the name is used
        expect(prop.envKey).toMatch(key);
        expect(prop.description).toMatch('');
        // If it is undefined but not required
        expect(prop.defaultValue).toBeUndefined();
        expect(prop.isRequired).toBeFalsy();
        expect(prop.isDefined).toBeFalsy();
        // it should return undefined
        expect(prop.value).toBeUndefined();
    });

    test('(4) - Requesting undefined but not required value returns `undefined`', () => {
        expect(prop.isRequired).toBeFalsy();
        expect(prop.isDefined).toBeFalsy();
        expect(prop.value).toBeUndefined();
    });

    test('(5) - Requesting undefined and required value throws error', () => {
        // Make the prop required
        prop.isRequired = true;
        expect(prop.isRequired).toBeTruthy();
        expect(prop.isDefined).toBeFalsy();
        // It should now throw an error
        expect(() => {
            return prop.value;
        }).toThrow();
    });

    test('(6) - Set value directly. No parsing used.', () => {
        // Set the value
        prop.value = key;
        // it's now required and defined
        expect(prop.isRequired).toBeTruthy();
        expect(prop.isDefined).toBeTruthy();
        // it should be the value we set
        expect(prop.value).toMatch(key);
    });

    test('(7) - Method `unsetValue()`', () => {
        expect(prop.isRequired).toBeTruthy();
        expect(prop.isDefined).toBeTruthy();
        // Unset the value
        prop.unsetValue();
        // it's now required and defined
        expect(prop.isRequired).toBeTruthy();
        expect(prop.isDefined).toBeFalsy();
        // It should now throw an error
        expect(() => {
            return prop.value;
        }).toThrow();
    });

    test('(8) - Properties `name` and `envKey` (description options `name`, `key`, `envKey`)', () => {
        // By default the `envKey` is the same as `key`
        prop = new ConfigProperty(key);
        expect(prop.name).toMatch(key);
        expect(prop.envKey).toMatch(key);

        prop = new ConfigProperty(key, { key: `${key}_key` });
        expect(prop.name).toMatch(key);
        expect(prop.envKey).toMatch(`${key}_key`);

        prop = new ConfigProperty(key, { envKey: `${key}_envKey` });
        expect(prop.name).toMatch(key);
        expect(prop.envKey).toMatch(`${key}_envKey`);
            // `envKey` takes presentence over `key`
        prop = new ConfigProperty(key, { envKey: `${key}_envKey`, key: `${key}_key` });
        expect(prop.name).toMatch(key);
        expect(prop.envKey).toMatch(`${key}_envKey`);
    });

    test('(9) - Property `isRequired` (description options `description`, `desc`)', () => {
        const description = 'Cupcake ipsum dolor sit amet chocolate cake biscuit candy canes chupa chups.';
        const desc = 'Cupcake ipsum dolor sit amet dessert jelly-o lemon drops halvah.';
        // By default the `description` is an empty string
        prop = new ConfigProperty(key);
        expect(prop.description).toMatch('');

        prop = new ConfigProperty(key, { desc });
        expect(prop.description).toMatch(desc);

        prop = new ConfigProperty(key, { description });
        expect(prop.description).toMatch(description);
            // `envKey` takes presentence over `key`
        prop = new ConfigProperty(key, { description, desc });
        expect(prop.description).toMatch(description);
    });

    test('(10) - Property `isRequired` (constructor options `isRequired`, `required`)', () => {
        // By default the `isRequired` is false
        prop = new ConfigProperty(key);
        expect(prop.isRequired).toBeFalsy();

        // Setter
        prop.isRequired = true;
        expect(prop.isRequired).toBeTruthy();

        prop.isRequired = false;
        expect(prop.isRequired).toBeFalsy();

        // Constructor prop
        prop = new ConfigProperty(key, { isRequired: true });
        expect(prop.isRequired).toBeTruthy();

        prop = new ConfigProperty(key, { isRequired: false });
        expect(prop.isRequired).toBeFalsy();

        prop = new ConfigProperty(key, { required: true });
        expect(prop.isRequired).toBeTruthy();

        prop = new ConfigProperty(key, { required: false });
        expect(prop.isRequired).toBeFalsy();

        // `isRequired` takes presentence over `required`
        prop = new ConfigProperty(key, { required: true, isRequired: false });
        expect(prop.isRequired).toBeFalsy();

        prop = new ConfigProperty(key, { required: false, isRequired: true });
        expect(prop.isRequired).toBeTruthy();

        // Setter
        prop.isRequired = false;
        expect(prop.isRequired).toBeFalsy();

        prop.isRequired = true;
        expect(prop.isRequired).toBeTruthy();
    });

    test('(11) - Property `defaultValue` (constructor options `defaultValue`, `default`)', () => {
        const value = 'default - Config option';
        const defaultValue = 'defaultValue - Config option';
        const setterValue = 'prop.defaultValue = Set with setter';
        const resetterValue = 'prop.defaultValue = RE Set with setter';
        prop = new ConfigProperty(key);
        expect(prop.defaultValue).toBeUndefined();
        expect(prop.isRequired).toBeFalsy();
        expect(prop.isDefined).toBeFalsy();
        expect(prop.value).toBeUndefined();

        // Setter
        prop.defaultValue = setterValue;
        expect(prop.defaultValue).toMatch(setterValue);
        expect(prop.isDefined).toBeTruthy();
        // If the value is undefined, setting a default will also set the value
        expect(prop.value).toMatch(setterValue);

        prop.defaultValue = resetterValue;
        expect(prop.defaultValue).toMatch(resetterValue);
        expect(prop.isDefined).toBeTruthy();
        // Setting a default dosent change a defined value
        expect(prop.value).toMatch(setterValue);

        // `defaultValue` takes presentence over `default`
        prop = new ConfigProperty(key, { defaultValue });
        expect(prop.defaultValue).toMatch(defaultValue);
        expect(prop.isDefined).toBeTruthy();
        expect(prop.value).toMatch(defaultValue);

        prop = new ConfigProperty(key, { default: value });
        expect(prop.defaultValue).toMatch(value);
        expect(prop.isDefined).toBeTruthy();
        expect(prop.value).toMatch(value);

        prop = new ConfigProperty(key, { defaultValue, default: value });
        expect(prop.defaultValue).toMatch(defaultValue);
        expect(prop.isDefined).toBeTruthy();
        expect(prop.value).toMatch(defaultValue);
    });

    test('(12) - Property `value` (constructor options `initValue`, `value`)', () => {
        const value = 'value - Config option';
        const initValue = 'initValue - Config option';
        const setterValue = 'prop.value = Set with setter';
        prop = new ConfigProperty(key);
        expect(prop.defaultValue).toBeUndefined();
        expect(prop.isDefined).toBeFalsy();
        expect(prop.isRequired).toBeFalsy();
        expect(prop.value).toBeUndefined();

        // Setter
        prop.value = setterValue;
        expect(prop.defaultValue).toBeUndefined();
        expect(prop.isDefined).toBeTruthy();
        expect(prop.isRequired).toBeFalsy();
        expect(prop.value).toMatch(setterValue);
        // Unset the value
        prop.unsetValue();
        // it's now required and defined
        prop.isRequired = true;
        expect(prop.isRequired).toBeTruthy();
        expect(prop.isDefined).toBeFalsy();
        // It should now throw an error
        expect(() => {
            return prop.value;
        }).toThrow();

        // `initValue` takes presentence over `value`
        prop = new ConfigProperty(key, { initValue });
        expect(prop.defaultValue).toBeUndefined();
        expect(prop.isDefined).toBeTruthy();
        expect(prop.isRequired).toBeFalsy();
        expect(prop.value).toMatch(initValue);

        prop = new ConfigProperty(key, { value: value });
        expect(prop.defaultValue).toBeUndefined();
        expect(prop.isDefined).toBeTruthy();
        expect(prop.isRequired).toBeFalsy();
        expect(prop.value).toMatch(value);

        prop = new ConfigProperty(key, { initValue, value });
        expect(prop.defaultValue).toBeUndefined();
        expect(prop.isDefined).toBeTruthy();
        expect(prop.isRequired).toBeFalsy();
        expect(prop.value).toMatch(initValue);
    });

    test('(13) - Property `isDefined`', () => {
        prop = new ConfigProperty(key);
        expect(prop.isDefined).toBeFalsy();
        prop.value = key;
        expect(prop.isDefined).toBeTruthy();
        prop.unsetValue();
        expect(prop.isDefined).toBeFalsy();
        prop = new ConfigProperty(key, { defaultValue: key });
        expect(prop.isDefined).toBeTruthy();
        prop = new ConfigProperty(key, { default: key });
        expect(prop.isDefined).toBeTruthy();
        prop = new ConfigProperty(key, { initValue: key });
        expect(prop.isDefined).toBeTruthy();
        prop = new ConfigProperty(key, { value: key });
        expect(prop.isDefined).toBeTruthy();
        prop.unsetValue();
        expect(prop.isDefined).toBeFalsy();
    });

    test('(14) - Method `isMatch()`', () => {
        const key = 'cat';
        const envKey = 'DOG';

        prop = new ConfigProperty(key, { envKey });
        expect(prop.name).toMatch(key);
        expect(prop.envKey).toMatch(envKey);

        expect(prop.isMatch('')).toBeFalsy();
        expect(prop.isMatch('bunny')).toBeFalsy();
        expect(prop.isMatch('cat')).toBeTruthy();
        expect(prop.isMatch(key)).toBeTruthy();
        expect(prop.isMatch(key.toUpperCase())).toBeFalsy();
        expect(prop.isMatch('DOG')).toBeTruthy();
        expect(prop.isMatch(envKey)).toBeTruthy();
        expect(prop.isMatch(envKey.toLocaleLowerCase())).toBeFalsy();
    });

    test('(15) - Property and Method `parse` (constructor options `parse`)', () => {
        const key = 'dessert';
        const parse = (val: any) => JSON.parse(val);

        const data: { [key:string]: any } = {
            type: 'Birthday cake',
            layers: [1, 2, 3]
        };
        let dataString = JSON.stringify(data);

        prop = new ConfigProperty(key, { parse });
        expect(prop.defaultValue).toBeUndefined();
        expect(prop.isDefined).toBeFalsy();
        expect(prop.isRequired).toBeFalsy();
        expect(prop.value).toBeUndefined();

        // Set with `prop.defaultValue =` and parse
        prop.defaultValue = dataString;
        expect(prop.isDefined).toBeTruthy();
        expect(prop.defaultValue).toMatch(dataString);
        expect(JSON.stringify(prop.value)).toMatch(dataString);

        const lastDataString = '' + dataString;
        data.flavor = 'Chocolate';
        dataString = JSON.stringify(data);

        // Set with `prop.value =` and parse
        prop.value = dataString;
        expect(prop.isDefined).toBeTruthy();
        expect(prop.defaultValue).toMatch(lastDataString);
        expect(JSON.stringify(prop.value)).toMatch(dataString);

        data.filling = 'Cherry';
        dataString = JSON.stringify(data);

        // Set with constructor `initValue` and parse
        prop = new ConfigProperty(key, { parse, initValue: dataString });
        expect(prop.isDefined).toBeTruthy();
        expect(JSON.stringify(prop.value)).toMatch(dataString);

        data.topping = 'Sprinkles';
        dataString = JSON.stringify(data);

        // Set with constructor `defaultValue` and parse
        prop = new ConfigProperty(key, { parse, defaultValue: dataString });
        expect(prop.isDefined).toBeTruthy();
        expect(prop.defaultValue).toMatch(dataString);
        expect(JSON.stringify(prop.value)).toMatch(dataString);
    });
});



export { };