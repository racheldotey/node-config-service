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

const npmPackage = require('../package.json');
const tsconfig = require('../tsconfig.json');

const tl = getTinyLogger(`  [build-dist]  `);
tl.info('// -----------------------------------------------');
tl.info('---------- Starting module build process ---------');

const NAME = 'node-config-service';//npmPackage.name;
const VERSION = '0.9.0';//npmPackage.version;
const DIR_ROOT = getPackageRootDir();
const DIR_SOURCE = path.join(DIR_ROOT, 'src');
const FILES_TO_COPY = ['index.d.ts'];

tl.info(`           > ${NAME} v${VERSION} ...`);

const getConfig = mode => getWebpackConfig({ mode });

const deleteDir = path => {
    // Remove dist directory to start fresh
    if (fs.existsSync(path)) {
        tl.info(` - Deleting existing ${path}`);
        fs.rmSync(path, { recursive: true });
        tl.info(` -- Delete complete.`);
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

    const dirDist = production.output.path;
    const dirDistDev = development.output.path;
    const typesDir = 'types';//tsconfig.compilerOptions.outDir;

    deleteDir(typesDir);
    deleteDir(dirDist);
    if (dirDist != dirDistDev) deleteDir(dirDistDev);

    await runWebpackBuild(development);
    await runWebpackBuild(production);

    copyOtherFiles(FILES_TO_COPY, DIR_SOURCE, dirDist);
    if (dirDist != dirDistDev) copyOtherFiles(FILES_TO_COPY, DIR_SOURCE, dirDistDev);

    tl.info('------ The module build process is complete ------');
    tl.info('----------------------------------------------- //');
};

main();
