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
     * @description add an event on scope
     * @param {String} subscriber
     * @param {String} [event]
     * @param {String} [scope='default']
     * @return {Observer} self-reference
     */
    add(subscriber: string, event?: string, scope?: string): Observer;
    /**
     * @description delete an event from scope
     * @param {String} event
     * @param {String} [scope='default']
     * @return {Observer} self-reference
     */
    del(event: string, scope?: string): Observer;
    /**
     * @description emit an event on a scope with a params list
     * @param {String} event
     * @param {String} scope
     * @param {List} params
     * @return {Observer} self-reference
     */
    emit(event: string, scope?: string, params?: List): Observer;
    /**
     * @description process an event on a scope
     * @param {*} subscriber
     * @param {String} event
     * @param {List} params
     * @returns {*} target
     */
    process(subscriber: any, event: string, params?: List): any;
}
declare namespace Observer {
    export { List };
}
type List = any[] | {
    [name: string]: any;
};
