/**
 * @typedef {({[name:String]:Object} | Array)} List 
 **/

/**
 * @typedef {Object} Subscription
 * @property {Number} [id]
 * @property {String} event
 * @property {*} [value]
 * @property {String} [data]
 * @property {String} [notifier]
 * @property {String} [group]
 * @property {Number} [owner]
 * @property {Number} [status]
 * @property {String} [processor]
 * @property {String} [expression]
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

class Memory {

    #db;
    constructor() {
        this.#db = {};
    }

    /**
     * @description preformat subscriptions payload before precess the event
     * @param {*} payload 
     * @returns {*}
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
        if (!payload) {
            return null;
        }
        const event = payload.event || "default";
        this.#db[event] = this.#db[event] || [];
        const id = payload.id || this.#db[event].length;
        this.#db[event][id] = {
            notifier: payload.target || payload.notifier,
            value: payload.value,
            owner: payload.owner
        };
        return this.#db[event][id];
    }

    /**
     * @description Remove subscription
     * @param {Subscription|Array<Subscription>} payload
     * @returns {Subscription|Array<Subscription>} unsubscription
     */
    unsubscribe(payload) {
        if (!payload) {
            return null;
        }
        const event = payload.event || "default";
        this.#db[event] = this.#db[event] || [];
        const id = payload.id || this.#db[event].length;
        const res = this.#db[event][id];
        return res;
    }

    /**
     * @description get the subscriptions list
     * @param {Subscription} payload - input data 
     * @return {Array<Subscription>} subscriptions
     */
    subscriptions(payload) {
        const event = payload.event || "default";
        this.#db[event] = this.#db[event] || [];
        return payload?.owner ? this.#db[event].filter(item => item.owner === payload.owner) : this.#db[event];
    }

    /**
     * @description List of all avalible events
     * @param {List} payload
     * @return {Array<Event>} 
     */
    async events() {
        return Object.keys(this.#db).map(item => {
            return {
                name: item
            }
        });
    }
}

module.exports = Memory;