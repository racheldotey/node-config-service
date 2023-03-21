import { newConfigService } from '../src/configService';
import { expectConfigService } from './lib';



describe('Expect file exports', () => {
  test('(1) - Expect file export { newConfigService } to be defined', () => {
    expect(newConfigService).toBeDefined();
    expect(typeof newConfigService).toBe('function');
  });
});


describe('newConfigService()', () => {
  let service;

  beforeAll(() => {
    service = newConfigService();
  });

  test('(2) - Expect return value of a Config Property Service object', () => {
    expectConfigService(service);
  });

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