import * as dotenv from 'dotenv';

import type { ConfigManagerInterface, DefinePropertyOptions, ConfigManagerOptions } from './types';
import { ConfigManager } from './ConfigManager';


export class ConfigService extends ConfigManager {
	#dotenvLoaded?: boolean | false;
	#extraConfigs: {
		[key: string]: ConfigManagerInterface;
	};

	constructor(options?: ConfigManagerOptions) {
		super({
			...options,
		});
		this.#extraConfigs = { 'default': this };
	}

	init(props?: DefinePropertyOptions, envValues?: { [key: string]: string }) {
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

	addConfig(key: string, options?: ConfigManagerOptions) {
		if (this.getConfig(key)) throw new Error(`A config named "${key}" is already defined.`);
		const newConfig = new ConfigManager(options);
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
