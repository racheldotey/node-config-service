const fs = require('fs-extra');
const path = require('path');


var app_root_dir_path, working_dir;


const init = (appRootDir, workingDir) => {
    exports.setAppRootDir(appRootDir);
    exports.setWorkingDir((workingDir) ? workingDir : '');
    return exports;
}


const findRootDir = () => {
    let currentDir = __dirname; // Start right here
    // If this folder doesnt have a `package.json`
    while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
        currentDir = path.join(currentDir, '..'); // Keep going
    }
    // It did! This is a `node.js` root directory
    return currentDir;
}

const setAppRootDir = dir => {
    app_root_dir_path = dir;
    exports.setWorkingDir();
    return exports;
}

const setWorkingDir = async (...args) => {
    working_dir = path.join(app_root_dir_path, ...args);
    return exports.ensureDir(...args);
}

const ensureDir = async (...args) => {
    return fs.ensureDir(path.join(app_root_dir_path, ...args));
}

const saveJson = async (file, data) => {
    return fs.outputJson(path.join(working_dir, file), data, { spaces: 4 });
}

const readJson = async (file) => {
    return fs.readJson(path.join(working_dir, file));
}

const getDirFiles = async (...args) => {
    var dir = working_dir;

    if (args.length) dir = path.join(app_root_dir_path, ...args);

    return fs.readdir(dir);
}

const existsInWorkspace = async (fileName) => {
    const files = await getDirFiles();
    return (files.includes(fileName));
}


exports.init = init;
exports.findRootDir = findRootDir;
exports.setAppRootDir = setAppRootDir;
exports.setWorkingDir = setWorkingDir;
exports.ensureDir = ensureDir;
exports.saveJson = saveJson;
exports.readJson = readJson;
exports.getDirFiles = getDirFiles;
exports.existsInWorkspace = existsInWorkspace;



(function constructor() {
    const dir = exports.findRootDir();
    exports.init(dir);
})();