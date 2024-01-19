/**
 * @typedef {({[name:String]:Object} | Array)} List 
 **/

/**
 * @typedef {Object} Subscription
 * @property {*} [data]
 * @property {*} [value]
 * @property {String} event
 * @property {String} [notifier]
 * @property {String} [subscriber]
 * @property {String} [expression]
 * @property {String} [processor]
 * @property {String} [group]
 * @property {Number} [owner]
 * @property {Number} [status]
 * @property {Number} [id]
 * @property {Date} [date]
 * @property {Function} [onPreTrigger] - formater action to run before process the event but after the subscriber format action
 * @property {Function} [onPosTrigger] - formater action to run after process the event action
 **/

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