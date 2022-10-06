const configErrors = require('./errors');
const ConfigProperty = require('./config_property');

const CONFIG_PROPERTIES = require('./default-properties');

const VALID_OPTIONS = Object.freeze([
    'properties',
    'silenceErrors',
    'logErrors',
    'logFunction',
]);

class ConfigService {
    /** @private */

    _options;
    _processEnv;
    _overrideEnv;

    _properties;

    constructor(options = {}) {
        this._options = Object.assign({
            silenceErrors: false,
            logErrors: false,
            logFunction: console.log
        }, options);

        this._processEnv = process.env;

        this.properties = (this._options.properties) ? this._options.properties : CONFIG_PROPERTIES;
    }
}


Object.defineProperty(ConfigService.prototype, 'properties', {
    set: function (defineVariables) {
        try {
            this._properties = [];
            Object.entries(defineVariables).forEach(([envVarKey, appVarOptions]) => {
                var prop = new ConfigProperty(envVarKey, appVarOptions);
                this._properties.push(prop);
            });
        } catch (error) {
            throw new configErrors.Error('Could not define app config properties. Invalid variable options.', error);
        }
    },
    get: function () {
        // Will throw error if properties were never set
        if (this._properties) return this._properties;
        throw new configErrors.Error('app config properties requested before initialization.');
    }
});



ConfigService.prototype.set = function (key, value) {
    if (VALID_OPTIONS.indexOf(key) === -1) {
        throw new configErrors.Error(`\`${key}\` is an invalid option.`);
    }

    if (arguments.length === 1) {
        return this._options[key];
    }

    this._options[key] = value;

    return this;
};

ConfigService.prototype.init = function (systemVariables) {
    try {
        console.debug(systemVariables)
        this.properties = systemVariables;
        this._properties.forEach(prop => prop.value = this._processEnv);
        return this;
    } catch (error) {
        throw new configErrors.Error('Could not set app config properties. Invalid process env sent ConfigService#init.', error);
    }
};

ConfigService.prototype.findOne = function (name = '') { //, silenceError = false) {
    const config = this.properties;
    var found = config.find(prop => prop.isMatch(name));
    console.debug(`\n\nIN findOne(${name}) = `);
    console.debug(found)
    return found;
};

ConfigService.prototype.findSeveral = function (names = '') { //, silenceError = false) {
    return Object.fromEntries(names.map(name => {
        const prop = this.findOne(name);
        return [prop.name, prop.value];
    }));
};

ConfigService.prototype.get = function (name = '') { //, silenceError = false) {
    console.debug(`\n\nIN getVariable(${name})`);

    switch (true) {
        case (!name):
            console.debug(`\n\nIN getVariable(${name}) = (!name)`);
            return this.toString();

        case (typeof name === 'string'):
            console.debug(`\n\nIN getVariable(${name}) = (typeof name === 'string')`);
            var prop = this.findOne(name);
            var value = prop.value;

            if (prop) return value; // Could be undefined

            throw new configErrors.Error(`Could not find required config variable named ${name}`);

        case (Array.isArray(name)):
            console.debug(`\n\nIN getVariable(${name}) = (Array.isArray(name))`);
            var foundProps = this.findSeveral(name);
            return foundProps;
            /* var varsObject = this.toString(foundProps);

            if (name.length === foundProps.length) return varsObject;

            var difference = name.filter(x => Object.keys(varsObject).indexOf(x) === -1);
            throw new configErrors.Error(`Could not find required config properties named ${difference}`); */

        default:
            console.debug(`\n\nIN getVariable(${name}) default Error`);
            throw new configErrors.Error('Unable to get config variable', new TypeError(`app config#getVariable was called with invalid param ${typeof name}`));
    }
};

ConfigService.prototype.toString = function (propArray = []) {
    console.debug('\n\ntoString')
    // Returns key value object representation of config properties
    const configArray = (propArray) ? propArray : this._properties;
    console.debug(propArray)
    console.debug(this._properties)
    console.debug(configArray)
    return Object.fromEntries(configArray.map((prop) => [prop.name, prop.value]));
};



/** @public */
module.exports = ConfigService;