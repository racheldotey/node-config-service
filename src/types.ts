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
    new(options?: ConfigManagerOptions): IConfigManager;
}

export interface IConfigManager {
    silenceErrors?: boolean;
    logErrors?: boolean;
    logFunction?: ConfigManagerLogFunction;
    init(props?: DefinePropertyOptions, envValues?: { [key: string]: string }): IConfigManager;
    get properties(): { [key: string]: IConfigProperty; };
    get(...args: string[]): any;
    findOne(find: string): any;
    findSeveral(names: string[]): {
        [k: string]: any;
    };
    getVerbose(): object;
}


/** Property Types */
export type ConfigPropertyParseFunction = (value: string) => any;

export interface ConfigPropertyOptions {
    name?: string;
    key?: string;
    envKey?: string;
    desc?: string;
    default?: string;
    required?: boolean;
    parse?: ConfigPropertyParseFunction;
    value?: any;
}

// @see https://blog.logrocket.com/writing-constructor-typescript/
export interface ConfigPropertyConstructor {
    new(name: string, options?: ConfigPropertyOptions): IConfigProperty;
}

export interface IConfigProperty {
    name: string;
    envKey: string | false;
    desc: string;
    default?: string;
    isDefined: boolean;
    isRequired: boolean;
    errors?: Error[];
    parse: ConfigPropertyParseFunction;
    get value(): {
        [key: string]: string;
    };
    set value(envVars: NodeJS.ProcessEnv);
    setValue(envVars: NodeJS.ProcessEnv): void;
    isMatch(find: string): boolean;
    getVerbose(): object;
}
