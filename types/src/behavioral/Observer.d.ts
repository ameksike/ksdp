export = Observer;
/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/10/2019
 * @description Observer pattern
 * @copyright  	Copyright (c) 2019-2050
 * @license    	GPL
 * @version    	1.0
 **/
/**
 * @typedef {({[name:String]:Object} | Array)} List
 **/
declare class Observer {
    sts: {};
    evs: {
        default: {};
    };
    helper: any;
    /**
     * @description configure lib
     * @param {Object} [opt]
     * @param {Object} [opt.sts]
     * @param {Object} [opt.evs]
     * @returns {Observer} self-reference
     */
    configure(opt?: {
        sts?: any;
        evs?: any;
    }): Observer;
    /**
     * @description Getting the Number of Subscriptions for an Event
     * @param {String} event
     * @param {String} scope
     * @returns {Number} count
     */
    count(event?: string, scope?: string): number;
    /**
     * @description Getting the Number of Subscriptions for an Event
     * @param {String} event
     * @param {String} scope
     * @returns {Array} list
     */
    listeners(event?: string, scope?: string): any[];
    /**
     * @description add an event on scope
     * @param {Array|Object|Function} subscriber
     * @param {String} [event]
     * @param {String} [scope='default']
     * @param {Object} [option]
     * @param {String} [option.event]
     * @param {String} [option.scope]
     * @param {Number} [option.index]
     * @param {Array} [option.rows]
     * @return {Observer} self-reference
     */
    add(subscriber: any[] | any | Function, event?: string, scope?: string, option?: {
        event?: string;
        scope?: string;
        index?: number;
        rows?: any[];
    }): Observer;
    /**
     * @description alias for add an event on scope
     * @param {Array|Object|Function} subscriber
     * @param {String} [event]
     * @param {String} [scope='default']
     * @param {Object} [option]
     * @param {String} [option.event]
     * @param {String} [option.scope]
     * @param {Number} [option.index]
     * @param {Array} [option.rows]
     * @return {Observer} self-reference
     */
    subscribe(subscriber: any[] | any | Function, event?: string, scope?: string, option?: {
        event?: string;
        scope?: string;
        index?: number;
        rows?: any[];
    }): Observer;
    /**
     * @description alias for delete an event from scope
     * @param {String} event
     * @param {String} [scope='default']
     * @param {Object} [option]
     * @param {Number} [option.index]
     * @param {String} [option.event]
     * @param {String} [option.scope]
     * @param {Number} [option.count]
     * @param {Array} [option.rows]
     * @return {Observer} self-reference
     */
    unsubscribe(event: string, scope?: string, option?: {
        index?: number;
        event?: string;
        scope?: string;
        count?: number;
        rows?: any[];
    }): Observer;
    /**
     * @description delete an event from scope
     * @param {String} event
     * @param {String} [scope='default']
     * @param {Object} [option]
     * @param {Number} [option.index]
     * @param {String} [option.event]
     * @param {String} [option.scope]
     * @param {Number} [option.count]
     * @param {Array} [option.rows]
     * @return {Observer} self-reference
     */
    del(event: string, scope?: string, option?: {
        index?: number;
        event?: string;
        scope?: string;
        count?: number;
        rows?: any[];
    }): Observer;
    /**
     * @description emit an event on a scope with a params list
     * @param {String} event
     * @param {String} scope
     * @param {Array} params
     * @return {Observer} self-reference
     */
    emit(event: string, scope?: string, params?: any[]): Observer;
    /**
     * @description process an event on a scope
     * @param {*} subscriber
     * @param {String} event
     * @param {Array} params
     * @returns {*} target
     */
    process(subscriber: any, event: string, params?: any[]): any;
}
declare namespace Observer {
    export { List };
}
type List = any[] | {
    [name: string]: any;
};
