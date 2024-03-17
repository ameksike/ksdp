/// <reference types="node" />
export = Emitter;
declare class Emitter extends EventEmitter<[never]> {
    constructor();
    /**
     * @description get data by event
     * @param {String|symbol} key
     * @returns {*}
     */
    get(key?: string | symbol): any;
    /**
     * @description get the listener decorator
     * @param {*} subscriber
     * @param {String|symbol} [event]
     * @param {Object} [option]
     * @param {Array} [option.args]
     * @returns {*} listener
     */
    decorate(subscriber: any, event?: string | symbol, option?: {
        args?: any[];
    }): any;
    /**
     * @description subscribe a listener to an event
     * @param {Array|Object|Function} subscriber
     * @param {String|symbol} [event]
     * @param {Object} [option]
     * @param {Array} [option.args]
     * @param {Array} [option.rows]
     * @param {String} [option.mode]
     * @param {String|symbol} [option.event]
     * @returns {Emitter} self
     */
    set(subscriber: any[] | any | Function, event?: string | symbol, option?: {
        args?: any[];
        rows?: any[];
        mode?: string;
        event?: string | symbol;
    }): Emitter;
    /**
     * @description alias for subscribe a listener to an event
     * @param {Array|Object|Function} subscriber
     * @param {String|symbol} [event]
     * @param {Object} [option]
     * @param {Array} [option.args]
     * @param {Array} [option.rows]
     * @param {String} [option.mode]
     * @param {String|symbol} [option.event]
     * @returns {Emitter} self
     */
    add(subscriber: any[] | any | Function, event?: string | symbol, option?: {
        args?: any[];
        rows?: any[];
        mode?: string;
        event?: string | symbol;
    }): Emitter;
    /**
     * @description alias for subscribe a listener to an event
     * @param {Array|Object|Function} subscriber
     * @param {String|symbol} [event]
     * @param {Object} [option]
     * @param {Array} [option.args]
     * @param {Array} [option.rows]
     * @param {String} [option.mode]
     * @param {String|symbol} [option.event]
     * @returns {Emitter} self
     */
    subscribe(subscriber: any[] | any | Function, event?: string | symbol, option?: {
        args?: any[];
        rows?: any[];
        mode?: string;
        event?: string | symbol;
    }): Emitter;
    /**
     * @description alias for subscribe a listener to an event
     * @param {String|symbol} [event]
     * @param {Array|Object|Function} subscriber
     * @param {Object} [option]
     * @param {Array} [option.rows]
     * @param {String|symbol} [option.event]
     * @param {Number} [option.index]
     * @param {Number} [option.count]
     * @returns {Emitter} self
     */
    unsubscribe(event?: string | symbol, subscriber?: any[] | any | Function, option?: {
        rows?: any[];
        event?: string | symbol;
        index?: number;
        count?: number;
    }): Emitter;
    /**
     * @description remove a subscriber from an event or clean an event
     * @param {String|symbol} [event]
     * @param {Array|Object|Function} subscriber
     * @param {Object} [option]
     * @param {Array} [option.rows]
     * @param {String|symbol} [option.event]
     * @param {Number} [option.index]
     * @param {Number} [option.count]
     * @returns {Emitter} self
     */
    del(event?: string | symbol, subscriber?: any[] | any | Function, option?: {
        rows?: any[];
        event?: string | symbol;
        index?: number;
        count?: number;
    }): Emitter;
    /**
     * @description trigger an event
     * @override
     * @param {String|symbol} event
     * @param {...any} [args]
     * @returns {Boolean} res
     */
    override emit(event: string | symbol, ...args?: any[]): boolean;
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
