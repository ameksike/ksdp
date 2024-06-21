/**
 * @description Namespace resolution 
 * @param {any} src 
 * @param {String|null} name 
 * @param {Boolean} strict 
 */
function namespace(src, name = null, strict = false) {
    if (!name) return src;
    const ns = typeof (name) == 'string' ? name.split(".") : name;
    let target = src[ns[0]];
    for (let i = 1; i < ns.length; i++) {
        if (!target) {
            return !strict ? src : null;
        }
        target = target[ns[i]];
    }
    return !strict ? (target || src) : target;
}

module.exports = namespace;