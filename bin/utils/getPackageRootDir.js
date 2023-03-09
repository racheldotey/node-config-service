const fs = require('fs');
const path = require('path');

const getPackageRootDir = () => {
    // path.resolve('./'); ?
    let currentDir = __dirname; // Start right here
    // If this folder doesnt have a `package.json`
    while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
        currentDir = path.join(currentDir, '..'); // Keep going
    }
    // It did! This is a `node.js` root directory
    return currentDir;
};

module.exports.getPackageRootDir = getPackageRootDir;
