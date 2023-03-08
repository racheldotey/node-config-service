const tinyLogger = (x = '') => {
    const R = '\n\r';
    const P = x.toString();
    var p = x.toString();

    return {
        prefix: (x = '') => p = P + x.toString(),
        info: (...n) => console.info(p, ...n),
        debug: (...n) => console.debug(p, ...n),
        error: (...n) => console.error(R, p, ...n, R),
    };
};

/** @example
 * ```js
 *     const log = tinyLogger('  [running-build] ');
 * ```
 */

module.exports = tinyLogger;
module.exports.tinyLogger = tinyLogger;
module.exports.default = tinyLogger;