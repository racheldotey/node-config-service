
const keyDefined = `environment`;
const keyNotDefined = `value-doesnt-exist-as-a-config-property-or-environment-variable`;


const expectConfigProperty = (property) => {
  expect(property).toBeDefined();
  // Properties
  expect(property).toHaveProperty(`name`);
  expect(property).toHaveProperty(`envKey`);
  expect(property).toHaveProperty(`description`);
  expect(property).toHaveProperty(`parse`);
  expect(property).toHaveProperty(`isRequired`);
  // Setters Getters
  expect(typeof property.isDefined).toBe(`boolean`);
  // Methods
  expect(typeof property.setValue).toBe(`function`);
  expect(typeof property.isMatch).toBe(`function`);
};

const expectConfigPropertyManager = (manager) => {
  expect(manager).toBeDefined();
  // Properties
  expect(manager).toHaveProperty(`silenceErrors`);
  expect(manager).toHaveProperty(`logErrors`);
  expect(manager).toHaveProperty(`logFunction`);
  // Setters Getters
  expect(typeof manager.length).toBe(`number`);
  expect(typeof manager.properties).toBe(`object`);
  // Methods
  expect(typeof manager.addProperty).toBe(`function`);
  expect(typeof manager.setProperties).toBe(`function`);
  expect(typeof manager.get).toBe(`function`);
  expect(typeof manager.getAll).toBe(`function`);
  expect(typeof manager.findOne).toBe(`function`);
  expect(typeof manager.findSeveral).toBe(`function`);
};

const expectConfigService = (service) => {
  // The service is an extension of PropertyManager
  expectConfigPropertyManager(service);
  // Properties
  // Setters Getters
  // Methods
  expect(typeof service.loadEnv).toBe(`function`);
  expect(typeof service.addConfig).toBe(`function`);
  expect(typeof service.getConfig).toBe(`function`);
  expect(typeof service.deleteConfig).toBe(`function`);
};

const testObjectPropertiesToBeDefined = (exported = {}, start = 1) => {
  var count = 0;

  Object.keys(exported).forEach((key, i) => {
    count = i + start;
    test(`(${count++}) - Expect "${key}" to be defined`, () => {
      expect(exported[key]).toBeDefined();
    });
  });

  return count;
};

const testNodeConfigServiceExports = ({ defaultExport, newConfigProperty, newConfigPropertyManager, newConfigService }, start = 1) => {
  var count = start;

  test(`(${count++}) - Expect defaultExport to be defined`, () => {
    const service = defaultExport();
    expectConfigService(service);
  });

  test(`(${count++}) - expect { newConfigProperty } to be defined`, () => {
    const property = newConfigProperty(`anyStringValue`);
    expectConfigProperty(property);
  });

  test(`(${count++}) - expect { newConfigPropertyManager } to be defined`, () => {
    const manager = newConfigPropertyManager();
    expectConfigPropertyManager(manager);
  });

  test(`(${count++}) - expect { newConfigService } to be defined`, () => {
    const service = newConfigService();
    expectConfigService(service);
  });

  return count;
}

const testNodeConfigServiceGetMethod = (newConfigService, start = 1) => {
  var count = start;
  let config = newConfigService();

  test(`(${count++}) - Expect config.get('${keyDefined}') = to be defined`, () => {
    expect(config.get(keyDefined)).toBeDefined();
  });

  test(`(${count++}) - Expect config.get(['${keyDefined}']) = to be defined`, () => {
    const props = config.get([keyDefined]);
    expect(props).toBeDefined();
    expect(props).toHaveProperty(keyDefined);
    expect(props[keyDefined]).toBeDefined();
  });

  test(`(${count++}) - Expect config.get('${keyNotDefined}') = undefined`, () => {
    expect(config.get(keyNotDefined)).toBeUndefined();
  });

  test(`(${count++}) - Expect config.get(['${keyNotDefined}']) = { '${keyNotDefined}': undefined }`, () => {
    const props = config.get([keyNotDefined]);
    expect(props).toBeDefined();
    expect(props).toHaveProperty(keyNotDefined);
    expect(props[keyNotDefined]).toBeUndefined();
  });

  test(`(${count++}) - Expect [${keyNotDefined}, ${keyDefined}] to be object with a defined and undefined property`, () => {
    const props = config.get([keyNotDefined, keyDefined]);
    expect(props).toBeDefined();
    expect(props).toHaveProperty(keyNotDefined);
    expect(props).toHaveProperty(keyDefined);
    expect(props[keyNotDefined]).toBeUndefined();
    expect(props[keyDefined]).toBeDefined();
  });

  test(`(${count++}) - Expect config.get('') = undefined`, () => {
    expect(config.get('')).toBeUndefined();
  });

  test(`(${count++}) - Expect config.get([]) = {}`, () => {
    expect(JSON.stringify(config.get([]))).toMatch(JSON.stringify({}));
  });

  test(`(${count++}) - Expect config.get(['']) = { '': undefined }`, () => {
    expect(JSON.stringify(config.get(['']))).toMatch(JSON.stringify({ '': undefined }));
  });

  test(`(${count++}) - Expect config.get() = all properties`, () => {
    expect(config.get()).toBeDefined();
  });

  test(`(${count++}) - Expect config.get(true) = all properties`, () => {
    expect(config.get(true)).toBeDefined();
  });

  return count;
}


module.exports = {
  expectConfigProperty,
  expectConfigPropertyManager,
  expectConfigService,
  testNodeConfigServiceExports,
  testNodeConfigServiceGetMethod,
  testObjectPropertiesToBeDefined,
};