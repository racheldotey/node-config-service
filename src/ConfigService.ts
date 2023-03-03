type ConfigServiceLogFunction = (value: any) => void;

interface ConfigServiceOptions {
	silenceErrors?: boolean;
	logErrors?: boolean;
	logFunction?: ConfigServiceLogFunction;
}

class ConfigService {
	options: ConfigServiceOptions;
	properties: Array<ConfigProperty>;

	constructor(options: ConfigServiceOptions = {}) {
		this.options = {
			silenceErrors: false,
			logErrors: false,
			logFunction: console.log,
			...options,
		};

        this.properties = [];
	}
}

module.exports = exports = ConfigService;
