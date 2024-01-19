export = IoC;
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
     * @param {Object} opt The input data.
     * @param {String} opt.name Alias for it lib
     * @param {Object} opt.src Data source
     * @param {String} opt.path Search path
     * @param {Object} opt.error Error Handler
     */
    configure(opt?: {
        name: string;
        src: any;
        path: string;
        error: any;
    }): this;
    /**
     * @description Fill payload
     * @param {Object} opt The input data.
     * @param {String} opt.name [OPTIONAL] DEFAULT['DefaultService']
     * @param {String} opt.type [OPTIONAL] DEFAULT['instance'] VALUES['module', 'type', 'instance', 'action', 'raw', 'alias', 'lib']
     * @param {String} opt.module [OPTIONAL] DEFAULT['app']
     * @param {String} opt.dependency [OPTIONAL] DEFAULT[null]
     * @param {Object} opt.options [OPTIONAL] DEFAULT[null] only for opt.type ['instance', 'action', 'raw']
     * @param {String} opt.source [OPTIONAL] DEFAULT['default'] only for opt.type 'alias'
     * @param {Object} opt.params [OPTIONAL] DEFAULT[null] only for opt.type 'action'
     * @param {String} opt.path [OPTIONAL] DEFAULT[@opt.type]
     * @param {String} opt.file [OPTIONAL]
     * @param {String} opt.id [OPTIONAL]
     * @returns {Object}
     */
    fill(opt: {
        name: string;
        type: string;
        module: string;
        dependency: string;
        options: any;
        source: string;
        params: any;
        path: string;
        file: string;
        id: string;
    }): any;
    set(value: any, opt?: {}): void;
    /**
     * @description Inversion of Control Pattern (IoC)
     * @param {Object} opt The input data.
     * @param {String} opt.name [OPTIONAL] DEFAULT['DefaultService']
     * @param {String} opt.namespace [OPTIONAL]
     * @param {String} opt.type [OPTIONAL] DEFAULT['instance'] VALUES['module', 'type', 'instance', 'action', 'raw', 'alias', 'lib', 'package']
     * @param {String} opt.module [OPTIONAL] DEFAULT['app']
     * @param {String} opt.dependency [OPTIONAL] DEFAULT[null]
     * @param {Object} opt.options [OPTIONAL] DEFAULT[null] only for opt.type ['instance', 'action', 'raw']
     * @param {String} opt.source [OPTIONAL] DEFAULT['default'] only for opt.type 'alias'
     * @param {Object} opt.params [OPTIONAL] DEFAULT[null] only for opt.type 'action'
     * @param {String} opt.path [OPTIONAL] DEFAULT[@opt.type]
     * @param {String} opt.file [OPTIONAL]
     * @param {String} opt.id [OPTIONAL]
     * @returns {Object}
     */
    get(opt?: {
        name: string;
        namespace: string;
        type: string;
        module: string;
        dependency: string;
        options: any;
        source: string;
        params: any;
        path: string;
        file: string;
        id: string;
    }): any;
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
import Factory = require("../../creational/Factory");
