const path = require('path');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');


const packageName = 'node-config-service';
const packageEntry = './src/index';
const packageVersion = '0.9.1';

const pathRoot = path.resolve(__dirname);
const pathDist = path.resolve(pathRoot, 'dist');
const pathTsConfig = path.resolve(pathRoot, 'tsconfig.json');
const dateBuilt = new Date();
const auxiliaryComment = `Node-Config-Service v${packageVersion} Copyright(c) 2021-${dateBuilt.getFullYear()} Rachel Dotey <https://github.com/racheldotey/node-config-service> MIT Licensed`;


const extractMode = (env = {}, argv = {}, defaultMode = 'production') => {
	var mode = defaultMode;
	if (argv.mode || argv.nodeEnv || env.mode || env.nodeEnv) {
		mode = argv.mode ?? argv.nodeEnv ?? env.mode ?? env.nodeEnv;
	} else {
		dotenv.config();
		mode = process.env.NODE_ENV ?? defaultMode;
	}
	if (!['development', 'production'].includes(mode)) mode = defaultMode;

	return mode;
};

module.exports = (env, argv) => {
	const mode = extractMode(env, argv);

    const config = {
        mode,
        entry: {
            'node-config-service': packageEntry
        },
        module: {
            rules: [
                {
                    test: /\.([cm]?ts|tsx)$/,
                    loader: 'ts-loader',
                    exclude: ['/node_modules/'],
                    options: { configFile: pathTsConfig },
                },
            ],
        },
        optimization: {
            minimize: false,
            minimizer: [new TerserPlugin({})],
        },
        output: {
            filename: `[name].js`,
            globalObject: 'this',
            library: {
                name: 'nodeConfigService',
                auxiliaryComment,
                type: 'umd',
                umdNamedDefine: true,
            },
            path: pathDist,
        },
        plugins: [
            new Dotenv({
                silent: false
            }),
        ],
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            extensionAlias: {
                '.js': ['.js', '.ts'],
                '.cjs': ['.cjs', '.cts'],
                '.mjs': ['.mjs', '.mts'],
            },
            fallback: {
                fs: false,
                os: false,
                path: false,
            },
        },
    };

	if (mode === 'production') {
		config.output.filename = 'index.min.js';
		config.optimization.minimize = true;
	} else {
		config.output.filename = 'index.js';
		config.devtool = 'inline-source-map';
		config.devServer = {
			open: true,
			host: 'localhost',
		};
	}

	console.info(`\n\r[${packageName}:webpack] Running in '${config.mode}' mode.\n\r`);

	return config;
};
