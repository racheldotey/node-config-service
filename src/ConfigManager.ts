import { ConfigProperty } from './ConfigProperty';
import { DEFAULT_PROPERTIES } from './constants';
import {
	ConfigPropertyOptions,
	IConfigProperty,
	ConfigManagerOptions,
	IConfigManager,
	ConfigManagerConstructor,
	ConfigManagerLogFunction,
	DefinePropertyOptions
} from './types';

export const ConfigManager: ConfigManagerConstructor = class ConfigManager
	implements IConfigManager {
	silenceErrors?: boolean;
	logErrors?: boolean;
	logFunction?: ConfigManagerLogFunction;
	#properties: {
		[key: string]: IConfigProperty;
	};

	constructor(options?: ConfigManagerOptions) {
		this.silenceErrors = options?.silenceErrors ? true : false;
		this.logErrors = options?.logErrors ? true : false;
		this.logFunction = options?.logFunction ? options.logFunction : undefined;

		this.#properties = {};
        this.setProperties({ ...DEFAULT_PROPERTIES });

		if (options?.properties) this.setProperties(options.properties);
	}

	init(props?: ConfigManagerOptions | DefinePropertyOptions, envValues?: { [key: string]: string }) {
		try {
			if (props) this.setProperties(props);

			const processEnv = envValues || {};
			Object.values(this.#properties).forEach(prop => prop.setValue(processEnv));
			return this;
		} catch (error) {
			throw error;
		}
	}

	setProperties(props: DefinePropertyOptions) {
		Object.entries(props).forEach(([key, options]) => {
			const prop = new ConfigProperty(options.name || key, options);
			this.#properties[prop.name] = prop;
		});
	}

	addProperty(name: string, options: ConfigPropertyOptions) {
		const prop = new ConfigProperty(name, options);
		this.#properties[prop.name] = prop;
	}

	get properties() {
		// Will throw error if properties were never set
		if (this.#properties) return this.#properties;
		throw new Error('app config properties requested before initialization.');
	}

	get(find: string | string[] | boolean) {
		if (find === true) return this.getAll();
		if (typeof find === 'string') return this.findOne(find);
		if (Array.isArray(find)) return this.findSeveral(find);

		throw new Error('Bad config get request. Check your parameters and try again.');
	}

	getAll() {
		return Object.fromEntries(
			Object.values(this.#properties).map(prop => [prop.name, prop.value])
		);
	}

	findOne(find: string) {
		const found = this.#properties?.[find] ||
			Object.values(this.#properties).find(prop => prop.isMatch(find));
		return (found) ? found.value : null;
	}

	findSeveral(find: string[] = []) {
		return Object.fromEntries(
			find.map(name => {
				const value = this.findOne(name);
				return [name, value];
			})
		);
	}
};
