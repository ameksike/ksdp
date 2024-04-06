const imitate = require('./imitate');
const namespace = require('./namespace');

/**
 * @description Identify if target is a Function or a Class definition
 * @param {Object|Function} target 
 * @returns {Boolean} 
 */
function isClass(target) {
    return target && typeof target === 'function' && /^\s*class\s+/.test(target.toString());
}

/**
 * @description Get class name from target
 * @param {Object|Function} target 
 * @returns {String} name
 */
function className(target) {
    if (target && typeof target === 'object') {
        return target.constructor?.name || target?.name;
    }
    return target?.name;
}

module.exports = {
    imitate,
    namespace,
    ns: namespace,
    isClass,
    className
};