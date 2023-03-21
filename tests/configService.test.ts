/* eslint-disable @typescript-eslint/no-unused-vars */
import { expectConfigService, testNodeConfigServiceGetMethod } from './lib';
import { nodeConfigService } from '../src/configService';
import type { ConfigService } from '../src/configService';
import type {
  ConfigOnErrorCallback,
  ConfigPropertyDefinitionsArray,
  ConfigPropertyDefinitionsMap,
  ConfigPropertyManager,
  ConfigPropertyManagerOptions
} from '../src/propertyManager';
import path from 'path';
import { DEFAULT_PROPERTIES } from '../src/constants';

const testProperties: ConfigPropertyDefinitionsMap = {
  environment: {
    name: 'environment',
    key: 'NODE_ENV',
    desc: `{string} Current environment likely 'production' or 'development'.`,
    parse: (value) => {
      const env = value.toString().toLowerCase();
      if (!['development', 'production'].includes(env))
        console.debug(`Unusual environment mode set in the app config: '${env}'`);
      return env;
    },
    default: 'development'
  },
  app_root_dir: {
    name: 'app_root_dir',
    key: 'UVMC_APP_ROOT',
    desc: `{string} The root directory (absolute system path) for the api app. Can be sent to this appConfig constructor at runtime.`,
    default: path.resolve('./'),
  },
  log_dir: {
    name: 'log_dir',
    key: 'UVMC_LOG_DIR',
    desc: `{string} Retaliative path to logging directory (auto generated files) from the app root directory.`,
    parse: (value) => {
      try {
        return path.normalize(value);
      } catch (error) {
        throw new TypeError(`Invalid api app root directory: ${value}`);
      }
    },
    default: 'logs'
  },
  express_port: {
    name: 'express_port',
    key: 'UVMC_EXPRESS_PORT',
    desc: `{integer} Port that this app will be served on via app.listen. Not used in serverless builds.`,
    parse: (value) => {
      try {
        return parseInt(value);
      } catch (error) {
        throw new TypeError(`Invalid express port: ${value}`);
      }
    },
    default: 8000
  },
  react_port: {
    name: 'react_port',
    key: 'UVMC_REACT_PORT',
    desc: `{integer} Port that the client react app will be served.`,
    parse: (value) => {
      try {
        return parseInt(value);
      } catch (error) {
        throw new TypeError(`Invalid express port: ${value}`);
      }
    },
    default: 3000
  },
  cors_origin: {
    name: 'cors_origin',
    key: 'UVMC_CORS_ORIGIN',
    desc: `{string} Origin allowed access to this api.`,
    default: 'http://localhost'
  },
  db_host: {
    name: 'db_host',
    key: 'UVMC_DB_HOST',
    desc: `{string} Host url for the database instance.`,
    default: '127.0.0.1'
  },
  db_port: {
    name: 'db_port',
    key: 'UVMC_DB_PORT',
    desc: `{integer} Port running the database instance.`,
    parse: (value) => {
      try {
        return parseInt(value);
      } catch (error) {
        throw new TypeError(`Invalid mysql port: ${value}`);
      }
    },
    default: 27017
  },
  db_username: {
    name: 'db_username',
    key: 'UVMC_DB_USERNAME',
    desc: `{string} Database auth credential username.`,
  },
  db_password: {
    name: 'db_password',
    key: 'UVMC_DB_PASSWORD',
    desc: `{string} Database auth credential password.`,
  },
  db_database: {
    name: 'db_database',
    key: 'UVMC_DB_NAME',
    desc: `{string} Database name.`,
  }
};
const testOptions: ConfigPropertyManagerOptions = { properties: testProperties };


describe('Expect "configService" exports to be defined', () => {
  test('(1) - Expect file exports { nodeConfigService }', () => {
    expect(nodeConfigService).toBeDefined();
    expect(typeof nodeConfigService).toBe('function');
  });
});


describe('nodeConfigService()', () => {
  test('(2) - Expect return value of a Config Property Service object', () => {
    const service = nodeConfigService();
    expectConfigService(service);
  });

  test('(2) - Expect return value of a Config Property Service object', () => {
    const service = nodeConfigService(testOptions);
    expectConfigService(service);
  });

  test('(3) - Confirm default properties', () => {
    const service = nodeConfigService();

    expect(service.silenceErrors).toBeFalsy();
    expect(service.logErrors).toBeFalsy();
    expect(service.logFunction).toBeUndefined();

    expect(service.length).toBe(Object.keys(DEFAULT_PROPERTIES).length);

    Object.keys(DEFAULT_PROPERTIES).forEach(name => {
      const val = service.get(name);
      expect(val).toBeDefined()
    });
  });

  test('(4) - Set properties, confirm new props and default', () => {
    const service = nodeConfigService(testOptions);

    const keys = [...Object.keys(testProperties), ...Object.keys(DEFAULT_PROPERTIES)];

    const props = service.get(keys);
    expect(props).toBeDefined();

    keys.forEach(key => {
      expect(props).toHaveProperty(key);
    });
  });

  test('(5) - Set properties, clear default', () => {
    const service = nodeConfigService({ ...testOptions, includeDefaults: false });

    const keys = Object.keys(testProperties);

    const props = service.get(keys);
    expect(props).toBeDefined();

    keys.forEach(key => {
      expect(props).toHaveProperty(key);
    });

    expect(service.length).toBe(keys.length);
  });


  testNodeConfigServiceGetMethod(nodeConfigService, 6);

});