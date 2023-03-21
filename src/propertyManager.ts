import {
    ConfigProperty,
    ConfigPropertyOptions,
    ConfigPropertyParsedValue,
    newConfigProperty,
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
    init(props?: ConfigPropertyDefinitionsMap, envValues?: { [key: string]: string }): ConfigPropertyManager;
    get length(): number;
    get properties(): { [key: string]: ConfigProperty; };
    addProperty(name: string, options: ConfigPropertyOptions, safeAdd?: boolean): void;
    setProperties(propertyOptions: ConfigPropertyDefinitionsMap, resetProperties?: boolean): void;
    get(find: string | string[] | boolean): ConfigPropertyParsedValue | { [name: string]: ConfigPropertyParsedValue | undefined; } | undefined;
    getAll(): { [name: string]: ConfigPropertyParsedValue | undefined; };
    findOne(find: string): ConfigPropertyParsedValue | undefined;
    findSeveral(names: string[]): {
        [k: string]: ConfigPropertyParsedValue | undefined;
    };
}


const newConfigPropertyManager = (options?: ConfigPropertyManagerOptions): ConfigPropertyManager => {

    let properties: { [key: string]: ConfigProperty; } = {};

    const manager: ConfigPropertyManager = {
        silenceErrors: false,
        logErrors: false,
        logFunction: console.error,


        init(props?: ConfigPropertyDefinitionsMap, envValues?: { [key: string]: string }): ConfigPropertyManager {
            if (props) manager.setProperties(props);

            const processEnv = envValues || {};
            Object.values(properties).forEach((prop: ConfigProperty) => prop.setValue(processEnv));
            return this;
        },

        get length() {
            return Object.keys(properties).length;
        },

        get properties() {
            if (properties) return properties;
            // Will throw error if properties were never set
            throw new Error('Config requested before initialization.');
        },

        addProperty(name: string, options: ConfigPropertyOptions, safeAdd = true): void {
            const prop = newConfigProperty(name, options);

            if (safeAdd && properties[prop.name]) throw new Error(`Can't add new property "${prop.name}", it already exists.`);

            properties[prop.name] = prop;
        },

        setProperties(propertyOptions: ConfigPropertyDefinitionsMap, resetProperties = false): void {
            // Optionally clear default/loaded properties
            if (resetProperties === true) properties = {};

            Object.entries(propertyOptions).forEach(([key, options]) => {
                // If `name` is defined use that as the primary search key
                // otherwise use the object key for the options
                const prop = newConfigProperty(options.name || key, options);
                // Will override existing properties with the same name
                properties[prop.name] = prop;
            });
        },

        get(find: string | string[] | boolean = true): ConfigPropertyParsedValue | { [name: string]: ConfigPropertyParsedValue | undefined; } | undefined {
            if (find === true) return manager.getAll();
            if (typeof find === 'string') return manager.findOne(find);
            if (Array.isArray(find)) return manager.findSeveral(find);

            throw new Error('Bad config get request. Check your parameters and try again.');
        },

        getAll(): { [name: string]: ConfigPropertyParsedValue | undefined; } {
            return Object.fromEntries(
                Object.values(properties).map((prop: ConfigProperty) => [prop.name, prop.value])
            );
        },

        findOne(find: string): ConfigPropertyParsedValue | undefined {
            const found = properties?.[find] ||
                Object.values(properties).find((prop: ConfigProperty) => prop.isMatch(find));
            return (found) ? found.value : undefined;
        },

        findSeveral(find: string[]): { [name: string]: ConfigPropertyParsedValue | undefined; } {
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
        manager.setProperties(options.properties);
    }


    return manager;
};



export {
    ConfigOnErrorCallback,
    ConfigPropertyDefinitionsArray,
    ConfigPropertyDefinitionsMap,
    ConfigPropertyManager,
    ConfigPropertyManagerOptions,
    newConfigPropertyManager,
};