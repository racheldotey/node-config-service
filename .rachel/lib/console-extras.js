let logPrefix;


const init = prefix => {
    exports.setPrefix(prefix);
    return exports;
}

// Prepend log prefix log string
const prefix = args => {
    if (logPrefix) args.unshift(`${logPrefix} `);

    return args;
}

const setPrefix = (msgPrefix = false) => {
    logPrefix = (msgPrefix) ? `${msgPrefix}` : false;
    return exports;
}

const debug = (...args) => {
    console.debug.apply(console, prefix(args));
}

const error = (...args) => {
    console.error.apply(console, prefix(args));
}

const info = (...args) => {
    console.info.apply(console, prefix(args));
}

const log = (...args) => {
    console.log.apply(console, prefix(args));
}



// We are a clone of `window.console`
Object.assign(exports, console);
exports.init = init;
exports.setPrefix = setPrefix;
exports.debug = debug;
exports.error = error;
exports.info = info;
exports.log = log;



(function constructor() {
    logPrefix = false;
})();