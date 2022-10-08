const fs = require('fs-extra');
const path = require('path');

const rootDir = path.resolve('./');
const getAppRootDirectory = () => path.resolve('./');
const getAbsolutePath = (source) => path.resolve(this.getAppRootDirectory(), source);

const readDIR = async (dir) => fs.readdir(this.getAbsolutePath(dir));

const readDirSync = (dir, ignore) => {
    const source =
    var contents = fs.readdirSync(path.join(this.getRootDir(), dir));
    if(ignore) contents = contents.filter(file => (file !== ignore));
    return contents.map(file => {
        return fs.statSync(path+'/'+file).isDirectory();
      });
}

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
      return fs.statSync(path+'/'+file).isDirectory();
    });
  }

const filterFiles = (contents = []) => contents.filter((file) => {
		console.log(file);
	});
const filterDirs = (contents = []) =>
	fs.readdirSync(testFolder).forEach((file) => {
		console.log(file);
	});

module.exports = {
	rootDir,
    getAppRootDirectory,
	getRootDir: getAppRootDirectory,
};



async getFiles(dir, fileList = []) {
    const files = await fs.readdir(path.join(this.localPath(), dir));
    for (const file of files) {
        const stat = await fs.stat(path.join(this.localPath(), dir, file));
        if (stat.isDirectory()) {
            fileList = await this.getFiles(path.join(dir, file), fileList);
        } else fileList.push(path.join(dir, file));
    }
    return fileList;
}