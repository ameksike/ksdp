export = Hook;
/**
 * @typedef {import('./types').TEvent} TEvent
 * @typedef {import('./types').TSubscription} TSubscription
 * @typedef {import('./types').TList} TList
 * @typedef {import('./types').TTarget} TTarget
 * @typedef {import('./types').TSubscriber} TSubscriber
 * @typedef {import('./types').TProcessor} TProcessor
 * @typedef {import('./types').TResult} TResult
 * @typedef {Object<string, Promise<any[]>>|{}} TListEmitted
 */
declare class Hook {
    /**
     * @param {*} cfg
     */
    constructor(cfg: any);
    /**
     * @returns {Strategy}
     */
    get notifier(): Strategy;
    /**
     * @returns {Strategy}
     */
    get subscriber(): Strategy;
    /**
     * @returns {Strategy}
     */
    get processor(): Strategy;
    /**
     * @returns {Command}
     */
    get cmd(): Command;
    logger: any;
    /**
     * @param {*} cfg
     * @returns
     */
    configure(cfg: any): this;
    /**
     * @description Trigger hooks notification
     * @param {TSubscription} payload
     * @return {TListEmitted}
     */
    trigger(payload: TSubscription): TListEmitted;
    /**
     * @description trigger hooks notification by subscriber
     * @param {TSubscription} payload
     * @param {String} [name=Memory]
     * @return {Promise<Array<any>>}
     */
    run(payload: TSubscription, name?: string): Promise<Array<any>>;
    /**
     * @description Process a subscription
     * @param {TTarget} target
     * @param {TSubscriber} subscriber
     * @param {Object} payload
     * @returns {*}
     */
    process(target: TTarget, subscriber: TSubscriber, payload: any): any;
    /**
     * @description Save subscription
     * @param {TSubscription} payload
     * @returns {Promise<TSubscription|null>} subscribed
     */
    add(payload: TSubscription): Promise<TSubscription | null>;
    /**
     * @description Save subscription
     * @param {TSubscription|Array<TSubscription>} payload
     * @returns {Promise<Array<TSubscription|null>>} subscribed
     */
    subscribe(payload: TSubscription | Array<TSubscription>): Promise<Array<TSubscription | null>>;
    /**
     * @description Remove subscription
     * @param {TSubscription} payload
     * @returns {Promise<TSubscription|null>} unsubscription
     */
    remove(payload: TSubscription): Promise<TSubscription | null>;
    /**
     * @description Remove subscription
     * @param {TSubscription|Array<TSubscription>} payload
     * @returns {Promise<Array<TSubscription|null>>} unsubscriptions
     */
    unsubscribe(payload: TSubscription | Array<TSubscription>): Promise<Array<TSubscription | null>>;
    /**
     * @description get the subscriptions list
     * @param {TSubscription} [payload] - input data
     * @return {Promise<TSubscription[]>} subscriptions
     */
    subscriptions(payload?: TSubscription): Promise<TSubscription[]>;
    /**
     * @description List of all avalible events
     * @param {TList} payload
     * @return {Promise<TEvent[]>}
     */
    events(payload: TList): Promise<TEvent[]>;
    #private;
}
declare namespace Hook {
    export { TEvent, TSubscription, TList, TTarget, TSubscriber, TProcessor, TResult, TListEmitted };
}
import Strategy = require("../../behavioral/Strategy");
import Command = require("../../behavioral/Command");
type TEvent = import("./types").TEvent;
type TSubscription = import("./types").TSubscription;
type TList = import("./types").TList;
type TTarget = import("./types").TTarget;
type TSubscriber = import("./types").TSubscriber;
type TProcessor = import("./types").TProcessor;
type TResult = import("./types").TResult;
type TListEmitted = {
    [x: string]: Promise<any[]>;
} | {};
