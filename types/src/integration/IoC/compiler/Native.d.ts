export = Native;
/**
 * @typedef {import('../../../types').TOptionIoC} TOptionIoC
 * @typedef {import('../IoC')} TIoC
 * @typedef {import('../../../types').TList} TList
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
     * @param {String} [opt.name]
     * @param {String} [opt.file]
     * @param {any} [opt.params]
     * @param {any} [opt.options]
     * @param {any} [opt.dependency]
     * @returns {any} result
     */
    instance(opt: {
        name?: string;
        file?: string;
        params?: any;
        options?: any;
        dependency?: any;
    }): any;
    /**
     * @description excecute action from object
     * @param {Object} opt
     * @param {String} opt.action
     * @param {any} opt.params
     * @returns {*}
     */
    action(opt: {
        action: string;
        params: any;
    }): any;
    /**
     * @description get dependency
     * @param {Object} opt
     * @returns {Object} result
     */
    dependency(opt: any): any;
    /**
     * @description Dependency Injection Pattern (DI)
     * @param {any} obj
     * @param {Object} [opt]
     * @param {TList} [opt.dependency]
     * @returns {any} result
     */
    setDI(obj: any, opt?: {
        dependency?: TList;
    }): any;
    #private;
}
declare namespace Native {
    export { TOptionIoC, TIoC, TList };
}
import Factory = require("../../../creational/Factory");
type TOptionIoC = import("../../../types").TOptionIoC;
type TIoC = import("../IoC");
type TList = import("../../../types").TList;
