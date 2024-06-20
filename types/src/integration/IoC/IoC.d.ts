export = IoC;
/**
 * @typedef {import('../../types').TOptionIoC} TOptionIoC
 */
declare class IoC {
    constructor(opt?: any);
    /**
     * @returns {Strategy}
     */
    get compiler(): Strategy;
    /**
     * @returns {Strategy}
     */
    get analyzer(): Strategy;
    opt: {};
    ctrls: {};
    error: any;
    /**
     * @description register Native alias
     */
    init(): void;
    /**
     * @description Configure Lib
     * @param {Object} [opt] The input data.
     * @param {String} [opt.name] Alias for it lib
     * @param {Object} [opt.src] Data source
     * @param {String} [opt.path] Search path
     * @param {Object} [opt.error] Error Handler
     */
    configure(opt?: {
        name?: string;
        src?: any;
        path?: string;
        error?: any;
    }): this;
    /**
     * @description Inversion of Control Pattern (IoC)
     * @param {String|TOptionIoC} opt The input data.
     * @returns {Object} resource
     */
    get(opt?: string | TOptionIoC): any;
    /**
     * @description add a new config item
     * @param {Object|Array} option
     * @param {String} index
     * @returns {IoC} self
     */
    add(option: any | any[], index?: string): IoC;
    /**
     * @description register a resource
     * @param {Object|String|Function|Array} value
     * @param {Object} [opt]
     * @returns {IoC} self
     */
    set(value: any | string | Function | any[], opt?: any): IoC;
    /**
     * @description remove a resource
     * @param {Object|String|Function|Array} opt
     * @param {Object} [out]
     * @returns {IoC} self
     */
    del(opt: any | string | Function | any[], out?: any): IoC;
    /**
     * @description alias for register a resource
     * @param {Object|String|Function|Array} value
     * @param {Object} [opt]
     * @returns {IoC} self
     */
    register(value: any | string | Function | any[], opt?: any): IoC;
    /**
     * @description alias for remove a resource
     * @param {Object|String|Function|Array} opt
     * @param {Object} out
     * @returns {IoC} self
     */
    unregister(opt?: any | string | Function | any[], out?: any): IoC;
    /**
     * @description Service Locator Pattern (SL)
     * @param {Object} opt
     * @returns result
     */
    process(opt: any): any;
    /**
     * @description Fill payload
     * @param {TOptionIoC|String} opt The input data.
     * @returns {Object}
     */
    fill(opt: TOptionIoC | string): any;
    #private;
}
declare namespace IoC {
    export { TOptionIoC };
}
import Strategy = require("../../behavioral/Strategy");
type TOptionIoC = import("../../types").TOptionIoC;
