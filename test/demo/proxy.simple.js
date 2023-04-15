const KsDp = require('../..');
const { Proxy: KsProxy } = KsDp.structural;

class SimpleProxy extends KsProxy {

    constructor(options) {
        super();
        this.configure(options);
    }

    configure(options) {
        this.methods = {};
        this.attributes = {};
    }

    get(target, key) {
        if (key in target.attributes) {
            return Reflect.get(target.attributes, key);
        }
        if (key in target.methods) {
            return Reflect.get(target.methods, key).bind(target);
        }
        return null;
    }

    set(target, key, value) {
        if (typeof (value) !== "function") {
            this.attributes[key] = value.toUpperCase();
        } else {
            this.methods[key] = value;
        }
    }
}

module.exports = SimpleProxy;