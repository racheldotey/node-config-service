import { ConfigProperty } from './ConfigProperty';
import { DEFAULT_PROPERTIES } from './constants';
import {
    ConfigPropertyOptions,
    ConfigPropertyInterface,
    ConfigManagerOptions,
    ConfigManagerInterface,
    ConfigManagerConstructor,
    ConfigManagerLogFunction,
    DefinePropertyOptions
} from './types';

export const ConfigManager: ConfigManagerConstructor = class ConfigManager
    implements ConfigManagerInterface {
    silenceErrors?: boolean;
    logErrors?: boolean;
    logFunction?: ConfigManagerLogFunction;
    #properties: {
        [key: string]: ConfigPropertyInterface;
    };

    constructor(options?: ConfigManagerOptions) {
        this.silenceErrors = options?.silenceErrors ? true : false;
        this.logErrors = options?.logErrors ? true : false;
        this.logFunction = options?.logFunction ? options.logFunction : undefined;

        this.#properties = {};

        if(options?.includeDefaults !== false) this.setProperties({ ...DEFAULT_PROPERTIES });

        if (options?.properties) {
            this.setProperties(options.properties);
        }
    }

    init(props?: DefinePropertyOptions, envValues?: { [key: string]: string }) {
        if (props) this.setProperties(props);

        const processEnv = envValues || {};
        Object.values(this.#properties).forEach(prop => prop.setValue(processEnv));
        return this;
    }

    setProperties(propertyOptions: DefinePropertyOptions, resetProperties = false) {
        // Optionally clear default/loaded properties
        if (resetProperties === true) this.#properties = {};

        Object.entries(propertyOptions).forEach(([key, options]) => {
            // If `name` is defined use that as the primary search key
            // otherwise use the object key for the options
            const prop = new ConfigProperty(options.name || key, options);
            // Will override existing properties with the same name
            this.#properties[prop.name] = prop;
        });
    }

    addProperty(name: string, options: ConfigPropertyOptions, safeAdd = true) {
        const prop = new ConfigProperty(name, options);

        if (safeAdd && this.#properties[prop.name]) throw new Error(`Can't add new property "${prop.name}", it already exists.`);

        this.#properties[prop.name] = prop;
    }

    get length() {
        return Object.keys(this.#properties).length;
    }

    get properties() {
        if (this.#properties) return this.#properties;
        // Will throw error if properties were never set
        throw new Error('Config requested before initialization.');
    }

    get(find: string | string[] | boolean) {
        if (find === true) return this.getAll();
        if (typeof find === 'string') return this.findOne(find);
        if (Array.isArray(find)) return this.findSeveral(find);

        throw new Error('Bad config get request. Check your parameters and try again.');
    }

    getAll(): { [k: string]: { [key: string]: string; }; } {
        return Object.fromEntries(
            Object.values(this.#properties).map(prop => [prop.name, prop.value])
        );
    }

    findOne(find: string) {
        const found = this.#properties?.[find] ||
            Object.values(this.#properties).find(prop => prop.isMatch(find));
        return (found) ? found.value : undefined;
    }

    findSeveral(find: string[]) {
        return Object.fromEntries(
            find.map(name => {
                const value = this.findOne(name);
                return [name, value];
            })
        );
    }

    getVerbose() {
        // const verbose: { [key: string]: any; } = {}
        // Object.entries(this.properties).forEach(([key, prop]) => {
        //     verbose[key] = prop.getVerbose();
        // });
        // return verbose;
        return {};
    }
};
