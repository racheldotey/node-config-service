const fs = require('fs-extra');
const path = require('path');

let app_root_dir_path, working_dir;

const init = (appRootDir, workingDir) => {
    exports.setAppRootDir(appRootDir);
    exports.setWorkingDir(workingDir ? workingDir : '');
    return exports;
};

const getAbsolutePath = (source) => path.resolve(exports.findRootDir(), source);
const findRootDir = () => {
    // path.resolve('./'); ?
    let currentDir = __dirname; // Start right here
    // If this folder doesnt have a `package.json`
    while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
        currentDir = path.join(currentDir, '..'); // Keep going
    }
    // It did! This is a `node.js` root directory
    return currentDir;
};

const setAppRootDir = (dir) => {
    app_root_dir_path = dir;
    exports.setWorkingDir();
    return exports;
};

const setWorkingDir = async (...args) => {
    working_dir = path.join(app_root_dir_path, ...args);
    return exports.ensureDir(...args);
};

const ensureDir = async (...args) => {
    return fs.ensureDir(path.join(app_root_dir_path, ...args));
};

const saveJson = async (file, data) => {
    return fs.outputJson(path.join(working_dir, file), data, { spaces: 4 });
};

const readJson = async (file) => {
    return fs.readJson(path.join(working_dir, file));
};

const getDirFiles = async (...args) => {
    let dir = working_dir;

    if (args.length) dir = path.join(app_root_dir_path, ...args);

    return fs.readdir(dir);
};

const existsInWorkspace = async (fileName) => {
    const files = await getDirFiles();
    return files.includes(fileName);
};

const readDirSync = (dir, ignore) => {
    const source = 0;
    let contents = fs.readdirSync(path.join(this.getRootDir(), dir));
    if (ignore) contents = contents.filter((file) => file !== ignore);
    return contents.map((file) => {
        return fs.statSync(path + '/' + file).isDirectory();
    });
};

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path + '/' + file).isDirectory();
    });
}

const filterFiles = (contents = []) =>
    contents.filter((file) => {
        console.log(file);
    });
const filterDirs = (contents = []) =>
    fs.readdirSync(testFolder).forEach((file) => {
        console.log(file);
    });

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

// const rootDir = path.resolve('./');

// const readDIR = async (dir) => fs.readdir(this.getAbsolutePath(dir));

// async getFiles(dir, fileList = []) {
//     const files = await fs.readdir(path.join(this.localPath(), dir));
//     for (const file of files) {
//         const stat = await fs.stat(path.join(this.localPath(), dir, file));
//         if (stat.isDirectory()) {
//             fileList = await this.getFiles(path.join(dir, file), fileList);
//         } else fileList.push(path.join(dir, file));
//     }
//     return fileList;
// }
