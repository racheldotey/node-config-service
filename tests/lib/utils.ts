import { ConfigManagerInterface, ConfigManagerLogFunction } from '../../src/types';


const expectConfigManagerProps = (config: ConfigManagerInterface) => {
    // All props
    expect(config).toHaveProperty('silenceErrors');
    expect(config).toHaveProperty('logErrors');
    expect(config).toHaveProperty('logFunction');
    // All methods
    expect(typeof config.init).toBe('function');
    expect(typeof config.get).toBe('function');
    expect(typeof config.findOne).toBe('function');
    expect(typeof config.findSeveral).toBe('function');
};

export const expectConfigManagerInterface = (config: ConfigManagerInterface) => {
    expect(config).toBeDefined();
    expect(config.constructor.name).toMatch('ConfigManager');
    expectConfigManagerProps(config);
};

export const expectConfigServiceInterface = (config: ConfigManagerInterface) => {
    expect(config).toBeDefined();
    // expect(config.constructor.name).toMatch('ConfigService');
    expectConfigManagerProps(config);
};

export const expectConfigManagerSettings = (
    config: ConfigManagerInterface,
    {
        silenceErrors,
        logErrors,
        logFunction,
    }: { silenceErrors?: boolean; logErrors?: boolean; logFunction?: ConfigManagerLogFunction } = {}
) => {
    if (silenceErrors) expect(config.silenceErrors).toBeTruthy();
    else expect(config.silenceErrors).toBeFalsy();

    if (logErrors) expect(config.logErrors).toBeTruthy();
    else expect(config.logErrors).toBeFalsy();

    if (logFunction) expect(typeof config.logFunction).toBe('function');
    else expect(config.logFunction).toBeUndefined();
};
