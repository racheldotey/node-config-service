/** Service Types */
export type ConfigOnErrorCallback = (...data: any[]) => void;

export interface ConfigPropertyDefinitionsMap {
    [key: string]: ConfigPropertyOptions;
}

export interface ConfigPropertyManagerOptions {
    silenceErrors?: boolean;
    logErrors?: boolean;
    logFunction?: ConfigOnErrorCallback;
    properties?: ConfigPropertyDefinitionsMap;
    includeDefaults?: boolean;
}

// @see https://blog.logrocket.com/writing-constructor-typescript/
export interface ConfigPropertyManagerConstructor {
    new(options?: ConfigPropertyManagerOptions): ConfigPropertyManagerInterface;
}

export interface ConfigPropertyManagerInterface {
    silenceErrors?: boolean;
    logErrors?: boolean;
    logFunction?: ConfigOnErrorCallback;
    init(props?: ConfigPropertyDefinitionsMap, envValues?: { [key: string]: string }): ConfigPropertyManagerInterface;
    get properties(): { [key: string]: ConfigPropertyInterface; };
    get length(): number;
    get(find: string | string[] | boolean): any;
    getAll(): any;
    getVerbose(): object;
    findOne(find: string): any;
    findSeveral(names: string[]): {
        [k: string]: any;
    };
    setProperties(propertyOptions: ConfigPropertyDefinitionsMap, resetProperties?: boolean): void;
}


/**
 * Property Types
 **/
export type ConfigPropertyParseValueMethod = (value: string) => any;

export interface ConfigPropertyOptions {
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
    value?: any;
    initValue?: any;
}

// @see https://blog.logrocket.com/writing-constructor-typescript/
export interface ConfigPropertyConstructor {
    new(name: string, options?: ConfigPropertyOptions): ConfigPropertyInterface;
}

export interface ConfigPropertyInterface {
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
    set defaultValue(payload: any);
    get value(): {
        [key: string]: string;
    };
    set value(payload: any);
    isMatch(find: string): boolean;
    setValue(envVars: NodeJS.ProcessEnv): void;
    unsetValue(): void;
}
