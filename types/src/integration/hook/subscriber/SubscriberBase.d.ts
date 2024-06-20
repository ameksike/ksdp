export = SubscriberBase;
/**
 * @typedef {import('../types').THook} THook
 * @typedef {import('../types').TEmission} TEmission
 * @typedef {import('../types').TSubscription} TSubscription
 * @typedef {import('../types').TEvent} TEvent
 * @typedef {import('../types').TList} TList
 */
declare class SubscriberBase {
    /**
     * @type {THook}
     */
    hook: THook;
    /**
     * @description preformat subscriptions payload before precess the event
     * @param {TEmission} payload
     * @returns {TEmission} formated payload
     */
    format(payload: TEmission): TEmission;
    /**
     * @description Save subscription
     * @param {TSubscription|Array<TSubscription>} [payload=null]
     * @returns {Array<TSubscription>} subscribed
     */
    subscribe(payload?: TSubscription | Array<TSubscription>): Array<TSubscription>;
    /**
     * @description remove subscriptions
     * @param {TSubscription|Array<TSubscription>} [payload=null]
     * @returns {Array<TSubscription>} succeed unsubscriptions
     */
    unsubscribe(payload?: TSubscription | Array<TSubscription>): Array<TSubscription>;
    /**
     * @description get the subscriptions list
     * @param {TSubscription} [payload=null] - input data
     * @return {Array<TSubscription>} subscriptions
     */
    subscriptions(payload?: TSubscription): Array<TSubscription>;
    /**
     * @description get the event list
     * @param {TList} [payload]
     * @returns {Promise<TEvent[]>} events
     */
    events(payload?: TList): Promise<TEvent[]>;
}
declare namespace SubscriberBase {
    export { THook, TEmission, TSubscription, TEvent, TList };
}
type THook = import("../types").THook;
type TEmission = import("../types").TEmission;
type TSubscription = import("../types").TSubscription;
type TEvent = import("../types").TEvent;
type TList = import("../types").TList;
