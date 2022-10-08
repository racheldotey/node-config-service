const moment = require('moment');


// https://momentjs.com/docs/#/displaying
const FORMAT = {
    'datePrefix': 'YYYYMMDD',
    'timePrefix': 'YYYYMMDDhhmmss',
    'dateStamp': 'MMMM Do YYYY',            // October 5th 2022
    'timeStamp': 'MMMM Do YYYY, h:mm:ss a'  // October 5th 2022, 12:58:43 pm
};

var frozen;


const init = (...args) => {
    frozen = moment(...args);
    return exports;
}


const freeze = (...args) => {
    frozen = moment(...args);
    return exports;
}

const now = (...args) => {
    return moment(...args);
}

const iso = (...args) => {
    return moment(...args).format();
}

const getPrefix = (verbose = false) => {
    return frozen.format((verbose) ? FORMAT.timePrefix : FORMAT.datePrefix);
}

const getStamp = (verbose = false) => {
    return frozen.format((verbose) ? FORMAT.timeStamp : FORMAT.dateStamp);
}

const prefix = (string = '', verbose = false) => {
    return exports.getPrefix(verbose) + string;
}

// {
//     years: 2015
//     months: 6
//     date: 26,
//     hours: 1,
//     minutes: 53,
//     seconds: 14,
//     milliseconds: 600
// }
const toObject = function (...args) {
    return moment(...args).toObject();
}



exports.init = init;
exports.freeze = freeze;
exports.now = now;
exports.iso = iso;
exports.getPrefix = getPrefix;
exports.getStamp = getStamp;
exports.prefix = prefix;
exports.toObject = toObject;



(function constructor() {
    init();
})();