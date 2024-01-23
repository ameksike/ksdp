/**
 * @typedef {import('../types').THook} THook 
 * @typedef {import('../types').TSubscription} TSubscription 
 * @typedef {import('../types').TList} TList 
 */
class NotifierBase {
    /**
     * @type {THook}
     */
    hook;

    /**
     * @description Perform a custom action based on the parameters
     * @param {Object} payload 
     * @param {Date} payload.date 
     * @param {TList} payload.data
     * @param {TSubscription} payload.target 
     * @returns {*} result
     */
    run(payload) {
        return payload;
    }
}
module.exports = NotifierBase;