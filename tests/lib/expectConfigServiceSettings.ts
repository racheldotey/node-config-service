import { IConfigService, ConfigServiceLogFunction } from '../../src/types';

export const expectConfigServiceSettings = (
    config: IConfigService,
    {
        silenceErrors,
        logErrors,
        logFunction,
    }: { silenceErrors?: boolean; logErrors?: boolean; logFunction?: ConfigServiceLogFunction } = {}
) => {
    if (silenceErrors) {
        expect(config.silenceErrors).toBeTruthy();
    } else {
        expect(config.silenceErrors).toBeFalsy();
    }

    if (logErrors) {
        expect(config.logErrors).toBeTruthy();
    } else {
        expect(config.logErrors).toBeFalsy();
    }

    if (logFunction) {
        expect(typeof config.logFunction).toBe('function');
    } else {
        expect(config.logFunction).toBeUndefined();
    }
};
