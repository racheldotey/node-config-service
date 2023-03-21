const console = require('./console-extras');
const fsUtils = require('./utils-fs');


let modulePackage = require('../package.json');
console.log(modulePackage);

const package = {
	"name": "node-eslint-generator",
	"version": "7.7.7",
	"description": "Generate an eslint config for your next project.",
	"main": "./index.js",
	"license": "MIT",
	"author": modulePackage.author,
	"homepage": modulePackage.homepage,
	"repository": modulePackage.repository,
	"bugs": modulePackage.bugs,
	"keywords": [
		"eslint",
		"node"
	]
};


const makePackageFile = async () => {
    console.info(`Starting eslint package update process.`);

    const data = await fsUtils.readJson('npm_packages_filtered.json');

    const devDependencies = Object.fromEntries(data.packages.map(p => [ p.name, p.version ]));

    await fsUtils.saveJson('eslint-package.json', { ...package, devDependencies });

    return packages;
}



exports.default = makePackageFile;
exports.makePackageFile = makePackageFile;