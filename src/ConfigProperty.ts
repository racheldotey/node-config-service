import {
	IConfigProperty,
	ConfigPropertyConstructor,
	ConfigPropertyParseFunction,
	ConfigPropertyOptions,
} from './main';

/**
 * A single property value for the config.
 * @property {string} name - Key used to find the property within the program.
 * @property {string | false} envKey - Key to system process env property.
 * @property {string} desc - Description of this property used for logging.
 * @property {string | null} default - Default value for this property
 * @property {boolean} isDefined - Has this property been set/initialized.
 * @property {boolean} isRequired - This must be set or it is invalid.
 * @property {Error[] | undefined} errors - Array of errors that have occurred with this property.
 * @property {any} parse -  Parse the property (all process .env vars are strings by default)
 * @property {any} #value - Property value
 */
export const ConfigProperty: ConfigPropertyConstructor = class ConfigProperty
	implements IConfigProperty {
	name: string;
	envKey: string | false;
	desc: string;
	default?: string;
	isDefined: boolean;
	isRequired: boolean;
	errors?: Error[];
	parse: ConfigPropertyParseFunction;
	#value: any;

	/**
	 * Creates an instance of ConfigProperty.
	 * @param {string} name - Key used to look up this property in calling app.
	 * @param {ConfigPropertyOptions} [options={}]
	 * @memberof ConfigProperty
	 */
	constructor(name: string, options: ConfigPropertyOptions = {}) {
		this.name = name;
		this.envKey = options.envKey || options.key || false;
		this.desc = options.desc || '';
		this.default = options.default || undefined;
		this.isDefined = false;
		this.isRequired = options.required ?? true;
		this.parse = options.parse || (value => value);

		if (this.default) {
			this.#value = this.parse(this.default);
		}

		if (options.value) {
			this.#value = options.value;
			this.isDefined = true;
		}
	}

	get value() {
		if (!this.isDefined)
			throw new ReferenceError(
				`Config property "${this.name}" was requested before it was initialized.`
			);
		return this.#value;
	}

	set value(envVars: { [key: string]: string }) {
		this.setValue(envVars);
	}

	setValue(envVars: { [key: string]: string }) {
		// Was the value already set, possibly at init
		if (this.isDefined) return;

		var value = this.default;

		// Is the property set in the environment
		if (this.envKey && envVars[this.envKey]) {
			value = envVars[this.envKey];
		} else if (envVars[this.name]) {
			value = envVars[this.name];
		}

		if (value) {
			this.#value = this.parse(value);
			this.isDefined = true;
		} else if (this.isRequired) {
			throw new ReferenceError(
				`Config property "${this.name}" was required but not defined.`
			);
		}
	}

	isMatch(find: string) {
		if (!this.isDefined)
			throw new ReferenceError(
				`Config property "${this.name}" was requested before it was initialized.`
			);
		return find === this.name || find === this.envKey ? true : false;
	}

	getVerbose() {
		return {
			name: this.name,
			envKey: this.envKey,
			desc: this.desc,
			value: this.value,
			default: this.default,
			isDefined: this.isDefined,
			isRequired: this.isRequired,
			errors: this.errors || null,
			parse: this.parse
		}
	}
};
