class Ioc {
    constructor(cfg) {
        this.helper = cfg?.helper || null;
    }

    run(payload) {
        const target = this.helper?.get(payload);
        return (target?.run instanceof Function) ? target.run(payload) : target;
    }
}

module.exports = Ioc;