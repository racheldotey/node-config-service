require('../lib/handle-process-events');

const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');

const console = require('../lib/console-extras').setPrefix('[config-update]');

const breathe = async (ms = 1500) => await new Promise((resolve) => setTimeout(resolve, ms));

(async function constructor() {
    console.info('* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *');
    console.info('* * * Begining Rachel\'s node development config update process... * * *');
    console.info('* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *');
    // If no path segments are passed, path.resolve()
    // will return the absolute path of the current working directory.
	// https://nodejs.org/api/path.html#pathresolvepaths
	const rootDir = path.resolve();
    console.log('App Root', ':', rootDir);

    // Get out configs
	const backupFiles = ['.eslintrc.json', '.npmc', 'package.json'];

    console.info('Creating a backup directory. All versions of your files will be saved there.');
    await breathe();
	let bin = path.resolve(rootDir, 'rachel', moment().format('YY-MM-DD'));

	// If we've already run once today, be more precise
	// https://github.com/jprichardson/node-fs-extra/blob/master/docs/pathExists-sync.md
	if (fs.pathExistsSync(bin))
		bin = path.resolve(rootDir, 'rachel', moment().format('YY-MM-DD-hh-mm-ss'));

	// Ensure we have our bin
	// https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureDir.md
	fs.ensureDir(bin, (error) => {
		console.error(error);
		process.exit(1);
	});

    console.log('Bin created', ':', bin);
    await breathe();
    console.info('Copying existing files to the backup folder.');

	// Copy old files with prefix 'old-' from root
	backupFiles.forEach(async (file) => {
		const name = `saved-${file}`;
		// https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy-sync.md
		fs.copySync(path.join(bin, file), path.join(bin, name));
        console.log(' [X] ', "`" + file + "` saved as `" + name + "`" );
        await breathe(500);
	});

    console.log('Backup complete.');
    await breathe();
    console.info('Copying existing files to the backup folder.');
	// Make new files in rachel

    console.log(' > ', bin);

    console.info('* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *');
    console.info('* * *               Config update process complete.                 * * *');
    console.info('* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *');
})();
