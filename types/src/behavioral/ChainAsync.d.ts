export = ChainAsync;
/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        24/03/2024
 * @description Chain of Responsibility pattern
 * @copyright   Copyright (c) 2019-2050
 * @license     GPL
 * @version     1.0
 **/
/**
 * @typedef {import("../types").TDelegate} TDelegate
 */
declare class ChainAsync {
    /**
     * @param {Object} [option]
     * @param {Object} [option.logger]
     * @param {Array<any>} [option.store]
     */
    constructor(option?: {
        logger?: any;
        store?: Array<any>;
    });
    /**
     * @type {Object}
     */
    logger: any;
    /**
     * @type {Object}
     */
    store: any;
    /**
     * @description exec a delegate
     * @param {TDelegate} delegate
     */
    exec(delegate: TDelegate): Promise<any>;
    /**
     * @description add a new delegate
     * @param {TDelegate|Array<TDelegate>} payload
     * @returns {Promise<TDelegate|Array<TDelegate>>} delegate
     */
    add(payload: TDelegate | Array<TDelegate>): Promise<TDelegate | Array<TDelegate>>;
    /**
     * @description remove a delegate
     * @param {String|Number|Array<String|Number>} index
     * @returns {Promise<TDelegate|TDelegate[]>} delegate
     */
    del(index: string | number | Array<string | number>): Promise<TDelegate | TDelegate[]>;
    /**
     * @description run the chain
     * @param {Array<any>} params
     * @param {Object} scope
     * @returns {Promise<any>}
     */
    run(params: Array<any>, scope: any): Promise<any>;
    #private;
}
declare namespace ChainAsync {
    export { TDelegate };
}
type TDelegate = import("../types").TDelegate;
