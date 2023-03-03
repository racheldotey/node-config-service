export type IConfigPropertyParseFunction = (value: string) => any;

/**
 * @description
 * @interface IConfigPropertyOptions
 */
export interface IConfigPropertyOptions {
    envKey?: string;
    desc?: string;
    default?: string;
    required?: boolean;
    parse?: IConfigPropertyParseFunction;
    value?: any;
}

/**
 * @description
 * @interface IConfigProperty
 */
export class ConfigProperty {
    name: string;
    envKey: string | false;
    desc: string;
    default?: string;
    isDefined: boolean;
    isRequired: boolean;
    errors?: Error[];
    parse: IConfigPropertyParseFunction;
}