import { ConfigServiceOptions, IConfigProperty } from './types';
import ConfigProperty from './ConfigProperty';

export class ConfigService {
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

export default ConfigService;
