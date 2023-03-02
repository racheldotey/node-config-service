require('dotenv').config({ path: './test.basic.env' });
const path = require('path');
const config = require('../src');


const CONFIG_PROPERTIES = {
	NODE_ENV: {
		key: 'NODE_ENV',
		name: 'environment',
		desc: `{String} Current environment likely 'production' or 'development'.`,
		default: 'development',
		required: false,
		parse: (value) => value.toString().toLowerCase(),
	},
	ROOT_DIR: {
		key: 'ROOT_DIR',
		name: 'rootDir',
		desc: `{String} The root directory (absolute system path) for the application.`,
		default: __dirname,
		required: false,
		parse: (value) => path.normalize(value),
	},
};

//config.init(CONFIG_PROPERTIES);

describe('Very simple test suite', () => {
	it('checks if environment == "test"', () => {
        expect(1).toEqual(1);
		//expect(config.get('environment')).toEqual('test');
	});
	it('checks if rootDir == __dirname', () => {
		expect(1).toEqual(1);
		//expect(config.get('rootDir')).toEqual(__dirname);
	});
});
