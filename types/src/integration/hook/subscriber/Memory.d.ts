export = Memory;
/**
 * @typedef {import('../types').THook} THook
 * @typedef {import('../types').TEmission} TEmission
 * @typedef {import('../types').TSubscription} TSubscription
 * @typedef {import('../types').TEvent} TEvent
 * @typedef {import('../types').TList} TList
 */
declare class Memory {
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
     * @param {TSubscription|Array<TSubscription>} payload
     * @returns {Array<TSubscription>} subscribed
     */
    subscribe(payload: TSubscription | Array<TSubscription>): Array<TSubscription>;
    /**
     * @description Remove subscriptions
     * @param {TSubscription|Array<TSubscription>} [payload]
     * @returns {Array<TSubscription>} unsubscriptions
     */
    unsubscribe(payload?: TSubscription | Array<TSubscription>): Array<TSubscription>;
    /**
     * @description get the subscriptions list
     * @param {TSubscription} [payload] - input data
     * @return {Array<TSubscription>} subscriptions
     */
    subscriptions(payload?: TSubscription): Array<TSubscription>;
    /**
     * @description List of all avalible events
     * @param {TList} [payload]
     * @return {Promise<TEvent[]>}
     */
    events(payload?: TList): Promise<TEvent[]>;
    #private;
}
declare namespace Memory {
    export { THook, TEmission, TSubscription, TEvent, TList };
}
type THook = import("../types").THook;
type TEmission = import("../types").TEmission;
type TSubscription = import("../types").TSubscription;
type TEvent = import("../types").TEvent;
type TList = import("../types").TList;
