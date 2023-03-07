const path = require('path');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

const production = process.env.NODE_ENV === 'production' || false;

module.exports = {
	entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
		fallback: {
			"fs": false,
			"os": false,
			"path": false
		},
    },
    mode: 'production',
    output: {
        filename: production ? 'node-config-service.min.js' : 'node-config-service.js',
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'this',
        library: 'DisableWith',
        libraryExport: 'default',
        libraryTarget: 'umd'
    },
    optimization: {
        minimize: production,
        minimizer: [
            new TerserPlugin({})
        ]
    },
	plugins: [
	  new Dotenv()
	],
};
