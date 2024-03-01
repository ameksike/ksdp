/// <reference types="node" />
export = Event;
declare class Event extends EventEmitter {
    constructor();
    /**
     * @description get data by event
     * @param {String|symbol} key
     * @returns {*}
     */
    get(key?: string | symbol): any;
    /**
     * @description subscribe a listener to an event
     * @param {*} subscriber
     * @param {String|symbol} [event]
     * @param {Object} [option]
     * @returns {Event} self
     */
    set(subscriber: any, event?: string | symbol, option?: any): Event;
    /**
     * @description
     * @param {String|symbol} [event]
     * @param {*} subscriber
     * @param {Object} [option]
     * @returns {Event} self
     */
    del(event?: string | symbol, subscriber?: any, option?: any): Event;
    [EventEmitter.captureRejectionSymbol](err: any, event: any, ...args: any[]): void;
    #private;
}
import { EventEmitter } from "events";
