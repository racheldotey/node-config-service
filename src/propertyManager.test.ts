import { DEFAULT_PROPERTIES } from './constants';
import { newConfigPropertyManager } from './propertyManager';

const prop = DEFAULT_PROPERTIES.environment;
prop.parse = (value: string) => value.toString().toLowerCase();
const propDefs = {
    foo: {
        envKey: 'FOO',
        defaultValue: 'Foo value'
    },
    bar: {
        key: 'BAR',
        value: 'Bar value'
    }
}


const expectConfigPropertyManager = (manager: any) => {
  expect(manager).toBeDefined();
  // Properties
  expect(manager).toHaveProperty('silenceErrors');
  expect(manager).toHaveProperty('logErrors');
  expect(manager).toHaveProperty('logFunction');
  // Setters Getters
  expect(typeof manager.length).toBe('number');
  expect(typeof manager.properties).toBe('object');
  // Methods
  expect(typeof manager.addProperty).toBe('function');
  expect(typeof manager.setProperties).toBe('function');
  expect(typeof manager.get).toBe('function');
  expect(typeof manager.getAll).toBe('function');
  expect(typeof manager.findOne).toBe('function');
  expect(typeof manager.findSeveral).toBe('function');
};



describe('Expect file exports', () => {
  it('(1) - Expect file exports { newConfigPropertyManager }', () => {
    expect(newConfigPropertyManager).toBeDefined();
    expect(typeof newConfigPropertyManager).toBe('function');
  });
});


describe('newConfigPropertyManager()', () => {
  let manager;

  beforeAll(() => {
    manager = newConfigPropertyManager();
  });

  it('(2) - Expect return value of a Config Property Manager object', () => {
    expectConfigPropertyManager(manager);
  });

  /*


    test('(3) -Default properties', () => {
        const config = new ConfigPropertyManager();

        expect(config.silenceErrors).toBeFalsy();
        expect(config.logErrors).toBeFalsy();
        expect(config.logFunction).toBeUndefined();

        expect(config.length).toBe(Object.keys(DEFAULT_PROPERTIES).length);

        Object.keys(DEFAULT_PROPERTIES).forEach(name => {
            const val = config.get(name);
            expect(val).toBeDefined()
        });
    });

    test('(4) - Property `properties` (constructor option `properties`)', () => {
        let config = new ConfigPropertyManager({ properties: {} });
        expect(config.length).toBe(Object.keys(DEFAULT_PROPERTIES).length);
        Object.keys(DEFAULT_PROPERTIES).forEach(name => expect(config.get(name)).toBeDefined());

        // Init with default properties
        config = new ConfigPropertyManager({ properties: DEFAULT_PROPERTIES });
        expect(config.length).toBe(Object.keys(DEFAULT_PROPERTIES).length);
        Object.keys(DEFAULT_PROPERTIES).forEach(name => expect(config.get(name)).toBeDefined());

        // Init with default and defined properties
        config = new ConfigPropertyManager({ properties: propDefs });
        expect(config.length).toBe(Object.keys({ ...DEFAULT_PROPERTIES, ...propDefs }).length);
        Object.keys({ ...DEFAULT_PROPERTIES, ...propDefs }).forEach(name => expect(config.get(name)).toBeDefined());
        // Reset and set new properties
        config.setProperties(propDefs, true);
        expect(config.length).toBe(Object.keys(propDefs).length);
        Object.keys(DEFAULT_PROPERTIES).forEach(name => expect(config.get(name)).toBeUndefined());
        Object.keys(propDefs).forEach(name => expect(config.get(name)).toBeDefined());
        // Empty properties
        config.setProperties({}, true);
        expect(config.length).toBe(0);
        config.setProperties(propDefs);
        expect(config.length).toBe(Object.keys(propDefs).length);
    });

    test('(5) - Method `findOne()`', () => {
        const config = new ConfigPropertyManager({ properties: propDefs });

        expect(config.findOne('foo')).toBeDefined();
        expect(config.findOne('FOO')).toBeDefined();
        expect(config.findOne('bar')).toBeDefined();
        expect(config.findOne('BAR')).toBeDefined();
        expect(config.findOne('unknown')).toBeUndefined();
    });

    test('(6) - Method `findSeveral()`', () => {
        const config = new ConfigPropertyManager({ properties: propDefs });

        let found = config.findSeveral([]);
        expect(found).toBeDefined();
        expect(Object.keys(found).length).toBe(0);

        found = config.findSeveral(['foo']);
        expect(found).toBeDefined();
        expect(Object.keys(found).length).toBe(1);
        expect(found.foo).toBeDefined();

        found = config.findSeveral(['foo', 'FOO', 'bar', 'BAR']);
        expect(Object.keys(found).length).toBe(4);
        expect(found.foo).toBeDefined();
        expect(found.FOO).toBeDefined();
        expect(found.bar).toBeDefined();
        expect(found.BAR).toBeDefined();

        found = config.findSeveral(['unknown']);
        expect(found).toBeDefined();
        expect(Object.keys(found).length).toBe(1);
        expect(found.unknown).toBeUndefined();
    });

    test('(7) - Method `get()`', () => {
        const config = new ConfigPropertyManager({ properties: propDefs, includeDefaults: false });
        expect(config.length).toBe(Object.keys(propDefs).length);

        // String = find()
        expect(config.get('foo')).toBeDefined();
        expect(config.get('BAR')).toBeDefined();
        expect(config.get('unknown')).toBeUndefined();
        // Array = findSeveral()
        let found = config.get([]);
        expect(found).toBeDefined();
        expect(Object.keys(found).length).toBe(0);

        found = config.get(['foo', 'FOO', 'bar', 'BAR', 'unknown']);
        expect(Object.keys(found).length).toBe(5);
        expect(found.foo).toBeDefined();
        expect(found.FOO).toBeDefined();
        expect(found.bar).toBeDefined();
        expect(found.BAR).toBeDefined();
        expect(found.unknown).toBeUndefined();
        // Boolean true = getAll()
        found = config.get(true);
        expect(Object.keys(found).length).toBe(Object.keys(propDefs).length);
        Object.keys(propDefs).forEach(name => expect(found[name]).toBeDefined());
    });

    test('(8) - Method `getAll()`', () => {
        const config = new ConfigPropertyManager({ properties: propDefs, includeDefaults: false });
        const found = config.getAll();
        expect(Object.keys(found).length).toBe(Object.keys(propDefs).length);
        Object.keys(propDefs).forEach(name => expect(found[name]).toBeDefined());
    });
  */
});