import {
    IConfigProperty,
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
    implements IConfigProperty {
    name: string;
    envKey: string | false;
    description: string;
    defaultValue?: string;
    isDefined: boolean;
    isRequired: boolean;
    errors?: Error[];
    parse: ConfigPropertyParseFunction;
    #value: any;

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
        this.isDefined = false;
        this.isRequired = false;
        this.parse = value => value;

        // Optional parameters
        if (options) {
            this.envKey = options.envKey || options.key || this.envKey;
            this.description = options.description || options.desc || this.description;

            // `isRequired` takes presentence over `required`
            if (options.required) this.isRequired = getSafeBoolean(options.required);

            if (typeof options.parse === "function") this.parse = options.parse;

            // `defaultValue` takes presentence over `defaultValue`
            if (options.defaultValue || options.default) {
                this.defaultValue = options.defaultValue || options.default;
                this.value = this.defaultValue;
            }

            // `initValue` takes presentence over `value`
            if (options.initValue || options.value) {
                this.value = options.value;
            }
        }
    }

    get value() {
        if (!this.isDefined)
            throw new ReferenceError(
                `Config property "${this.name}" requested before it was set.`
            );
        return this.#value;
    }

    set value(payload: any) {
        this.#value = this.parse(payload);
        this.isDefined = true;
    }

    setValue(envVars: { [key: string]: string }) {
        // Was the value already set, possibly at init
        // if (this.isDefined) return;

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
            throw new ReferenceError(
                `Config property "${this.name}" was required but not defined.`
            );
        }
    }

    isMatch(find: string) {
        if (!this.isDefined)
            throw new Error(
                `Config property "${this.name}" was requested before it was initialized.`
            );
        return find === this.name || find === this.envKey ? true : false;
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
            errors: this.errors || null,
            parse: this.parse
        }
    }
};
