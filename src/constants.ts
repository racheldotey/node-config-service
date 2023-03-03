

export const DEFAULT_PROPERTY_DEFINITIONS = {
    NODE_ENV: {
        envKey: 'environment',
        desc: `{String} Current environment likely 'production' or 'development'.`,
        default: 'development',
        required: false,
        parse: (value: string) => value.toString().toLowerCase(),
    },
};

export const DEFAULT_SERVICE_PROPERTIES = {
    properties: { ...DEFAULT_SERVICE_PROPERTIES }
};