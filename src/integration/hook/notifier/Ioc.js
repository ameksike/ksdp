/**
 * @typedef {import('../types').THook} THook 
 * @typedef {import('../types').TSubscription} TSubscription 
 * @typedef {import('../types').TList} TList 
 */
class Ioc {
    /**
     * @type {THook}
     */
    hook;

    /**
     * @description class constructor
     * @param {TList} [cfg] 
     */
    constructor(cfg) {
        this.helper = cfg?.helper || null;
    }

    /**
     * @description Perform a custom action based on the parameters
     * @param {Object} payload 
     * @param {Date} payload.date 
     * @param {TList} payload.data
     * @param {TSubscription} payload.target 
     * @returns {*} result
     */
    run(payload) {
        const target = this.helper?.get(payload);
        return (target?.run instanceof Function) ? target.run(payload) : target;
    }
}

module.exports = Ioc;