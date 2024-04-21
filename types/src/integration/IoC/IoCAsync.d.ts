export = IoCAsync;
/**
 * @typedef {import('../../types').TOptionIoC} TOptionIoC
 */
declare class IoCAsync {
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
    init(): Promise<void>;
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
     * @returns {Promise<Object>} resource
     */
    get(opt?: string | TOptionIoC): Promise<any>;
    /**
     * @description add a new config item
     * @param {Object|Array} option
     * @param {String} index
     * @returns {Promise<IoCAsync>} self
     */
    add(option: any | any[], index?: string): Promise<IoCAsync>;
    /**
     * @description register a resource
     * @param {Object|String|Function|Array} value
     * @param {Object} [opt]
     * @returns {Promise<IoCAsync>} self
     */
    set(value: any | string | Function | any[], opt?: any): Promise<IoCAsync>;
    /**
     * @description remove a resource
     * @param {Object|String|Function|Array} opt
     * @param {Object} [out]
     * @returns {Promise<IoCAsync>} self
     */
    del(opt: any | string | Function | any[], out?: any): Promise<IoCAsync>;
    /**
     * @description alias for register a resource
     * @param {Object|String|Function|Array} value
     * @param {Object} [opt]
     * @returns {Promise<IoCAsync>} self
     */
    register(value: any | string | Function | any[], opt?: any): Promise<IoCAsync>;
    /**
     * @description alias for remove a resource
     * @param {Object|String|Function|Array} opt
     * @param {Object} out
     * @returns {Promise<IoCAsync>} self
     */
    unregister(opt?: any | string | Function | any[], out?: any): Promise<IoCAsync>;
    /**
     * @description Service Locator Pattern (SL)
     * @param {Object} opt
     * @returns {Promise<any>} result
     */
    process(opt: any): Promise<any>;
    /**
     * @description Fill payload
     * @param {TOptionIoC|String} opt The input data.
     * @returns {Promise<TOptionIoC>} option
     */
    fill(opt: TOptionIoC | string): Promise<TOptionIoC>;
    #private;
}
declare namespace IoCAsync {
    export { TOptionIoC };
}
import Strategy = require("../../behavioral/StrategyAsync");
type TOptionIoC = import('../../types').TOptionIoC;
