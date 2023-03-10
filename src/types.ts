/** Service Types */
export type ConfigManagerLogFunction = (...data: any[]) => void;

export interface DefinePropertyOptions {
    [key: string]: ConfigPropertyOptions;
}

export interface ConfigManagerOptions {
    silenceErrors?: boolean;
    logErrors?: boolean;
    logFunction?: ConfigManagerLogFunction;
    properties?: DefinePropertyOptions;
}

// @see https://blog.logrocket.com/writing-constructor-typescript/
export interface ConfigManagerConstructor {
    new(options?: ConfigManagerOptions): ConfigManagerInterface;
}

export interface ConfigManagerInterface {
    silenceErrors?: boolean;
    logErrors?: boolean;
    logFunction?: ConfigManagerLogFunction;
    init(props?: DefinePropertyOptions, envValues?: { [key: string]: string }): ConfigManagerInterface;
    get properties(): { [key: string]: ConfigPropertyInterface; };
    get length(): number;
    get(find: string | string[] | boolean): any;
    getAll(): any;
    getVerbose(): object;
    findOne(find: string): any;
    findSeveral(names: string[]): {
        [k: string]: any;
    };
    setProperties(propertyOptions: DefinePropertyOptions, resetProperties?: boolean): void;
}


/**
 * Property Types
 **/
export type ConfigPropertyParseFunction = (value: string) => any;

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
    parse?: ConfigPropertyParseFunction;
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
    parse: ConfigPropertyParseFunction;
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
