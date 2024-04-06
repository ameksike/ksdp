export = NativeAsync;
/**
 * @typedef {import('../../../types').TOptionIoC} TOptionIoC
 * @typedef {import('../IoC')} TIoC
 */
declare class NativeAsync {
    /**
     * @param {TIoC|null} [ioc]
     */
    constructor(ioc?: TIoC | null);
    /**
     * @returns {Inherit}
     */
    get inherit(): {
        imitate: typeof import("../../../inherit/imitate");
        namespace: typeof import("../../../inherit/namespace");
        ns: typeof import("../../../inherit/namespace");
        isClass: (target: any) => boolean;
        className: (target: any) => string;
    };
    /**
     * @returns {Factory}
     */
    get factory(): Factory;
    /**
     * @returns {TIoC}
     */
    get ioc(): import("../IoC");
    /**
     * @description Service Locator Pattern (SL)
     * @param {Object} opt
     * @returns result
     */
    run(opt: any): Promise<any>;
    /**
     * @description Factory Pattern
     * @param {Object} opt
     * @returns {Promise<Object>} result
     */
    instance(opt: any): Promise<any>;
    /**
     * @description excecute action from object
     * @param {Object} opt
     * @returns {Promise<any>}
     */
    action(opt: any): Promise<any>;
    /**
     * @description get dependency
     * @param {Object} opt
     * @returns {Promise<Object>} result
     */
    dependency(opt: any): Promise<any>;
    /**
     * @description Dependency Injection Pattern (DI)
     * @param {Object} obj
     * @param {Object} opt
     * @returns {Promise<Object>} result
     */
    setDI(obj: any, opt: any): Promise<any>;
    #private;
}
declare namespace NativeAsync {
    export { TOptionIoC, TIoC };
}
import Factory = require("../../../creational/FactoryAsync");
type TOptionIoC = import('../../../types').TOptionIoC;
type TIoC = import('../IoC');
