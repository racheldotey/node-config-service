/** Exports the Node-Config-Service entry point. */
import { ConfigProperty } from './ConfigProperty';
import { ConfigPropertyManager } from './ConfigPropertyManager';
import { NodeConfigService } from './NodeConfigService';

export type {
    ConfigOnErrorCallback,
    ConfigPropertyDefinitionsMap,
    ConfigPropertyManagerOptions,
    ConfigPropertyManagerConstructor,
    ConfigPropertyManagerInterface,
    ConfigPropertyParseValueMethod,
    ConfigPropertyOptions,
    ConfigPropertyConstructor,
    ConfigPropertyInterface,
} from './types';

export { NodeConfigService, ConfigPropertyManager, ConfigProperty };
export default NodeConfigService;