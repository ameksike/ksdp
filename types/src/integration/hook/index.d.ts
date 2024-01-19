export = Hook;
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
     * @param {Subscription} payload
     * @return {{ [subscriber: String]: Promise<Array> }}
     */
    trigger(payload: Subscription): {
        [subscriber: string]: Promise<any[]>;
    };
    /**
     * @description trigger hooks notification by subscriber
     * @param {Subscription} payload
     * @param {String} [name=Memory]
     * @return {Promise<Array>}
     */
    run(payload: Subscription, name?: string): Promise<any[]>;
    /**
     * @description Save subscription
     * @param {Subscription|Array<Subscription>} payload
     * @returns {Subscription|Array<Subscription>} subscribed
     */
    subscribe(payload: Subscription | Array<Subscription>): Subscription | Array<Subscription>;
    /**
     * @description Remove subscription
     * @param {Subscription|Array<Subscription>} payload
     * @returns {Subscription|Array<Subscription>} unsubscription
     */
    unsubscribe(payload: Subscription | Array<Subscription>): Subscription | Array<Subscription>;
    /**
     * @description get the subscriptions list
     * @param {Subscription} payload - input data
     * @return {Array<Subscription>} subscriptions
     */
    subscriptions(payload: Subscription): Array<Subscription>;
    /**
     * @description List of all avalible events
     * @param {List} payload
     * @return {Array<Event>}
     */
    events(payload: List): Array<Event>;
    #private;
}
declare namespace Hook {
    export { List, Subscription, Event };
}
import Strategy = require("../../behavioral/Strategy");
import Command = require("../../behavioral/Command");
type List = {
    [name: string]: any;
};
type Subscription = {
    data?: any;
    value?: any;
    event: string;
    notifier?: string;
    subscriber?: string;
    expression?: string;
    processor?: string;
    group?: string;
    owner?: number;
    status?: number;
    id?: number;
    date?: Date;
    /**
     * - formater action to run before process the event but after the subscriber format action
     */
    onPreTrigger?: Function;
    /**
     * - formater action to run after process the event action
     */
    onPosTrigger?: Function;
};
type Event = {
    id?: string | number;
    event: string;
    description: string;
    payload?: string;
    group?: string;
    status?: string;
};
