/**
 * @typedef {import('../types').THook} THook 
 * @typedef {import('../types').TEmission} TEmission 
 * @typedef {import('../types').TSubscription} TSubscription 
 * @typedef {import('../types').TEvent} TEvent 
 * @typedef {import('../types').TList} TList 
 */
class SubscriberBase {
    /**
     * @type {THook}
     */
    hook;

    /**
     * @description preformat subscriptions payload before precess the event
     * @param {TEmission} payload 
     * @returns {TEmission} formated payload
     */
    format(payload) {
        payload.date = new Date();
        return payload;
    }

    /**
     * @description Save subscription
     * @param {TSubscription|Array<TSubscription>} [payload=null]
     * @returns {Array<TSubscription>} subscribed
     */
    subscribe(payload = null) {
        return null;
    }

    /**
     * @description remove subscriptions
     * @param {TSubscription|Array<TSubscription>} [payload=null]
     * @returns {Array<TSubscription>} succeed unsubscriptions
     */
    unsubscribe(payload = null) {
        return null;
    }

    /**
     * @description get the subscriptions list
     * @param {TSubscription} [payload=null] - input data 
     * @return {Array<TSubscription>} subscriptions
     */
    subscriptions(payload = null) {
        return null;
    }

    /**
     * @description get the event list
     * @param {TList} [payload] 
     * @returns {Promise<TEvent[]>} events
     */
    async events(payload = null) {
        return [];
    }
}

module.exports = SubscriberBase;