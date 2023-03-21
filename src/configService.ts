/* eslint-disable @typescript-eslint/no-unused-vars */
import * as dotenv from 'dotenv';

import { newConfigPropertyManager, ConfigPropertyManager, ConfigPropertyManagerOptions } from './propertyManager';


type ConfigService = {
	init(props?: ConfigPropertyDefinitionsMap, envValues?: { [key: string]: string }): void;
	loadEnv(options?: dotenv.DotenvConfigOptions): void;
	addConfig(key: string, options?: ConfigPropertyManagerOptions): ConfigPropertyManager;
	getConfig(key?: string): ConfigPropertyManager | undefined;
	deleteConfig(key: string): void;
}


const newConfigService = (options?: ConfigPropertyManagerOptions, envOptions?: dotenv.DotenvConfigOptions): ConfigService => {

	let dotenvLoaded = false;
	const extraConfigs: {
		[key: string]: ConfigPropertyManager;
	} = {};


	const service: ConfigService = {
		init(props?: ConfigPropertyDefinitionsMap, envValues?: { [key: string]: string }) {
			this.loadEnv();
			return super.init(props, envValues);
		},

		loadEnv(options?: dotenv.DotenvConfigOptions) {
			// Load environment variables into process.env
			// @see https://www.npmjs.com/package/dotenv
			dotenv.config(options);
			dotenvLoaded = true;
		},

		addConfig(key: string, options?: ConfigPropertyManagerOptions) {
			if (this.getConfig(key)) throw new Error(`A config named "${key}" is already defined.`);
			const newConfig = newConfigPropertyManager(options);
			return extraConfigs[key] = newConfig;
		},

		getConfig(key?: string) {
			return (!key || key === 'default') ? this : extraConfigs[key] ?? undefined;
		},

		deleteConfig(key: string) {
			if (key === 'default') throw new Error("Cannot delete default config.");
			if (extraConfigs[key]) {
				delete extraConfigs[key];
				return true;
			}
			return undefined;
		}
	};


	/* constructor(options?: ConfigPropertyManagerOptions, envOptions?: dotenv.DotenvConfigOptions) {
		super(options);
		extraConfigs = { 'default': this };
		this.loadEnv(envOptions);
	} */

	return service;
};



export {
	ConfigService,
	newConfigService,
};