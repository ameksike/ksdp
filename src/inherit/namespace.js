/**
 * @description Namespace resolution 
 * @param {Object} src 
 * @param {String} name 
 */
function namespace(src, name = null) {
    if (!name) return src;
    const ns = typeof (name) == 'string' ? name.split(".") : name;
    let target = src[ns[0]];
    for (let i = 1; i < ns.length; i++) {
        target = target[ns[i]];
    }
    return target || src;
}

module.exports = namespace;