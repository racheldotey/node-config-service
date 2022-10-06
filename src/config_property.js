const configErrors = require('./errors');

const VALID_OPTIONS = Object.freeze([
    'key',
    'name',
    'desc',
    'default',
    'required',
    'parse',
    'debug',
    'sanitizeFilter',
]);

class ConfigProperty {
    /** @private */

    _key;       // Key to system process env property
    _name;      // Key used to find the property within the program.

    _desc = 'No description provided for this config property.';     // Description of this property used for logging.
    _default = null;        // Default value for this property
    _required = true;       // This must be set or it is invalid.
    _parse = val => val;    // Parse the sent property (all process .env vars are strings by default)

    _isDefined;    // Has this property been set/initialized.
    _value;     // Property value

    constructor() {
        const options = (arguments.length === 1) ? arguments[0] : arguments[1];

        const { key, name, desc, required, parse } = options;

        const envKey = (typeof arguments[0] === 'string') ? arguments[0] : key;

        if (!envKey) throw new configErrors.TypeError('Invalid env key sent to Config Property constructor.');

        this._key = envKey;
        this._name = name || envKey;
        if (desc) this._desc = desc;
        //if (options.default) this.default = options.default; // `default` is reserved so I couldn't deconstruct it.
        this._default = options.default; // `default` is reserved so I couldn't deconstruct it.

        this._required = required;
        this.parse = parse;
    }
}

/** Setters / Getters 
 * @public 
 **/

Object.defineProperty(ConfigProperty.prototype, 'key', {
    set: function (value) { return this._key = value; },
    get: function () { return this._key; }
});

Object.defineProperty(ConfigProperty.prototype, 'name', {
    set: function (value) { return this._name = value; },
    get: function () { return this._name; }
});

Object.defineProperty(ConfigProperty.prototype, 'desc', {
    set: function (value) { return this._desc = value; },
    get: function () { return this._desc; }
});

// This leans towards required=true whenever possible.
Object.defineProperty(ConfigProperty.prototype, 'required', {
    set: function (value) {
        return this._required = (value.toString().toLowerCase() === 'false') ? false : true;
    },
    get: function () { return (this._required); }
});

Object.defineProperty(ConfigProperty.prototype, 'parse', {
    set: function (method) {
        if (typeof method === 'function') return this._parse = method;
        else if (method)
            throw new configErrors.TypeError(`Invalid config property parse method defined. A function was expected but a ${(typeof method)} was received.`);
    },
    get: function () { return this._parse; }
});

Object.defineProperty(ConfigProperty.prototype, 'value', {
    set: function (envVars) {
        try {
            let value;
            if (envVars && envVars.hasOwnProperty(this._name)) {
                value = this._parse(envVars[this._name]);
            } else if (envVars && envVars.hasOwnProperty(this._key)) {
                value = this._parse(envVars[this._key]);
            } else if (!this._required) {
                value = this._parse(this._default);
            }

            if (!value)
                throw new configErrors.ReferenceError(`Config property ${this._key}/${this._name} is required but not defined in the environment.`)

            this._value = value;
            this._isDefined = true;

        } catch (error) {
            throw error;
        }
    },
    get: function () {
        if (this._isDefined) return this._value;
        throw new configErrors.ReferenceError(`Config property ${this._key}/${this._name} has been requested before it was initialized.`)
    }
});


ConfigProperty.prototype.isMatch = function (search) {
    return (search === this._name || search === this._key);
};

ConfigProperty.prototype.toString = function () {
    if (!this._isDefined)
        throw new configErrors.Error(`Config requested before initialization.`);

    // Returns key value object representation of config property
    return { [this._name]: this._value };
};



/** @public */
module.exports = ConfigProperty;