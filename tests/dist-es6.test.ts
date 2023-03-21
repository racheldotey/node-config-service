import defaultExport, { newConfigProperty, newConfigPropertyManager, newConfigService, } from '../dist';
import type {
    ConfigProperty,
    ConfigPropertyOptions,
    ConfigPropertyParseValueMethod,
    ConfigPropertyParsedValue,
    ConfigPropertyValue,
    ConfigOnErrorCallback,
    ConfigPropertyDefinitionsArray,
    ConfigPropertyDefinitionsMap,
    ConfigPropertyManager,
    ConfigPropertyManagerOptions,
    ConfigService,
} from '../dist';

import {
    expectConfigService,
    expectConfigProperty,
    expectConfigPropertyManager
} from './lib';

describe('Expect "dist" exports to be defined', () => {
    test('(1) - Expect defaultExport to be defined', () => {
        expect(defaultExport).toBeDefined();
    });

    test('(2) - expect { newConfigProperty } to be defined', () => {
        expect(newConfigProperty).toBeDefined();
    });

    test('(3) - expect { newConfigPropertyManager } to be defined', () => {
        expect(newConfigPropertyManager).toBeDefined();
    });

    test('(4) - expect { newConfigService } to be defined', () => {
        expect(newConfigService).toBeDefined();
    });
});

describe('Expect exported methods and interfaces', () => {
    test('(5) - Expect defaultExport to be defined', () => {
        const service = defaultExport();
        expectConfigService(service);
    });

    test('(6) - expect { newConfigProperty } to be defined', () => {
        const property = newConfigProperty('anyStringValue');
        expectConfigProperty(property);
    });

    test('(7) - expect { newConfigPropertyManager } to be defined', () => {
        const manager = newConfigPropertyManager();
        expectConfigPropertyManager(manager);
    });

    test('(8) - expect { newConfigService } to be defined', () => {
        const service = newConfigService();
        expectConfigService(service);
    });
});

export { };