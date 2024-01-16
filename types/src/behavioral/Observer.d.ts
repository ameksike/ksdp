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
     * @param {String} subscriber
     * @param {String} event
     * @param {String} [scope=default]
     * @return {Event}
     */
    add(subscriber: string, event: string, scope?: string): Event;
    /**
     * @description delete an event from scope
     * @param {String} event
     * @param {String} [scope=default]
     * @return {Event}
     */
    del(event: string, scope?: string): Event;
    /**
     * @description emit an event on a scope with a params list
     * @param {String} event
     * @param {String} scope
     * @param {String} params
     * @return {Event}
     */
    emit(event: string, scope?: string, params?: string): Event;
    /**
     * @description process an event on a scope
     * @param {String} subscriber
     * @param {String} event
     * @param {String} params
     */
    process(subscriber: string, event: string, params?: string): any;
}
