import { DEFAULT_PROPERTIES } from './constants';
import { newConfigService } from './configService';



const expectConfigService = (service: any) => {
  expect(service).toBeDefined();
  // Properties
  expect(service).toHaveProperty('silenceErrors');
  expect(service).toHaveProperty('logErrors');
  expect(service).toHaveProperty('logFunction');
  // Setters Getters
  // Methods
  expect(typeof service.init).toBe('function');
  expect(typeof service.get).toBe('function');
  expect(typeof service.findOne).toBe('function');
  expect(typeof service.findSeveral).toBe('function');
};



describe('Expect file exports', () => {
  it('(1) - Expect file exports { newConfigService }', () => {
    expect(newConfigService).toBeDefined();
    expect(typeof newConfigService).toBe('function');
  });
});


describe('newConfigService()', () => {
  let service;

  beforeAll(() => {
    service = newConfigService();
  });

  it('(2) - Expect return value of a Config Property Service object', () => {
    expectConfigService(service);

    /*


    test('(3) -Default properties', () => {
        const config = new NodeConfigService();

        expect(config.silenceErrors).toBeFalsy();
        expect(config.logErrors).toBeFalsy();
        expect(config.logFunction).toBeUndefined();

        expect(config.length).toBe(Object.keys(DEFAULT_PROPERTIES).length);

        Object.keys(DEFAULT_PROPERTIES).forEach(name => {
            const val = config.get(name);
            expect(val).toBeDefined()
        });
    });
    */
});