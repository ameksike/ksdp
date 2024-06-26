export = KsProxy;
/**
 * @description Extendable Proxy class implementation
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        11/05/2020
 * @copyright   Copyright (c) 2020-2050
 * @license     GPL
 * @version     1.0
 **/
declare class KsProxy {
    /**
     * @description Proxy builder
     * @returns {KsProxy}
     */
    build(): KsProxy;
    /**
     * @description Must be overridden in the child class to define how methods or properties of the controlled class are read
     * @virtual
     * @param {Object} target
     * @param {string | number | symbol} key
     * @param {Object} receiver
     * @returns {*} value
     */
    get(target: any, key: string | number | symbol, receiver: any): any;
    /**
     * @description Must be overridden in the child class to define how properties of the controlled class are set
     * @virtual
     * @param {any} target
     * @param {string | number | symbol} key
     * @param {*} value
     * @param {Object} receiver
     */
    set(target: any, key: string | number | symbol, value: any, receiver: any): any;
    #private;
}
