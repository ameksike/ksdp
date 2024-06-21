export = IoC;
/**
 * @typedef {import('../../types').TOptionIoC} TOptionIoC
 * @typedef {import('../../types').TList} TList
 */
declare class IoC {
    /**
     * @param {*} opt
     */
    constructor(opt?: any);
    /**
     * @returns {Strategy}
     */
    get compiler(): Strategy;
    /**
     * @returns {Strategy}
     */
    get analyzer(): Strategy;
    /** @type {TOptionIoC} */
    opt: TOptionIoC;
    /** @type {any} */
    ctrls: any;
    error: any;
    /**
     * @description register Native alias
     */
    init(): void;
    /**
     * @description Configure Lib
     * @param {TOptionIoC} [opt] The input data.
     */
    configure(opt?: TOptionIoC): this;
    /**
     * @description Inversion of Control Pattern (IoC)
     * @param {String|TOptionIoC} opt The input data.
     * @returns {Object} resource
     */
    get(opt?: string | TOptionIoC): any;
    /**
     * @description add a new config item
     * @param {TList|Array<any>} option
     * @param {String} [index]
     * @returns {IoC} self
     */
    add(option: TList | Array<any>, index?: string): IoC;
    /**
     * @description register a resource
     * @param {Object|String|Function|Array<any>} value
     * @param {Object} [option]
     * @returns {IoC} self
     */
    set(value: any | string | Function | Array<any>, option?: any): IoC;
    /**
     * @description remove a resource
     * @param {Object|String|Function|Array<any>} opt
     * @param {Object} [out]
     * @param {Array<any>} [out.rows]
     * @returns {IoC} self
     */
    del(opt: any | string | Function | Array<any>, out?: {
        rows?: Array<any>;
    }): IoC;
    /**
     * @description alias for register a resource
     * @param {Object|String|Function|Array<any>} value
     * @param {Object} [opt]
     * @returns {IoC} self
     */
    register(value: any | string | Function | Array<any>, opt?: any): IoC;
    /**
     * @description alias for remove a resource
     * @param {Object|String|Function|Array<any>} opt
     * @param {Object} out
     * @returns {IoC} self
     */
    unregister(opt?: any | string | Function | Array<any>, out?: any): IoC;
    /**
     * @description Service Locator Pattern (SL)
     * @param {Object} opt
     * @param {(String|String[]|any)} opt.type
     * @returns result
     */
    process(opt: {
        type: (string | string[] | any);
    }): any;
    /**
     * @description Fill payload
     * @param {TOptionIoC|String} opt The input data.
     * @returns {any}
     */
    fill(opt: TOptionIoC | string): any;
    #private;
}
declare namespace IoC {
    export { TOptionIoC, TList };
}
import Strategy = require("../../behavioral/Strategy");
type TOptionIoC = import("../../types").TOptionIoC;
type TList = import("../../types").TList;
