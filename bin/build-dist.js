const fs = require('fs');
const webpack = require('webpack');

const tinyLogger = require('./tinyLogger');
const getWebpackConfig = require('../webpack.config');

const packageName = 'node-config-service';
const packageVersion = '0.9.1';

const tl = tinyLogger(`  [${packageName}:build-dist]  `);
tl.info(`Starting dist build of ${packageName} v${packageVersion}...`);

const deleteDistFolder = ({ output }) => {
    // Remove dist directory to start fresh
    if (fs.existsSync(output.path)) {
        tl.info(`Path ${output.path} already exists. Deleting old dist.`);
        return fs.rmSync(output.path, { recursive: true });
    }

    return true;
};

const runWebpackBuild = async webpackConfig =>
    new Promise((resolve, reject) => {
        tl.info(`Building ${webpackConfig.mode} with webpack.`);
        webpack(webpackConfig, (error, stats) => {
            if (error || stats.hasErrors()) {
                tl.error(error);
                process.exit(1);
            }
            tl.info(`Build ${webpackConfig.mode} complete.`);
            resolve(webpackConfig.mode);
        });
    });

const getConfig = mode => getWebpackConfig({ mode });

const main = async () => {
    // Get webpack configs for each env mode
    const development = getConfig('development');
    const production = getConfig('production');

    deleteDistFolder(development);
    deleteDistFolder(production);

    await runWebpackBuild(development);
    await runWebpackBuild(production);
};

main();
