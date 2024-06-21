export = NativeAsync;
/**
 * @typedef {import('../../../types').TOptionIoC} TOptionIoC
 * @typedef {import('../IoC')} TIoC
 */
declare class NativeAsync {
    /**
     * @param {TIoC|null} [ioc]
     * @param {Console|null} [logger]
     */
    constructor(ioc?: TIoC | null, logger?: Console | null);
    /**
     * @returns {Inherit}
     */
    get inherit(): {
        imitate: typeof import("../../../inherit/imitate");
        namespace: typeof import("../../../inherit/namespace");
        ns: typeof import("../../../inherit/namespace");
        isClass: (target: any | Function) => boolean;
        className: (target: any | Function) => string;
    };
    /**
     * @returns {Factory}
     */
    get factory(): Factory;
    /**
     * @returns {TIoC|null}
     */
    get ioc(): import("../IoC");
    /**
     * @description Service Locator Pattern (SL)
     * @param {any} opt
     * @returns result
     */
    run(opt: any): Promise<any>;
    /**
     * @description Factory Pattern
     * @param {Object} opt
     * @param {String} [opt.name]
     * @param {String} [opt.file]
     * @param {any} [opt.params]
     * @param {any} [opt.options]
     * @param {any} [opt.dependency]
     * @returns {Promise<any>} result
     */
    instance(opt: {
        name?: string;
        file?: string;
        params?: any;
        options?: any;
        dependency?: any;
    }): Promise<any>;
    /**
     * @description excecute action from object
     * @param {Object} opt
     * @param {String} opt.action
     * @param {any} opt.params
     * @returns {Promise<any>}
     */
    action(opt: {
        action: string;
        params: any;
    }): Promise<any>;
    /**
     * @description get dependency
     * @param {Object} opt
     * @returns {Promise<Object|null>} result
     */
    dependency(opt: any): Promise<any | null>;
    /**
     * @description Dependency Injection Pattern (DI)
     * @param {any} obj
     * @param {Object} [opt]
     * @param {import('../../../types').TList} [opt.dependency]
     * @returns {Promise<any>} result
     */
    setDI(obj: any, opt?: {
        dependency?: import("../../../types").TList;
    }): Promise<any>;
    #private;
}
declare namespace NativeAsync {
    export { TOptionIoC, TIoC };
}
import Factory = require("../../../creational/FactoryAsync");
type TOptionIoC = import("../../../types").TOptionIoC;
type TIoC = import("../IoC");
