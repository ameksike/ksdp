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
     * @returns {{ event: String, owner: Number, values: String, subscriber: String }}
     */
    subscribe(payload: {
        event: string;
        owner: string;
        values: string;
        subscriber: string;
    }): {
        event: string;
        owner: number;
        values: string;
        subscriber: string;
    };
    /**
     * @description remove subscriber from event
     * @param {String} payload.event
     * @param {String} payload.owner [OPTIONAL]
     * @returns {{ event: String, owner: Number, values: String, subscriber: String }}
     */
    unsubscribe(payload: any): {
        event: string;
        owner: number;
        values: string;
        subscriber: string;
    };
    /**
     * @description get target list by event and owner
     * @param {Object} payload
     * @param {String} payload.event
     * @param {String} payload.owner [OPTIONAL]
     * @returns {Array<{ event: String, owner: Number, values: String, subscriber: String }>}
     */
    subscriptions(payload: {
        event: string;
        owner: string;
    }): {
        event: string;
        owner: number;
        values: string;
        subscriber: string;
    }[];
    /**
     * @description List of all avalible events
     * @returns {Array<{ name: String, description: String }>}
     */
    events(): Array<{
        name: string;
        description: string;
    }>;
    #private;
}
