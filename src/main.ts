/** Exports the Node-Config-Service entry point. */
import { ConfigProperty } from './ConfigProperty';
import { ConfigManager } from './ConfigManager';
import { ConfigService } from './ConfigService';

export type {
    ConfigManagerLogFunction,
    DefinePropertyOptions,
    ConfigManagerOptions,
    ConfigManagerConstructor,
    ConfigManagerInterface,
    ConfigPropertyParseFunction,
    ConfigPropertyOptions,
    ConfigPropertyConstructor,
    ConfigPropertyInterface,
} from './types';

export { ConfigService, ConfigManager, ConfigProperty };
export default ConfigService;