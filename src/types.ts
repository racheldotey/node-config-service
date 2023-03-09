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
    get(...args: string[]): any;
    findOne(find: string): any;
    findSeveral(names: string[]): {
        [k: string]: any;
    };
    getVerbose(): object;
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
    setValue(envVars: NodeJS.ProcessEnv): void;
    unsetValue(): void;
    isMatch(find: string): boolean;
    getVerbose(): object;
}
