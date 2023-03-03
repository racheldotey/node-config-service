import { ConfigProperty, IConfigProperty, ConfigPropertyOptions } from './ConfigProperty';


export type ConfigServiceLogFunction = (...data: any[]) => void;

export interface DefinePropertyOptions {
	[key: string]: ConfigPropertyOptions;
};

export interface ConfigServiceOptions {
	silenceErrors?: boolean;
	logErrors?: boolean;
	logFunction?: ConfigServiceLogFunction;
	properties?: DefinePropertyOptions;
}

// @see https://blog.logrocket.com/writing-constructor-typescript/
export interface ConfigServiceConstructor {
	new(options?: ConfigServiceOptions): IConfigService;
}

export interface IConfigService {
	silenceErrors?: boolean;
	logErrors?: boolean;
	logFunction?: ConfigServiceLogFunction;
	init(processEnv?: NodeJS.ProcessEnv): IConfigService;
	get properties(): {
		[key: string]: IConfigProperty;
	};
	get(...args: string[]): any;
	findOne(find: string): any;
	findSeveral(names: string[]): {
		[k: string]: any;
	};
}

export const ConfigService: ConfigServiceConstructor = class ConfigService implements IConfigService {
	silenceErrors?: boolean;
	logErrors?: boolean;
	logFunction?: ConfigServiceLogFunction;
	#properties: {
		[key: string]: IConfigProperty;
	};

	constructor(options: ConfigServiceOptions = { properties: {} }) {
		this.silenceErrors = (options.silenceErrors) ? true : false;
		this.logErrors = (options.logErrors) ? true : false;
		this.logFunction = (options.logFunction) ? options.logFunction : undefined;

		this.#properties = {};
		if(options.properties) {
			Object.entries(options.properties).forEach(([name, options]) => {
				const prop = new ConfigProperty(name, options);
				this.#properties[prop.name] = prop;
			});
		}
	}

	init(processEnv: NodeJS.ProcessEnv = process.env) {
		try {
			Object.values(this.#properties).forEach(prop => prop.setValue(processEnv));
			return this;
		} catch (error) {
			throw new Error('Could not set app config properties. Invalid process env sent ConfigService#init.');
		};
	}

	get properties() {
		// Will throw error if properties were never set
		if (this.#properties) return this.#properties;
		throw new Error('app config properties requested before initialization.');
	}

	get(...args: string[]) {
		if(!args.length) return this.findSeveral(Object.keys(this.#properties));

		if(args.length === 1) {
			return (Array.isArray(args[0])) ? this.findSeveral(args[0]) : this.findOne(args[0]);
		}

		return this.findSeveral(args);
	}

	findOne(find: string) {
		return this.#properties?.[find] || Object.values(this.#properties).find(prop => prop.isMatch(find));
	}

	findSeveral(names: string[]) {
		return Object.fromEntries(
			names.map((name) => {
				const prop = this.findOne(name);
				return [prop.name, prop.value];
			})
		);
	}
};



export default ConfigService;
