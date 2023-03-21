import { expectConfigProperty } from './lib';
import { newConfigProperty } from '../src/property';
import type {
  ConfigProperty,
  ConfigPropertyOptions,
  ConfigPropertyParseValueMethod,
  ConfigPropertyParsedValue,
  ConfigPropertyValue
} from '../src/property';


const testData = {
  key: 'bird'
};



describe('Expect "property" exports to be defined', () => {
  test('(1) - Expect file exports { newConfigProperty }', () => {
    expect(newConfigProperty).toBeDefined();
    expect(typeof newConfigProperty).toBe('function');
  });
});

describe('newConfigProperty()', () => {
  let property;

  beforeAll(() => {
    property = newConfigProperty(testData.key);
  });

  test('(2) - Expect return value of a Config Property object', () => {
    expectConfigProperty(property);
  });

  test('(3) - Expect default properties', () => {
    expect(property.name).toMatch(testData.key);
    // envKey was not set so the name is used
    expect(property.envKey).toMatch(testData.key);
    expect(property.description).toMatch('');
    // If it is undefined but not required
    expect(property.defaultValue).toBeUndefined();
    expect(property.isRequired).toBeFalsy();
    expect(property.isDefined).toBeFalsy();
    // it should return undefined
    expect(property.value).toBeUndefined();
  });

  test('(4) - Requesting undefined but not required value returns `undefined`', () => {
    expect(property.isRequired).toBeFalsy();
    expect(property.isDefined).toBeFalsy();
    expect(property.value).toBeUndefined();
  });

  test('(5) - Requesting undefined and required value throws error', () => {
    // Make the property required
    property.isRequired = true;
    expect(property.isRequired).toBeTruthy();
    expect(property.isDefined).toBeFalsy();
    // It should now throw an error
    expect(() => {
      return property.value;
    }).toThrow();
  });

  test('(6) - Set value directly. No parsing used.', () => {
    // Set the value
    property.value = testData.key;
    // it's now required and defined
    expect(property.isRequired).toBeTruthy();
    expect(property.isDefined).toBeTruthy();
    // it should be the value we set
    expect(property.value).toMatch(testData.key);
  });

  test('(7) - Method `unsetValue()`', () => {
    expect(property.isRequired).toBeTruthy();
    expect(property.isDefined).toBeTruthy();
    // Unset the value
    property.unsetValue();
    // it's now required and defined
    expect(property.isRequired).toBeTruthy();
    expect(property.isDefined).toBeFalsy();
    // It should now throw an error
    expect(() => {
      return property.value;
    }).toThrow();
  });

  test('(8) - Properties `name` and `envKey` (description options `name`, `testData.key`, `envKey`)', () => {
    // By default the `envKey` is the same as `testData.key`
    property = newConfigProperty(testData.key);
    expect(property.name).toMatch(testData.key);
    expect(property.envKey).toMatch(testData.key);

    property = newConfigProperty(testData.key, { key: `${testData.key}_key` });
    expect(property.name).toMatch(testData.key);
    expect(property.envKey).toMatch(`${testData.key}_key`);

    property = newConfigProperty(testData.key, { envKey: `${testData.key}_envKey` });
    expect(property.name).toMatch(testData.key);
    expect(property.envKey).toMatch(`${testData.key}_envKey`);
    // `envKey` takes presentence over `testData.key`
    property = newConfigProperty(testData.key, { envKey: `${testData.key}_envKey`, key: `${testData.key}_key` });
    expect(property.name).toMatch(testData.key);
    expect(property.envKey).toMatch(`${testData.key}_envKey`);
  });

  test('(9) - Property `isRequired` (description options `description`, `desc`)', () => {
    const description = 'Cupcake ipsum dolor sit amet chocolate cake biscuit candy canes chupa chups.';
    const desc = 'Cupcake ipsum dolor sit amet dessert jelly-o lemon drops halvah.';
    // By default the `description` is an empty string
    property = newConfigProperty(testData.key);
    expect(property.description).toMatch('');

    property = newConfigProperty(testData.key, { desc });
    expect(property.description).toMatch(desc);

    property = newConfigProperty(testData.key, { description });
    expect(property.description).toMatch(description);
    // `envKey` takes presentence over `testData.key`
    property = newConfigProperty(testData.key, { description, desc });
    expect(property.description).toMatch(description);
  });

  test('(10) - Property `isRequired` (constructor options `isRequired`, `required`)', () => {
    // By default the `isRequired` is false
    property = newConfigProperty(testData.key);
    expect(property.isRequired).toBeFalsy();

    // Setter
    property.isRequired = true;
    expect(property.isRequired).toBeTruthy();

    property.isRequired = false;
    expect(property.isRequired).toBeFalsy();

    // Constructor property
    property = newConfigProperty(testData.key, { isRequired: true });
    expect(property.isRequired).toBeTruthy();

    property = newConfigProperty(testData.key, { isRequired: false });
    expect(property.isRequired).toBeFalsy();

    property = newConfigProperty(testData.key, { required: true });
    expect(property.isRequired).toBeTruthy();

    property = newConfigProperty(testData.key, { required: false });
    expect(property.isRequired).toBeFalsy();

    // `isRequired` takes presentence over `required`
    property = newConfigProperty(testData.key, { required: true, isRequired: false });
    expect(property.isRequired).toBeFalsy();

    property = newConfigProperty(testData.key, { required: false, isRequired: true });
    expect(property.isRequired).toBeTruthy();

    // Setter
    property.isRequired = false;
    expect(property.isRequired).toBeFalsy();

    property.isRequired = true;
    expect(property.isRequired).toBeTruthy();
  });

  test('(11) - Property `defaultValue` (constructor options `defaultValue`, `default`)', () => {
    const value = 'default - Config option';
    const defaultValue = 'defaultValue - Config option';
    const setterValue = 'property.defaultValue = Set with setter';
    const resetterValue = 'property.defaultValue = RE Set with setter';
    property = newConfigProperty(testData.key);
    expect(property.defaultValue).toBeUndefined();
    expect(property.isRequired).toBeFalsy();
    expect(property.isDefined).toBeFalsy();
    expect(property.value).toBeUndefined();

    // Setter
    property.defaultValue = setterValue;
    expect(property.defaultValue).toMatch(setterValue);
    expect(property.isDefined).toBeTruthy();
    // If the value is undefined, setting a default will also set the value
    expect(property.value).toMatch(setterValue);

    property.defaultValue = resetterValue;
    expect(property.defaultValue).toMatch(resetterValue);
    expect(property.isDefined).toBeTruthy();
    // Setting a default dosent change a defined value
    expect(property.value).toMatch(setterValue);

    // `defaultValue` takes presentence over `default`
    property = newConfigProperty(testData.key, { defaultValue });
    expect(property.defaultValue).toMatch(defaultValue);
    expect(property.isDefined).toBeTruthy();
    expect(property.value).toMatch(defaultValue);

    property = newConfigProperty(testData.key, { default: value });
    expect(property.defaultValue).toMatch(value);
    expect(property.isDefined).toBeTruthy();
    expect(property.value).toMatch(value);

    property = newConfigProperty(testData.key, { defaultValue, default: value });
    expect(property.defaultValue).toMatch(defaultValue);
    expect(property.isDefined).toBeTruthy();
    expect(property.value).toMatch(defaultValue);
  });

  test('(12) - Property `value` (constructor options `initValue`, `value`)', () => {
    const value = 'value - Config option';
    const initValue = 'initValue - Config option';
    const setterValue = 'property.value = Set with setter';
    property = newConfigProperty(testData.key);
    expect(property.defaultValue).toBeUndefined();
    expect(property.isDefined).toBeFalsy();
    expect(property.isRequired).toBeFalsy();
    expect(property.value).toBeUndefined();

    // Setter
    property.value = setterValue;
    expect(property.defaultValue).toBeUndefined();
    expect(property.isDefined).toBeTruthy();
    expect(property.isRequired).toBeFalsy();
    expect(property.value).toMatch(setterValue);
    // Unset the value
    property.unsetValue();
    // it's now required and defined
    property.isRequired = true;
    expect(property.isRequired).toBeTruthy();
    expect(property.isDefined).toBeFalsy();
    // It should now throw an error
    expect(() => {
      return property.value;
    }).toThrow();

    // `initValue` takes presentence over `value`
    property = newConfigProperty(testData.key, { initValue });
    expect(property.defaultValue).toBeUndefined();
    expect(property.isDefined).toBeTruthy();
    expect(property.isRequired).toBeFalsy();
    expect(property.value).toMatch(initValue);

    property = newConfigProperty(testData.key, { value: value });
    expect(property.defaultValue).toBeUndefined();
    expect(property.isDefined).toBeTruthy();
    expect(property.isRequired).toBeFalsy();
    expect(property.value).toMatch(value);

    property = newConfigProperty(testData.key, { initValue, value });
    expect(property.defaultValue).toBeUndefined();
    expect(property.isDefined).toBeTruthy();
    expect(property.isRequired).toBeFalsy();
    expect(property.value).toMatch(initValue);
  });

  test('(13) - Property `isDefined`', () => {
    property = newConfigProperty(testData.key);
    expect(property.isDefined).toBeFalsy();
    property.value = testData.key;
    expect(property.isDefined).toBeTruthy();
    property.unsetValue();
    expect(property.isDefined).toBeFalsy();
    property = newConfigProperty(testData.key, { defaultValue: testData.key });
    expect(property.isDefined).toBeTruthy();
    property = newConfigProperty(testData.key, { default: testData.key });
    expect(property.isDefined).toBeTruthy();
    property = newConfigProperty(testData.key, { initValue: testData.key });
    expect(property.isDefined).toBeTruthy();
    property = newConfigProperty(testData.key, { value: testData.key });
    expect(property.isDefined).toBeTruthy();
    property.unsetValue();
    expect(property.isDefined).toBeFalsy();
  });

  test('(14) - Method `isMatch()`', () => {
    const key = 'cat';
    const envKey = 'DOG';

    property = newConfigProperty(key, { envKey });
    expect(property.name).toMatch(key);
    expect(property.envKey).toMatch(envKey);

    expect(property.isMatch('')).toBeFalsy();
    expect(property.isMatch('bunny')).toBeFalsy();
    expect(property.isMatch('cat')).toBeTruthy();
    expect(property.isMatch(key)).toBeTruthy();
    expect(property.isMatch(key.toUpperCase())).toBeFalsy();
    expect(property.isMatch('DOG')).toBeTruthy();
    expect(property.isMatch(envKey)).toBeTruthy();
    expect(property.isMatch(envKey.toLocaleLowerCase())).toBeFalsy();
  });

  test('(15) - Property and Method `parse` (constructor options `parse`)', () => {
    const key = 'dessert';
    const parse = (val: any) => JSON.parse(val);

    const data: { [key: string]: any } = {
      type: 'Birthday cake',
      layers: [1, 2, 3]
    };
    let dataString = JSON.stringify(data);

    property = newConfigProperty(key, { parse });
    expect(property.defaultValue).toBeUndefined();
    expect(property.isDefined).toBeFalsy();
    expect(property.isRequired).toBeFalsy();
    expect(property.value).toBeUndefined();

    // Set with `property.defaultValue =` and parse
    property.defaultValue = dataString;
    expect(property.isDefined).toBeTruthy();
    expect(property.defaultValue).toMatch(dataString);
    expect(property.value).toMatch(dataString);

    const lastDataString = '' + dataString;
    data.flavor = 'Chocolate';
    dataString = JSON.stringify(data);

    // Set with `property.value =` and parse
    property.value = dataString;
    expect(property.isDefined).toBeTruthy();
    expect(property.defaultValue).toMatch(lastDataString);
    expect(JSON.stringify(property.value)).toMatch(dataString);

    data.filling = 'Cherry';
    dataString = JSON.stringify(data);

    // Set with constructor `initValue` and parse
    property = newConfigProperty(testData.key, { parse, initValue: dataString });
    expect(property.isDefined).toBeTruthy();
    expect(property.value).toMatch(dataString);

    data.topping = 'Sprinkles';
    dataString = JSON.stringify(data);

    // Set with constructor `defaultValue` and parse
    property = newConfigProperty(testData.key, { parse, defaultValue: dataString });
    expect(property.isDefined).toBeTruthy();
    expect(property.defaultValue).toMatch(dataString);
    expect(property.value).toMatch(dataString);
  });
});