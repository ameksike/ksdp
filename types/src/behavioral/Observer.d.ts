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
declare class Observer {
    sts: {};
    evs: {
        default: {};
    };
    helper: any;
    configure(opt?: boolean): this;
    /**
     * @description add an event on scope
     * @param {string} subscriber
     * @param {string} event
     * @param {string} scope
     * @return {Event}
     */
    add(subscriber: string, event: string, scope?: string): Event;
    /**
     * @description delete an event from scope
     * @param {string} event
     * @param {string} scope
     * @return {Event}
     */
    del(event: string, scope?: string): Event;
    /**
     * @description emit an event on a scope with a params list
     * @param {string} event
     * @param {string} scope
     * @param {string} params
     * @return {Event}
     */
    emit(event: string, scope?: string, params?: string): Event;
    /**
     * @description process an event on a scope
     * @param {string} subscriber
     * @param {string} event
     * @param {string} params
     */
    process(subscriber: string, event: string, params?: string): any;
}
