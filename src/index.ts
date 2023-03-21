/** Exports the Node-Config-Service entry point. */
import { newConfigProperty } from './property';
import { newConfigPropertyManager } from './propertyManager';
import { newConfigService } from './configService';

export {
    newConfigProperty,
    newConfigPropertyManager,
    newConfigService,
};

export default newConfigService;