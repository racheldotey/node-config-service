/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSafeBoolean } from './utils/getSafeBoolean';


type ConfigPropertyValue = any;
type ConfigPropertyParsedValue = any;
type ConfigPropertyParseValueMethod = (value: ConfigPropertyValue) => ConfigPropertyParsedValue;
type ConfigPropertyOptions = {
    name?: string;
    key?: string;
    envKey?: string;
    desc?: string;
    description?: string;
    default?: string;
    defaultValue?: string;
    required?: boolean;
    isRequired?: boolean;
    parse?: ConfigPropertyParseValueMethod;
    value?: ConfigPropertyValue;
    initValue?: ConfigPropertyValue;
}
type ConfigProperty = {
    name: string;
    envKey: string;
    description: string;
    parse: ConfigPropertyParseValueMethod;
    isRequired: boolean;
    errors?: Error[];

    get isDefined(): boolean;
    get defaultValue(): {
        [key: string]: string;
    };
    set defaultValue(payload: ConfigPropertyValue);
    get value(): ConfigPropertyParsedValue;
    set value(payload: ConfigPropertyValue);
    isMatch(find: string): boolean;
    setValue(envVars: NodeJS.ProcessEnv | { [key: string]: string }): void;
    unsetValue(): void;
}


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
const newConfigProperty = (name: string, options?: ConfigPropertyOptions): ConfigProperty => {

    let defaultValue: ConfigPropertyValue = undefined;
    let propertyValue: ConfigPropertyValue = undefined;

    const property: ConfigProperty = {
        name: `${name}`,
        envKey: `${name}`,
        description: '',
        parse: (value: ConfigPropertyValue): ConfigPropertyParsedValue => value,
        isRequired: false,
        errors: [],

        get isDefined() {
            return Boolean(propertyValue !== undefined);
        },

        get defaultValue() {
            return defaultValue;
        },

        set defaultValue(payload: ConfigPropertyValue) {
            defaultValue = payload;
            if (!property.isDefined) propertyValue = property.defaultValue;
        },

        get value() {
            if (!property.isDefined && property.isRequired) {
                return onError('Value isRequired and was requested before it was set.');
            }
            return propertyValue;
        },

        set value(payload: ConfigPropertyValue) {
            propertyValue = property.parse(payload);
        },

        isMatch(find: string): boolean {
            return Boolean(find === property.name || find === property.envKey);
        },

        setValue(envVars: NodeJS.ProcessEnv | { [key: string]: string }): void {
            let value: ConfigPropertyValue = property.defaultValue;

            // Is the property set in the environment
            if (property.envKey && envVars[property.envKey]) {
                value = envVars[property.envKey];
            } else if (envVars[property.name]) {
                value = envVars[property.name];
            }

            if (value) {
                propertyValue = value;
            } else if (property.isRequired) {
                return onError('Value isRequired but could not be set.');
            }
        },

        unsetValue(): void {
            propertyValue = undefined;
        },
    };

    const onError = (cause: string): void => {
        const message = `${property.constructor.name} "${property.name}": ${cause}`;
        if (!property.errors) property.errors = [];

        const error = new Error(message);
        //property.errors.push(error);

        throw error;
    }

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
        if (Object.hasOwn(options, 'initValue')) propertyValue = options.initValue;
        else if (Object.hasOwn(options, 'value')) propertyValue = options.value;
    }

    return property;
};



export {
    ConfigProperty,
    ConfigPropertyOptions,
    ConfigPropertyParseValueMethod,
    ConfigPropertyParsedValue,
    ConfigPropertyValue,
    newConfigProperty,
};