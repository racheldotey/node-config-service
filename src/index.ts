import { nodeConfigProperty } from './property';
import { nodeConfigPropertyManager } from './propertyManager';
import { nodeConfigService } from './configService';

export {
    nodeConfigProperty,
    nodeConfigPropertyManager,
    nodeConfigService,
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

export default nodeConfigService;