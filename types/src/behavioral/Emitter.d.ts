/// <reference types="node" />
export = Emitter;
declare class Emitter extends EventEmitter {
    constructor();
    /**
     * @description get data by event
     * @param {String|symbol} key
     * @returns {*}
     */
    get(key?: string | symbol): any;
    /**
     * @description subscribe a listener to an event
     * @param {Array|Object|Function} subscriber
     * @param {String|symbol} [event]
     * @param {Object} [option]
     * @returns {Emitter} self
     */
    set(subscriber: any[] | any | Function, event?: string | symbol, option?: any): Emitter;
    /**
     * @description alias for subscribe a listener to an event
     * @param {Array|Object|Function} subscriber
     * @param {String|symbol} [event]
     * @param {Object} [option]
     * @returns {Emitter} self
     */
    add(subscriber: any[] | any | Function, event?: string | symbol, option?: any): Emitter;
    /**
     * @description alias for subscribe a listener to an event
     * @param {Array|Object|Function} subscriber
     * @param {String|symbol} [event]
     * @param {Object} [option]
     * @returns {Emitter} self
     */
    subscribe(subscriber: any[] | any | Function, event?: string | symbol, option?: any): Emitter;
    /**
     * @description alias for subscribe a listener to an event
     * @param {String|symbol} [event]
     * @param {Array|Object|Function} subscriber
     * @param {Object} [option]
     * @returns {Emitter} self
     */
    unsubscribe(event?: string | symbol, subscriber?: any[] | any | Function, option?: any): Emitter;
    /**
     * @description remove a subscriber from an event or clean an event
     * @param {String|symbol} [event]
     * @param {Array|Object|Function} subscriber
     * @param {Object} [option]
     * @returns {Emitter} self
     */
    del(event?: string | symbol, subscriber?: any[] | any | Function, option?: any): Emitter;
    /**
     * @description Getting the Number of Subscriptions for an Event
     * @param {String|symbol} event
     * @returns {Number} count
     */
    count(event?: string | symbol): number;
    [EventEmitter.captureRejectionSymbol](err: any, event: any, ...args: any[]): void;
    #private;
}
import { EventEmitter } from "events";
