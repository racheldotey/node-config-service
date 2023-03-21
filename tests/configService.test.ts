/* eslint-disable @typescript-eslint/no-unused-vars */
import { expectConfigService } from './lib';
import { newConfigService } from '../src/configService';
import type { ConfigService } from '../src/configService';



describe('Expect "configService" exports to be defined', () => {
  test('(1) - Expect file exports { newConfigService }', () => {
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