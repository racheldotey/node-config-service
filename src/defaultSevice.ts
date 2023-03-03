import ConfigService from './ConfigService';


export const defaultService = new ConfigService({
    properties: {
        NODE_ENV: {
            key: 'NODE_ENV',
            name: 'environment',
            desc: `{String} Current environment likely 'production' or 'development'.`,
            default: 'development',
            required: false,
            parse: (value) => value.toString().toLowerCase(),
        }
    }
});



export default defaultService;