import { newConfigProperty } from './property';
import { newConfigPropertyManager } from './propertyManager';
import { newConfigService } from './configService';

export {
    newConfigProperty,
    newConfigPropertyManager,
    newConfigService,
};

export type {
    ConfigProperty,
    ConfigPropertyOptions,
    ConfigPropertyParseValueMethod,
    ConfigPropertyParsedValue,
    ConfigPropertyValue,
} from './property';

export type {
    ConfigOnErrorCallback,
    ConfigPropertyDefinitionsArray,
    ConfigPropertyDefinitionsMap,
    ConfigPropertyManager,
    ConfigPropertyManagerOptions,
} from './propertyManager';

export type {
	ConfigService,
} from './configService';

export default newConfigService;