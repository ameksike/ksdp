/**
 * @typedef {{[name:String]: *}} List 
 * 
 * @typedef {Object} Subscription
 * @property {String|Number} [id]
 * @property {String} event
 * @property {String} notifier
 * @property {String} value
 * @property {String} [owner]
 * @property {String} [group]
 * @property {String} [status]
 * @property {Date} [date]
 * @property {String} [processor]
 * @property {String} [expression]
 * @property {String} [subscriber]
 */
class NotifierBase {
    /**
     * @description Perform a custom action based on the parameters
     * @param {Object} payload 
     * @param {Date} payload.date 
     * @param {List} payload.data
     * @param {Subscription} payload.target 
     * @returns {*} result
     */
    run(payload) {
        return payload;
    }
}
module.exports = NotifierBase;