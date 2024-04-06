export = Native;
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
    run(opt: any): any;
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
    #private;
}
declare namespace Native {
    export { TOptionIoC, TIoC };
}
import Factory = require("../../../creational/Factory");
type TOptionIoC = import('../../../types').TOptionIoC;
type TIoC = import('../IoC');
