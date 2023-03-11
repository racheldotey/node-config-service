/** @example
 * ```js
 *     const log = getTinyLogger('  [running-build] ');
 * ```
 */
const getTinyLogger = (x = '') => {
    const R = '\n\r';
    const P = x.toString();
    var p = x.toString();

    const tinyLogger = {
        prefix: (x = '') => (p = P + x.toString()),
        info: (...n) => console.info(p, ...n),
        debug: (...n) => console.debug(p, ...n),
        error: (...n) => console.error(R, p, ...n, R),
    };

    /* const makeChainable = (method, chained) => (...args) => {
        method(...args);
        return chained;
    }; */

    return tinyLogger;
};

module.exports.getTinyLogger = getTinyLogger;