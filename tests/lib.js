
const expectConfigService = (service) => {
    expect(service).toBeDefined();
    // Properties
    // Setters Getters
    // Methods
    expect(typeof service.loadEnv).toBe('function');
    expect(typeof service.addConfig).toBe('function');
    expect(typeof service.getConfig).toBe('function');
    expect(typeof service.deleteConfig).toBe('function');
};

const expectConfigProperty = (property) => {
    expect(property).toBeDefined();
    // Properties
    expect(property).toHaveProperty('name');
    expect(property).toHaveProperty('envKey');
    expect(property).toHaveProperty('description');
    expect(property).toHaveProperty('parse');
    expect(property).toHaveProperty('isRequired');
    // Setters Getters
    expect(typeof property.isDefined).toBe('boolean');
    // Methods
    expect(typeof property.setValue).toBe('function');
    expect(typeof property.isMatch).toBe('function');
  };


const expectConfigPropertyManager = (manager) => {
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

module.exports = {
    expectConfigService,
    expectConfigProperty,
    expectConfigPropertyManager
};