/**
 * @description allow inheritance based on imitation of classes or objects
 * @param {*} target 
 * @param {*} source 
 * @returns {*} target
 */
function imitate(target, source) {
    if (!source) {
        return target;
    }
    const src = typeof (source) === "function" ? source.prototype : source;
    const trg = (typeof (target) === "function" ? target.prototype : target) || {};

    if (typeof (target) !== typeof (source)) {
        const keys = Reflect.ownKeys(src);
        for (let key of keys) {
            if (key != "constructor") {
                Reflect.set(trg, key, Reflect.get(src, key));
            }
        }
        return target;
    }

    if (typeof (target) === "function") {
        return Reflect.setPrototypeOf(trg, src);
    }

    if (typeof (target) === "object") {
        return Object.assign(trg, src);
    }
}

module.exports = imitate;