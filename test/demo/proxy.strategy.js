const KsDp = require('../..');

class Algorism extends KsDp.structural.Proxy {

    constructor(options) {
        super();
        this.configure(options);
    }

    configure(options) {
        this.type = options?.type || this.type || "Base64";
        this.scheme = options?.scheme || this.scheme || "encode";

        this.stg = this.stg || new KsDp.behavioral.Strategy({
            path: __dirname,
            default: this.scheme
        });
    }

    get(target, key) {
        const obj = this.stg.get({ name: this.type });
        if(!obj) {
            return null;
        }
        const res = Reflect.get(obj, key);
        return typeof(res) === "function" ? res.bind(obj) : res;
    }

    set(target, key, value) {
        const obj = this.stg.get({ name: this.type });
        if(obj) {
            obj[key] = value;
        }
    }
}

module.exports = Algorism;