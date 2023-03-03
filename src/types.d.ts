export type ConfigPropertyParseFunction = (value: string) => any;

export interface ConfigPropertyOptions {
    envKey?: string;
    desc?: string;
    default?: string;
    required?: boolean;
    parse?: ConfigPropertyParseFunction;
    value?: any;
}

/**
 * @description
 * @interface ConfigProperty
 */
export interface IConfigProperty {
    name: string;
    envKey: string | false;
    desc: string;
    default?: string;
    isDefined: boolean;
    isRequired: boolean;
    errors?: Error[];
    parse: ConfigPropertyParseFunction;
}

export type ConfigServiceLogFunction = (value: any) => void;

export interface ConfigServiceOptions {
	silenceErrors?: boolean;
	logErrors?: boolean;
	logFunction?: ConfigServiceLogFunction;
}