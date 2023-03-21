/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ConfigProperty,
    ConfigPropertyOptions,
    ConfigPropertyParsedValue,
    nodeConfigProperty,
} from './property';
import { DEFAULT_PROPERTIES } from './constants';



type ConfigPropertyDefinitionsArray = ConfigPropertyOptions[];
type ConfigPropertyDefinitionsMap = { [key: string]: ConfigPropertyOptions; }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConfigOnErrorCallback = (...data: any[]) => void;
type ConfigPropertyManagerOptions = {
    silenceErrors?: boolean;
    logErrors?: boolean;
    logFunction?: ConfigOnErrorCallback;
    properties?: ConfigPropertyDefinitionsMap;
    includeDefaults?: boolean;
}
interface ConfigPropertyManager {
    silenceErrors?: boolean;
    logErrors?: boolean;
    logFunction?: ConfigOnErrorCallback;
    init(props?: ConfigPropertyDefinitionsMap, envValues?:  NodeJS.ProcessEnv | { [key: string]: string }): ConfigPropertyManager;
    get length(): number;
    get properties(): { [key: string]: ConfigProperty; };
    addProperty(name: string, options: ConfigPropertyOptions, safeAdd?: boolean): void;
    setProperties(propertyOptions: ConfigPropertyDefinitionsMap, resetProperties?: boolean): void;
    get(find?: string | string[] | boolean, throwIfUnset?: boolean): ConfigPropertyParsedValue | { [name: string]: ConfigPropertyParsedValue | undefined; } | undefined;
    getAll(throwIfUnset?: boolean): { [name: string]: ConfigPropertyParsedValue | undefined; };
    findOne(find: string, throwIfUnset?: boolean): ConfigPropertyParsedValue | undefined;
    findSeveral(names: string[], throwIfUnset?: boolean): {
        [name: string]: ConfigPropertyParsedValue | undefined;
    };
}


const nodeConfigPropertyManager = (options?: ConfigPropertyManagerOptions): ConfigPropertyManager => {

    let properties: { [key: string]: ConfigProperty; } = {};

    const manager: ConfigPropertyManager = {
        silenceErrors: false,
        logErrors: false,
        logFunction: console.error,


        init(props, envValues = process.env) {
            if (props) manager.setProperties(props);

            const processEnv = envValues || {};
            Object.values(properties).forEach((prop: ConfigProperty) => prop.setValue(processEnv));
            return manager;
        },

        get length() {
            return Object.keys(properties).length;
        },

        get properties() {
            if (properties) return properties;
            // Will throw error if properties were never set
            throw new Error('Config requested before initialization.');
        },

        addProperty(name, options, safeAdd = true) {
            const prop = nodeConfigProperty(name, options);

            if (safeAdd && properties[prop.name]) throw new Error(`Can't add new property "${prop.name}", it already exists.`);

            properties[prop.name] = prop;
        },

        setProperties(propertyOptions, resetProperties = false) {
            // Optionally clear default/loaded properties
            if (resetProperties === true) properties = {};

            Object.entries(propertyOptions).forEach(([key, options]) => {
                // If `name` is defined use that as the primary search key
                // otherwise use the object key for the options
                const prop = nodeConfigProperty(options.name || key, options);
                // Will override existing properties with the same name
                properties[prop.name] = prop;
            });
        },

        get(find = true, throwIfUnset) {
            if (find === true) return manager.getAll(throwIfUnset);
            if (typeof find === 'string') return manager.findOne(find, throwIfUnset);
            if (Array.isArray(find)) return manager.findSeveral(find, throwIfUnset);

            throw new Error('Bad config get request. Check your parameters and try again.');
        },

        getAll(_throwIfUnset) {
            return Object.fromEntries(
                Object.values(properties).map((prop: ConfigProperty) => [prop.name, prop.value])
            );
        },

        findOne(find, _throwIfUnset) {
            const found = properties?.[find] ||
                Object.values(properties).find((prop: ConfigProperty) => prop.isMatch(find));
            return (found) ? found.value : undefined;
        },

        findSeveral(find, _throwIfUnset) {
            return Object.fromEntries(
                find.map(name => {
                    const value = manager.findOne(name);
                    return [name, value];
                })
            );
        }
    };

    manager.silenceErrors = options?.silenceErrors ? true : false;
    manager.logErrors = options?.logErrors ? true : false;
    manager.logFunction = options?.logFunction ? options.logFunction : undefined;

    properties = {};

    if (options?.includeDefaults !== false) manager.setProperties({ ...DEFAULT_PROPERTIES });

    if (options?.properties) {
        manager.init(options.properties);
    }


    return manager;
};



export {
    ConfigOnErrorCallback,
    ConfigPropertyDefinitionsArray,
    ConfigPropertyDefinitionsMap,
    ConfigPropertyManager,
    ConfigPropertyManagerOptions,
    nodeConfigPropertyManager,
};