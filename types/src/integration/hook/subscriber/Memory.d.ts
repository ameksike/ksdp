export = Memory;
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
declare class Memory {
    /**
     * @description preformat subscriptions payload before precess the event
     * @param {*} payload
     * @returns {*}
     */
    format(payload: any): any;
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
    events(): Array<Event>;
    #private;
}
declare namespace Memory {
    export { List, Subscription, Event };
}
type List = any[] | {
    [name: string]: any;
};
type Subscription = {
    id?: number;
    event: string;
    value?: any;
    data?: string;
    notifier?: string;
    group?: string;
    owner?: number;
    status?: number;
    processor?: string;
    expression?: string;
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
