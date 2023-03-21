/* eslint-disable @typescript-eslint/no-unused-vars */
import { expectConfigPropertyManager } from './lib';
import { nodeConfigPropertyManager } from '../src/propertyManager';
import type {
  ConfigOnErrorCallback,
  ConfigPropertyDefinitionsArray,
  ConfigPropertyDefinitionsMap,
  ConfigPropertyManager,
  ConfigPropertyManagerOptions
} from '../src/propertyManager';
import { DEFAULT_PROPERTIES } from '../src/constants';


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


describe('Expect "propertyManager" exports to be defined', () => {
  test('(1) - Expect file exports { nodeConfigPropertyManager }', () => {
    expect(nodeConfigPropertyManager).toBeDefined();
    expect(typeof nodeConfigPropertyManager).toBe('function');
  });
});


describe('nodeConfigPropertyManager()', () => {
  let manager;

  beforeAll(() => {
    manager = nodeConfigPropertyManager();
  });

  test('(2) - Expect return value of a Config Property Manager object', () => {
    expectConfigPropertyManager(manager);
  });

  test('(3) -Default properties', () => {
    expect(manager.silenceErrors).toBeFalsy();
    expect(manager.logErrors).toBeFalsy();
    expect(manager.logFunction).toBeUndefined();

    expect(manager.length).toBe(Object.keys(DEFAULT_PROPERTIES).length);

    Object.keys(DEFAULT_PROPERTIES).forEach(name => {
      const val = manager.get(name);
      expect(val).toBeDefined()
    });
  });

  test('(4) - Property `properties` (constructor option `properties`)', () => {
    manager = nodeConfigPropertyManager({ properties: {} });
    expect(manager.length).toBe(Object.keys(DEFAULT_PROPERTIES).length);
    Object.keys(DEFAULT_PROPERTIES).forEach(name => expect(manager.get(name)).toBeDefined());

    // Init with default properties
    manager = nodeConfigPropertyManager({ properties: DEFAULT_PROPERTIES });
    expect(manager.length).toBe(Object.keys(DEFAULT_PROPERTIES).length);
    Object.keys(DEFAULT_PROPERTIES).forEach(name => expect(manager.get(name)).toBeDefined());

    // Init with default and defined properties
    manager = nodeConfigPropertyManager({ properties: propDefs });
    expect(manager.length).toBe(Object.keys({ ...DEFAULT_PROPERTIES, ...propDefs }).length);
    Object.keys({ ...DEFAULT_PROPERTIES, ...propDefs }).forEach(name => expect(manager.get(name)).toBeDefined());
    // Reset and set new properties
    manager.setProperties(propDefs, true);
    expect(manager.length).toBe(Object.keys(propDefs).length);
    Object.keys(DEFAULT_PROPERTIES).forEach(name => expect(manager.get(name)).toBeUndefined());
    Object.keys(propDefs).forEach(name => expect(manager.get(name)).toBeDefined());
    // Empty properties
    manager.setProperties({}, true);
    expect(manager.length).toBe(0);
    manager.setProperties(propDefs);
    expect(manager.length).toBe(Object.keys(propDefs).length);
  });

  test('(5) - Method `findOne()`', () => {
    manager = nodeConfigPropertyManager({ properties: propDefs });

    expect(manager.findOne('foo')).toBeDefined();
    expect(manager.findOne('FOO')).toBeDefined();
    expect(manager.findOne('bar')).toBeDefined();
    expect(manager.findOne('BAR')).toBeDefined();
    expect(manager.findOne('unknown')).toBeUndefined();
  });

  test('(6) - Method `findSeveral()`', () => {
    manager = nodeConfigPropertyManager({ properties: propDefs });

    let found = manager.findSeveral([]);
    expect(found).toBeDefined();
    expect(Object.keys(found).length).toBe(0);

    found = manager.findSeveral(['foo']);
    expect(found).toBeDefined();
    expect(Object.keys(found).length).toBe(1);
    expect(found.foo).toBeDefined();

    found = manager.findSeveral(['foo', 'FOO', 'bar', 'BAR']);
    expect(Object.keys(found).length).toBe(4);
    expect(found.foo).toBeDefined();
    expect(found.FOO).toBeDefined();
    expect(found.bar).toBeDefined();
    expect(found.BAR).toBeDefined();

    found = manager.findSeveral(['unknown']);
    expect(found).toBeDefined();
    expect(Object.keys(found).length).toBe(1);
    expect(found.unknown).toBeUndefined();
  });

  test('(7) - Method `get()`', () => {
    manager = nodeConfigPropertyManager({ properties: propDefs, includeDefaults: false });
    expect(manager.length).toBe(Object.keys(propDefs).length);

    // String = find()
    expect(manager.get('foo')).toBeDefined();
    expect(manager.get('BAR')).toBeDefined();
    expect(manager.get('unknown')).toBeUndefined();
    // Array = findSeveral()
    let found = manager.get([]);
    expect(found).toBeDefined();
    expect(Object.keys(found).length).toBe(0);

    found = manager.get(['foo', 'FOO', 'bar', 'BAR', 'unknown']);
    expect(Object.keys(found).length).toBe(5);
    expect(found.foo).toBeDefined();
    expect(found.FOO).toBeDefined();
    expect(found.bar).toBeDefined();
    expect(found.BAR).toBeDefined();
    expect(found.unknown).toBeUndefined();
    // Boolean true = getAll()
    found = manager.get(true);
    expect(Object.keys(found).length).toBe(Object.keys(propDefs).length);
    Object.keys(propDefs).forEach(name => expect(found[name]).toBeDefined());
  });

  test('(8) - Method `getAll()`', () => {
    manager = nodeConfigPropertyManager({ properties: propDefs, includeDefaults: false });
    const found = manager.getAll();
    expect(Object.keys(found).length).toBe(Object.keys(propDefs).length);
    Object.keys(propDefs).forEach(name => expect(found[name]).toBeDefined());
  });
});