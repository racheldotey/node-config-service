import {
    ConfigPropertyInterface,
    ConfigPropertyConstructor,
    ConfigPropertyParseFunction,
    ConfigPropertyOptions,
} from './types';
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
export const ConfigProperty: ConfigPropertyConstructor = class ConfigProperty
    implements ConfigPropertyInterface {
    name: string;
    envKey: string;
    description: string;
    parse: ConfigPropertyParseFunction;
    isRequired: boolean;

    errors?: Error[];

    #defaultValue?: any;
    #value?: any;

    /**
     * Creates an instance of ConfigProperty.
     * @param {string} name - Key used to look up this property in calling app.
     * @param {ConfigPropertyOptions} [options={}]
     * @memberof ConfigProperty
     */
    constructor(name: string, options?: ConfigPropertyOptions) {
        // Required
        this.name = `${name}`;
        this.envKey = `${name}`;

        // Default properties
        this.description = '';
        this.parse = value => value;
        this.isRequired = false;

        // Optional parameters
        if (options) {
            // `envKey` takes presentence over `key`
            this.envKey = options.envKey || options.key || this.envKey;
            // `description` takes presentence over `desc`
            this.description = options.description || options.desc || this.description;

            if (typeof options.parse === "function") this.parse = options.parse;

            // `isRequired` takes presentence over `required`
            if (options.hasOwnProperty('isRequired')) this.isRequired = getSafeBoolean(options.isRequired);
            else if (options.hasOwnProperty('required')) this.isRequired = getSafeBoolean(options.required);

            // `defaultValue` takes presentence over `default`
            if (options.hasOwnProperty('defaultValue')) this.defaultValue = options.defaultValue;
            else if (options.hasOwnProperty('default')) this.defaultValue = options.default;

            // `initValue` takes presentence over `value`
            if (options.hasOwnProperty('initValue')) this.value = options.initValue;
            else if (options.hasOwnProperty('value')) this.value = options.value;
        }
    }

    get isDefined() {
        return !!(this.#value !== undefined);
    }

    get defaultValue() {
        return this.#defaultValue;
    }

    set defaultValue(payload: any) {
        this.#defaultValue = payload;
        if (!this.isDefined) this.value = this.defaultValue;
    }

    get value() {
        if (!this.isDefined && this.isRequired) {
            return this.onError('Value isRequired and was requested before it was set.');
        }
        return this.#value;
    }

    set value(payload: any) {
        this.#value = this.parse(payload);
    }

    setValue(envVars: { [key: string]: string }): void {
        let value = this.defaultValue;

        // Is the property set in the environment
        if (this.envKey && envVars[this.envKey]) {
            value = envVars[this.envKey];
        } else if (envVars[this.name]) {
            value = envVars[this.name];
        }

        if (value) {
            this.value = value;
        } else if (this.isRequired) {
            return this.onError('Value isRequired but could not be set.');
        }
    }

    unsetValue(): void {
        this.#value = undefined;
    }

    isMatch(find: string): boolean {
        return !!(find === this.name || find === this.envKey);
    }

    protected onError(cause: string): void {
        const message = `${this.constructor.name} "${this.name}": ${cause}`;
        if (!this.errors) this.errors = [];

        const error = new Error(message);
        this.errors.push(error);

        throw error;
    }
};
