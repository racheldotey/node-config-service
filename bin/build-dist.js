#!/usr/bin/env node

'use strict';

// Crash on unhandled rejections.
process.on('unhandledRejection', error => {
    console.error(error);
    throw error;
});

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const { getPackageRootDir } = require('./utils/getPackageRootDir');
const { getTinyLogger } = require('./utils/getTinyLogger');
const getWebpackConfig = require('../webpack.config');

const tl = getTinyLogger(`  [build-dist]  `);
tl.info('// -----------------------------------------------');
tl.info('---------- Starting module build process ---------');

const NAME = 'node-config-service';
const VERSION = '0.9.1';
const DIR_ROOT = getPackageRootDir();
const DIR_SOURCE = path.join(DIR_ROOT, 'src');
const FILES_TO_COPY = ['index.d.ts'];

tl.info(`           > ${NAME} v${VERSION} ...`);

const getConfig = mode => getWebpackConfig({ mode });

const deleteDistFolder = path => {
    // Remove dist directory to start fresh
    if (fs.existsSync(path)) {
        tl.info(` - Deleting old dist.`);
        fs.rmSync(path, { recursive: true });
        tl.info(` -- Delete dist complete.`);
        return true;
    }

    return true;
};

const runWebpackBuild = async webpackConfig =>
    new Promise((resolve, reject) => {
        tl.info(` - Compiling ${webpackConfig.mode} with webpack.`);
        webpack(webpackConfig, (error, stats) => {
            if (error || stats.hasErrors()) {
                tl.error(error, stats.hasErrors());
                process.exit(1);
            }
            tl.info(` -- Compile ${webpackConfig.mode} complete.`);
            return resolve(webpackConfig.mode);
        });
    });

const copyOtherFiles = async (files, fromFolder, toFolder) => {
    await Promise.all(
        files.map(async file =>
            fs.copyFileSync(path.join(fromFolder, file), path.join(toFolder, file))
        )
    );
};

const main = async () => {
    // Get webpack configs for each env mode
    const development = getConfig('development');
    const production = getConfig('production');

    const distDev = development.output.path;
    const distProd = production.output.path;

    deleteDistFolder(distDev);
    if (distDev != distProd) deleteDistFolder(distProd);

    await runWebpackBuild(development);
    await runWebpackBuild(production);

    copyOtherFiles(FILES_TO_COPY, DIR_SOURCE, distDev);
    if (distDev != distProd) copyOtherFiles(FILES_TO_COPY, DIR_SOURCE, distProd);

    tl.info('------ The module build process is complete ------');
    tl.info('----------------------------------------------- //');
};

main();
