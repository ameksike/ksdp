export = Native;
/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        09/11/2019
 * @copyright   Copyright (c) 2019-2050
 * @description Native Analizer
 * @dependency  Factory
 * @license     GPL
 * @version     1.0
 **/
/**
 * @typedef {import('../../../types').TOptionIoC} TOptionIoC
 * @typedef {import('../IoC')} TIoC
 */
declare class Native {
    /**
     * @param {TIoC|null} [ioc]
     */
    constructor(ioc?: TIoC | null);
    /**
     * @returns {TIoC|null}
     */
    get ioc(): import("../IoC");
    /**
     * @description Fill payload
     * @param {TOptionIoC|String} opt The input data.
     * @returns {Object}
     */
    run(opt: TOptionIoC | string): any;
    #private;
}
declare namespace Native {
    export { TOptionIoC, TIoC };
}
type TOptionIoC = import("../../../types").TOptionIoC;
type TIoC = import("../IoC");
