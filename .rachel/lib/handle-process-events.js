const console = require('./console-extras');



const cleanup = () => {
    console.log('Cleaning up.');
    // Reset changes made to package.json files.
    //cp.execSync(`git checkout -- packages/*/package.json`);
    // Uncomment when snapshot testing is enabled by default:
    // rm ./template/src/__snapshots__/App.test.js.snap
};

const handleStart = () => {
    cleanup();
    console.log('Starting without error.');
    process.exit();
};

const handleExit = () => {
    cleanup();
    console.log('Exiting without error.');
    process.exit();
};

const handleError = e => {
    console.error('ERROR! An error was encountered while executing');
    console.error(e);
    cleanup();
    console.log('Exiting with error.');
    process.exit(1);
};



process.on('SIGHUP', handleStart);
process.on('SIGINT', handleExit);
process.on('SIGUSR2', handleExit);
process.on('uncaughtException', handleError);



exports.cleanup = cleanup;
exports.handleStart = handleStart;
exports.handleExit = handleExit;
exports.handleError = handleError;