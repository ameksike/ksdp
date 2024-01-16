export = KsProxy;
/**
 * @description Extendable Proxy class implementation
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		11/05/2020
 * @copyright  	Copyright (c) 2020-2050
 * @license    	GPL
 * @version    	1.0
 **/
declare class KsProxy {
    /**
     * @description Proxy builder
     * @returns {Object}
     */
    build(): any;
    /**
     * @description Must be overridden in the child class to define how methods or properties of the controlled class are read
     * @virtual
     * @param {Object} target
     * @param {String} key
     * @param {Object} receiver
     * @returns {*} value
     */
    get(target: any, key: string, receiver: any): any;
    /**
     * @description Must be overridden in the child class to define how properties of the controlled class are set
     * @virtual
     * @param {Object} target
     * @param {String} key
     * @param {*} value
     * @param {Object} receiver
     */
    set(target: any, key: string, value: any, receiver: any): any;
    #private;
}
