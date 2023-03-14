import * as dotenv from 'dotenv';

import type { ConfigPropertyManagerInterface, ConfigPropertyDefinitionsMap, ConfigPropertyManagerOptions } from './types';
import { ConfigPropertyManager } from './ConfigPropertyManager';


export class NodeConfigService extends ConfigPropertyManager {
	#dotenvLoaded?: boolean | false;
	#extraConfigs: {
		[key: string]: ConfigPropertyManagerInterface;
	};

	constructor(options?: ConfigPropertyManagerOptions, envOptions?: dotenv.DotenvConfigOptions) {
		super(options);
		this.#extraConfigs = { 'default': this };
		this.loadEnv(envOptions);
	}

	init(props?: ConfigPropertyDefinitionsMap, envValues?: { [key: string]: string }) {
		this.loadEnv();
		return super.init(props, envValues);
	}

	loadEnv(options?: dotenv.DotenvConfigOptions) {
		// Load environment variables into process.env
		// @see https://www.npmjs.com/package/dotenv
		dotenv.config(options);
		this.#dotenvLoaded = true;
	}

	addConfig(key: string, options?: ConfigPropertyManagerOptions) {
		if (this.getConfig(key)) throw new Error(`A config named "${key}" is already defined.`);
		const newConfig = new ConfigPropertyManager(options);
		return this.#extraConfigs[key] = newConfig;
	}

	getConfig(key?: string) {
		return (!key || key === 'default') ? this : this.#extraConfigs[key] ?? undefined;
	}

	deleteConfig(key: string) {
		if (key === 'default') throw new Error("Cannot delete default config.");
		if (this.#extraConfigs[key]) {
			delete this.#extraConfigs[key];
			return true;
		}
		return undefined;
	}
}
