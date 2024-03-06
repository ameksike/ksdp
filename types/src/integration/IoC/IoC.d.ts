export = IoC;
/**
 * @typedef {import('../../types').TOptionIoC} TOptionIoC
 */
declare class IoC {
    constructor(opt?: any);
    opt: {};
    ctrls: {};
    error: any;
    factory: Factory;
    inherit: {
        imitate: typeof import("../../inherit/imitate");
        namespace: typeof import("../../inherit/namespace");
        ns: typeof import("../../inherit/namespace");
    };
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
     * @description Fill payload
     * @param {TOptionIoC|String} opt The input data.
     * @returns {Object}
     */
    fill(opt: TOptionIoC | string): any;
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
     * @description Inversion of Control Pattern (IoC)
     * @param {String|TOptionIoC} opt The input data.
     * @returns {Object} resource
     */
    get(opt?: string | TOptionIoC): any;
    /**
     * @description Service Locator Pattern (SL)
     * @param {Object} opt
     * @returns result
     */
    process(opt: any): any;
    /**
     * @description Factory Pattern load Type
     * @param {Object} opt
     * @returns {*} result
     */
    type(opt: any): any;
    /**
     * @description Factory Pattern
     * @param {Object} opt
     * @returns {Object} result
     */
    instance(opt: any): any;
    /**
     * @description excecute action from object
     * @param {Object} opt
     * @returns {*}
     */
    action(opt: any): any;
    /**
     * @description get dependency
     * @param {Object} opt
     * @returns {Object} result
     */
    dependency(opt: any): any;
    /**
     * @description Dependency Injection Pattern (DI)
     * @param {Object} obj
     * @param {Object} opt
     * @returns {Object} result
     */
    setDI(obj: any, opt: any): any;
}
declare namespace IoC {
    export { TOptionIoC };
}
import Factory = require("../../creational/Factory");
type TOptionIoC = import('../../types').TOptionIoC;
