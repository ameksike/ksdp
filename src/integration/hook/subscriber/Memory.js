/**
 * @typedef {import('../types').THook} THook 
 * @typedef {import('../types').TEmission} TEmission 
 * @typedef {import('../types').TSubscription} TSubscription 
 * @typedef {import('../types').TEvent} TEvent 
 * @typedef {import('../types').TList} TList 
 */
class Memory {
    /**
     * @type {THook}
     */
    hook;

    /**
     * @type {TList}
     */
    #db;
    constructor() {
        this.#db = {};
    }

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
     * @description add subscription
     * @param {TSubscription} payload
     * @returns {TSubscription} subscribed
     */
    #add(payload) {
        if (!payload) {
            return null;
        }
        const event = payload?.event || 'default';
        this.#db[event] = this.#db[event] || [];
        const id = payload?.id || Object.keys(this.#db[event]).length;
        this.#db[event][id] = {
            notifier: payload?.notifier,
            value: payload?.value,
            owner: payload?.owner
        };
        return this.#db[event][id];
    }

    /**
     * @description Save subscription
     * @param {TSubscription|Array<TSubscription>} payload
     * @returns {Array<TSubscription>} subscribed
     */
    subscribe(payload) {
        if (!payload) {
            return null;
        }
        if (Array.isArray(payload)) {
            let res = [];
            for (let i in payload) {
                res.push(this.#add(payload[i]));
            }
            return res;
        }
        return [this.#add(payload)];
    }

    /**
     * @description Remove subscription
     * @param {TSubscription} payload
     * @returns {TSubscription} unsubscription
     */
    #remove(payload) {
        const event = payload?.event || 'default';
        this.#db[event] = this.#db[event] || {};
        const id = payload?.id || Object.keys(this.#db[event]).pop();
        const tmp = this.#db[event][id];
        delete this.#db[event][id];
        return tmp;
    }

    /**
     * @description Remove subscriptions
     * @param {TSubscription|Array<TSubscription>} [payload]
     * @returns {Array<TSubscription>} unsubscriptions
     */
    unsubscribe(payload) {
        if (!payload) {
            return null;
        }
        if (Array.isArray(payload)) {
            let res = [];
            for (let i in payload) {
                res.push(this.#remove(payload[i]));
            }
            return res;
        }
        return [this.#remove(payload)];
    }

    /**
     * @description get the subscriptions list
     * @param {TSubscription} [payload] - input data 
     * @return {Array<TSubscription>} subscriptions
     */
    subscriptions(payload = { event: 'default' }) {
        const event = payload?.event || 'default';
        this.#db[event] = this.#db[event] || [];
        return payload?.owner ? this.#db[event].filter(item => item.owner === payload.owner) : this.#db[event];
    }

    /**
     * @description List of all avalible events
     * @param {TList} [payload]
     * @return {Promise<TEvent[]>} 
     */
    async events(payload = null) {
        return Promise.resolve(Object.keys(this.#db).map(item => {
            return {
                event: item
            }
        }));
    }
}

module.exports = Memory;