import { ConfigProperty } from './ConfigProperty';
import {
	IConfigProperty,
	ConfigServiceOptions,
	IConfigService,
	ConfigServiceConstructor,
	ConfigServiceLogFunction,
} from './types';

export const ConfigService: ConfigServiceConstructor = class ConfigService
	implements IConfigService {
	silenceErrors?: boolean;
	logErrors?: boolean;
	logFunction?: ConfigServiceLogFunction;
	#properties: {
		[key: string]: IConfigProperty;
	};

	constructor(options: ConfigServiceOptions = { properties: {} }) {
		this.silenceErrors = options.silenceErrors ? true : false;
		this.logErrors = options.logErrors ? true : false;
		this.logFunction = options.logFunction ? options.logFunction : undefined;

		this.#properties = {};
		if (options.properties) {
			Object.entries(options.properties).forEach(([key, options]) => {
				const prop = new ConfigProperty(options.name || key, options);
				this.#properties[prop.name] = prop;
			});
		}
	}

	init(processEnv: NodeJS.ProcessEnv = process?.env || {}) {
		try {
			Object.values(this.#properties).forEach(prop => prop.setValue(processEnv));
			return this;
		} catch (error) {
			throw new Error(
				'Could not set app config properties. Invalid process env sent ConfigService#init.'
			);
		}
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
