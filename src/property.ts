import { ConfigPropertyOptions } from './types';
import { getSafeBoolean } from './utils/getSafeBoolean';

/**
 * A single property value for the config.
 * @property {string} name - Key used to find the property within the program.
 * @property {string | false} envKey - Key to system process env property.
 * @property {string} desc - Description of this property used for logging.
 * @property {string | null} default - Default value for this property
 * @property {boolean} isDefined - Has this property been set/initialized.
 * @property {boolean} isRequired - This must be set or it is invalid.
 * @property {Error[] | undefined} errors - Array of errors that have occurred with this property.
 * @property {any} parse -  Parse the property (all process .env vars are strings by default)
 * @property {any} #value - Property value
 */
const newConfigProperty = (name: string, options?: ConfigPropertyOptions) => {

    let defaultValue = undefined;
    let value = undefined;

    const property = {
        name: `${name}`,
        envKey: `${name}`,
        description: '',
        parse: (value: any): any => value,
        isRequired: false,
        errors: [],

        get isDefined() {
            return Boolean(value !== undefined);
        },

        get defaultValue() {
            return defaultValue;
        },

        set defaultValue(payload: any) {
            defaultValue = payload;
            if (!property.isDefined) property.value = property.defaultValue;
        },

        get value() {
            if (!property.isDefined && property.isRequired) {
                return property.onError('Value isRequired and was requested before it was set.');
            }
            return value;
        },

        set value(payload: any) {
            value = property.parse(payload);
        },

        setValue(envVars: { [key: string]: string }): void {
            let value = property.defaultValue;

            // Is the property set in the environment
            if (property.envKey && envVars[property.envKey]) {
                value = envVars[property.envKey];
            } else if (envVars[property.name]) {
                value = envVars[property.name];
            }

            if (value) {
                property.value = value;
            } else if (property.isRequired) {
                return property.onError('Value isRequired but could not be set.');
            }
        },

        unsetValue(): void {
            value = undefined;
        },

        isMatch(find: string): boolean {
            return Boolean(find === property.name || find === property.envKey);
        },

        onError(cause: string): void {
            const message = `${property.constructor.name} "${property.name}": ${cause}`;
            if (!property.errors) property.errors = [];

            const error = new Error(message);
            //property.errors.push(error);

            throw error;
        }
    };

    // Optional parameters
    if (options) {
        // `envKey` takes presentence over `key`
        property.envKey = options.envKey || options.key || property.envKey;
        // `description` takes presentence over `desc`
        property.description = options.description || options.desc || property.description;

        if (typeof options.parse === "function") property.parse = options.parse;

        // `isRequired` takes presentence over `required`
        if (Object.hasOwn(options, 'isRequired')) property.isRequired = getSafeBoolean(options.isRequired);
        else if (Object.hasOwn(options, 'required')) property.isRequired = getSafeBoolean(options.required);

        // `defaultValue` takes presentence over `default`
        if (Object.hasOwn(options, 'defaultValue')) property.defaultValue = options.defaultValue;
        else if (Object.hasOwn(options, 'default')) property.defaultValue = options.default;

        // `initValue` takes presentence over `value`
        if (Object.hasOwn(options, 'initValue')) property.value = options.initValue;
        else if (Object.hasOwn(options, 'value')) property.value = options.value;
    }

    return property;
};

export { newConfigProperty }