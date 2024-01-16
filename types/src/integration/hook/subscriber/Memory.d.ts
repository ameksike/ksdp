export = Memory;
declare class Memory {
    format(payload: any): any;
    /**
     * @description add subscriber to event
     * @param {Object} payload
     * @param {String} payload.event
     * @param {String} payload.owner [OPTIONAL]
     * @param {String} payload.values
     * @param {String} payload.subscriber
     * @returns {Object} {event: String, owner: Number, values: String, subscriber: String }
     */
    subscribe(payload: {
        event: string;
        owner: string;
        values: string;
        subscriber: string;
    }): any;
    /**
     * @description remove subscriber from event
     * @param {String} payload.event
     * @param {String} payload.owner [OPTIONAL]
     * @returns {Object} {event: String, owner: Number, values: String, subscriber: String }
     */
    unsubscribe(payload: any): any;
    /**
     * @description get target list by event and owner
     * @param {Object} payload
     * @param {String} payload.event
     * @param {String} payload.owner [OPTIONAL]
     * @returns {Array} [{event: String, owner: Number, values: String, subscriber: String }]
     */
    subscriptions(payload: {
        event: string;
        owner: string;
    }): any[];
    /**
     * @description List of all avalible events
     * @return {Array} {name: String, description: String}
     */
    events(): any[];
    #private;
}
