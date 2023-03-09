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

            // `isRequired` takes presentence over `required`
            if (options.required) this.isRequired = getSafeBoolean(options.required);

            if (typeof options.parse === "function") this.parse = options.parse;

            // `defaultValue` takes presentence over `defaultValue`
            if (options.defaultValue || options.default) {
                this.defaultValue = options.defaultValue || options.default;
            }

            // `initValue` takes presentence over `value`
            if (options.initValue || options.value) {
                this.value = options.value;
            }
        }
    }

    get isDefined() {
        return !!this.#value;
    }

    get defaultValue() {
        return this.#defaultValue;
    }

    set defaultValue(payload: any) {
        this.#defaultValue = payload;
        if (!this.isDefined) this.value = this.defaultValue;
    }

    get value() {
        if (!this.isDefined) {
            const message = `Config property "${this.name}" requested before it was set.`;
            throw new Error(message);
        }
        return this.#value;
    }

    set value(payload: any) {
        this.#value = this.parse(payload);
    }

    setValue(envVars: { [key: string]: string }) {
        var value = this.defaultValue;

        // Is the property set in the environment
        if (this.envKey && envVars[this.envKey]) {
            value = envVars[this.envKey];
        } else if (envVars[this.name]) {
            value = envVars[this.name];
        }

        if (value) {
            this.value = value;
        } else if (this.isRequired) {
            const message = `Config property "${this.name}" was required but not defined.`;
            throw new Error(message);
        }
    }

    isMatch(find: string) {
        if (!this.isDefined) {
            const message = `Config property "${this.name}" was requested before it was initialized.`;
            throw new Error(message);
        }
        return find === this.name || find === this.envKey ? true : false;
    }

    get() {
        return {
            name: this.name,
            description: this.description,
            value: this.value
        };
    }

    getVerbose() {
        return {
            name: this.name,
            envKey: this.envKey,
            desc: this.description,
            value: this.value,
            default: this.defaultValue,
            isDefined: this.isDefined,
            isRequired: this.isRequired,
            errors: this.errors || [],
            parse: this.parse
        };
    }
};
