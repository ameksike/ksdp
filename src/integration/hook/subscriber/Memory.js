class Memory {

    #db;

    constructor() {
        this.#db = {};
    }

    format(payload) {
        payload.date = new Date();
        return payload;
    }

    /**
     * @description add subscriber to event
     * @param {Object} payload
     * @param {String} payload.event
     * @param {String} payload.owner [OPTIONAL]
     * @param {String} payload.values
     * @param {String} payload.subscriber
     * @returns {Object} {event: String, owner: Number, values: String, subscriber: String }
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
     * @description remove subscriber from event
     * @param {String} payload.event
     * @param {String} payload.owner [OPTIONAL]
     * @returns {Object} {event: String, owner: Number, values: String, subscriber: String }
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
     * @description get target list by event and owner
     * @param {Object} payload
     * @param {String} payload.event
     * @param {String} payload.owner [OPTIONAL]
     * @returns {Array} [{event: String, owner: Number, values: String, subscriber: String }]
     */
    subscriptions(payload) {
        const event = payload.event || "default";
        this.#db[event] = this.#db[event] || [];
        return payload?.owner ? this.#db[event].filter(item => item.owner === payload.owner) : this.#db[event];
    }

    /**
     * @description List of all avalible events
     * @return {Array} {name: String, description: String}
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