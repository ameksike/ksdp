/**
 * @typedef {({[name:String]:Object})} List 
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

/**
 * @typedef {Object} Event
 * @property {String|Number} [id]
 * @property {String} event
 * @property {String} description
 * @property {String} [payload]
 * @property {String} [group]
 * @property {String} [status]
 */

class SubscriberBase {
    /**
     * @description preformat subscriptions payload before precess the event
     * @param {*} payload 
     * @returns {*} formated payload
     */
    format(payload) {
        payload.date = new Date();
        return payload;
    }

    /**
     * @description Save subscription
     * @param {Subscription|Array<Subscription>} payload
     * @returns {Subscription|Array<Subscription>} subscribed
     */
    subscribe(payload) {
        return payload;
    }

    /**
     * @description remove subscriptions
     * @param {Subscription|Array<Subscription>} [payload=null]
     * @returns {Subscription|Array<Subscription>} succeed unsubscriptions
     */
    unsubscribe(payload = null) {
        return null;
    }

    /**
     * @description get the subscriptions list
     * @param {Subscription} [payload=null] - input data 
     * @return {Array<Subscription>} subscriptions
     */
    subscriptions(payload = null) {
        return null;
    }

    /**
     * @description get the event list
     * @param {List} [payload] 
     * @returns {Array<Event>} events
     */
    async events(payload = false) {
        return [];
    }
}

module.exports = SubscriberBase;