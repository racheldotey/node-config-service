import type { IConfigManager, DefinePropertyOptions, ConfigManagerOptions } from './types';
import { ConfigManager } from './ConfigManager';
export declare class ConfigService extends ConfigManager {
    dotenvLoaded?: boolean | false;
    extraConfigs: {
        [key: string]: IConfigManager;
    };
    constructor(options?: ConfigManagerOptions);
    init(props?: DefinePropertyOptions, envValues?: {
        [key: string]: string;
    }): IConfigManager;
    loadEnv(): void;
    getConfig(key: string): IConfigManager;
}
//# sourceMappingURL=ConfigService.d.ts.map