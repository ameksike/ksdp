export = Hook;
declare class Hook {
    constructor(cfg: any);
    get notifier(): Strategy;
    get subscriber(): Strategy;
    get processor(): Strategy;
    get cmd(): Command;
    logger: any;
    configure(cfg: any): this;
    /**
     * @description Trigger hooks notification
     * @param {Array|String} payload.subscriber
     * @param {String} payload.event
     * @param {Object} payload.data [OPTIONAL]
     * @param {Funtion} payload.onPreTrigger [OPTIONAL]
     * @param {Funtion} payload.onPosTrigger [OPTIONAL]
     * @param {Funtion} payload.scope [OPTIONAL]
     * @return {Object} { [String]: Promise }
     */
    trigger(payload: any): any;
    /**
     * @description trigger hooks notification by subscriber
     * @param {Array|String} subscriber
     * @param {Object} payload
     * @param {String} payload.event
     * @param {Object} payload.data [OPTIONAL]
     * @param {Object} payload.owner [OPTIONAL]
     * @param {Funtion} payload.onPreTrigger [OPTIONAL]
     * @param {Funtion} payload.onPosTrigger [OPTIONAL]
     * @param {Funtion} payload.scope [OPTIONAL]
     * @return {Object} { [String]: Object }
     */
    run(payload: {
        event: string;
        data: any;
        owner: any;
        onPreTrigger: Funtion;
        onPosTrigger: Funtion;
        scope: Funtion;
    }, name?: string): any;
    /**
     * @description Add subscriber to event
     * @param {String} payload.subscriber
     * @param {String} payload.target
     * @param {String} payload.value
     * @param {String} payload.event
     * @param {Number} payload.owner
     * @return { action: String ['subscribe'], status: String ['success'/'failed'], details: String [event] }
     */
    subscribe(payload: any): action;
    /**
     * @description Remove subscriber from event
     * @param {String} payload.subscriber
     * @param {String} payload.event
     * @param {Number} payload.owner
     * @return { action: String ['unsubscribe'], status: String ['success'/'failed'], details: String [event] }
     */
    unsubscribe(payload: any): action;
    /**
     * @description Events list by subscriber
     * @param {String} payload.subscriber
     * @param {String} payload.event [OPTIONAL]
     * @param {Number} payload.subscriber
     * @return {Attay} subscriptions
     */
    subscriptions(payload: any): Attay;
    /**
     * @description List of all avalible events
     * @return {Array} [{name: String, description: String}]
     */
    events(payload: any): any[];
    #private;
}
import Strategy = require("../../behavioral/Strategy");
import Command = require("../../behavioral/Command");
