const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

const TS_CONFIG = path.resolve(__dirname, 'tsconfig.json');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');
const auxiliaryComment = `[npm:node-config-service] Copyright(c) 2021-${new Date().getFullYear()} Rachel Dotey <https://github.com/racheldotey/node-config-service> MIT Licensed`;



const extractMode = (env, argv, defaultMode = 'development') => {
	var mode = defaultMode;
	if (argv.mode || env.mode) {
		mode = argv.mode ?? env.mode;
	} else {
		dotenv.config();
		mode = process.env.NODE_ENV ?? defaultMode;
	}
	if (!['development', 'production'].includes(mode)) mode = defaultMode;

	return mode;
};



const config = {
	devServer: {
		open: true,
		host: 'localhost',
	},
	entry: {
		'node-config-service': './src/index.ts',
		//'types': './src/types.ts',
	},
	module: {
		rules: [
			{
				// all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
				// @see https://github.com/TypeStrong/ts-loader
				test: /\.([cm]?ts|tsx)$/,
				loader: 'ts-loader',
				exclude: ['/node_modules/'],
				options: { configFile: TS_CONFIG },
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},

			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
	},
	output: {
		clean: true,
		filename: `[name].js`,
		// path: OUTPUT_DIR,
		// globalObject: 'this',
		library: {
			name: 'NodeConfigService',
			type: 'umd',
			umdNamedDefine: true,
			export: 'default', //['default', 'NodeConfigService'],
			auxiliaryComment,
		},
	},
	plugins: [
		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
	},
};

module.exports = (env, argv) => {
	const mode = extractMode(env, argv);
	const isProduction = mode === 'production' ? true : false;

	console.info(`\n\r[node-config-service:build] Running webpack in '${mode}' mode.\n\r`);

	if (isProduction) {
		config.mode = 'production';
		//config.output.filename = '[name].min.js';
	}

	return config;
};
