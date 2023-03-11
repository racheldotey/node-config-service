import * as dotenv from 'dotenv';

import type { ConfigPropertyManagerInterface, ConfigPropertyDefinitionsMap, ConfigPropertyManagerOptions } from './types';
import { ConfigPropertyManager } from './ConfigPropertyManager';


export class NodeConfigService extends ConfigPropertyManager {
	#dotenvLoaded?: boolean | false;
	#extraConfigs: {
		[key: string]: ConfigPropertyManagerInterface;
	};

	constructor(options?: ConfigPropertyManagerOptions) {
		super({
			...options,
		});
		this.#extraConfigs = { 'default': this };
	}

	init(props?: ConfigPropertyDefinitionsMap, envValues?: { [key: string]: string }) {
		this.loadEnv();
		return super.init(props, envValues);
	}

	loadEnv(options?: dotenv.DotenvConfigOptions) {
		if (this.#dotenvLoaded) return;

		// Load environment variables into process.env
		// @see https://www.npmjs.com/package/dotenv
		dotenv.config(options);
		this.#dotenvLoaded = true;
	}

	getConfig(key: string) {
		if (key === 'default') return this;
		return this.#extraConfigs[key] ?? undefined;
	}

	addConfig(key: string, options?: ConfigPropertyManagerOptions) {
		if (this.getConfig(key)) throw new Error(`A config named "${key}" is already defined.`);
		const newConfig = new ConfigPropertyManager(options);
		return this.#extraConfigs[key] = newConfig;
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
