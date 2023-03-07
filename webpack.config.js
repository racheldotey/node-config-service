const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

const TS_CONFIG = path.resolve(__dirname, 'tsconfig.json');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');
const YEAR = new Date().getFullYear();

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

module.exports = (env, argv) => {
    const mode = extractMode(env, argv);
    const isProduction = mode === 'production' ? true : false;

    console.info(`\n\r[node-config-service:build] Running webpack in '${mode}' mode.\n\r`);

    const config = {
        devtool: 'inline-source-map',
        entry: {
            'node-config-service': ['./src/index.ts'],
            'types': './src/types.ts',
        },
        module: {
            rules: [
                {
                    // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
                    // @see https://github.com/TypeStrong/ts-loader
                    test: /\.([cm]?ts|tsx)$/,
                    //use: 'ts-loader',
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: { configFile: TS_CONFIG },
                },
            ],
        },
        mode: mode,
        output: {
            //clean: true,
            filename: isProduction ? `[name].min.js` : `[name].js`,
            path: OUTPUT_DIR,
            globalObject: 'this',
            umdNamedDefine: true,
            library: {
                // all options under `output.library` can be used here
                name: 'NodeConfigService',
                type: 'umd',
                umdNamedDefine: true,
                //export: ['default', 'ConfigService'],
                auxiliaryComment: `[npm:node-config-service] Copyright(c) 2021-${YEAR} Rachel Dotey <https://github.com/racheldotey/node-config-service> MIT Licensed`,
            },
        },
        optimization: {
            minimize: isProduction,
            minimizer: [new TerserPlugin({})],
        },
        plugins: [
            new Dotenv(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(mode),
            }),
        ],
        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: ['.ts', '.tsx', '.js'],
            // Add support for TypeScripts fully qualified ESM imports.
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

    // @see https://webpack.js.org/configuration/devtool/
    /* if (!isProduction) {
        config.devtool = 'inline-source-map';
    } */

    return config;
};
