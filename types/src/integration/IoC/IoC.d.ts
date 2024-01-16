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
     * @param {String} opt.name Alias for it lib
     * @param {Object} opt.src Data source
     * @param {String} opt.path Search path
     * @param {Object} opt.error Error Handler
     */
    configure(opt?: any): this;
    /**
     * @description Fill payload
     * @param {string} opt.name [OPTIONAL] DEFAULT['DefaultService']
     * @param {string} opt.type [OPTIONAL] DEFAULT['instance'] VALUES['module', 'type', 'instance', 'action', 'raw', 'alias', 'lib']
     * @param {string} opt.module [OPTIONAL] DEFAULT['app']
     * @param {string} opt.dependency [OPTIONAL] DEFAULT[null]
     * @param {any}    opt.options [OPTIONAL] DEFAULT[null] only for opt.type ['instance', 'action', 'raw']
     * @param {string} opt.source [OPTIONAL] DEFAULT['default'] only for opt.type 'alias'
     * @param {any}    opt.params [OPTIONAL] DEFAULT[null] only for opt.type 'action'
     * @param {string} opt.path [OPTIONAL] DEFAULT[@opt.type]
     * @param {string} opt.file [OPTIONAL]
     * @param {string} opt.id [OPTIONAL]
     * @returns Object
     */
    fill(opt: any): any;
    set(value: any, opt?: {}): void;
    /**
     * @description Inversion of Control Pattern (IoC)
     * @param {string} opt.name [OPTIONAL] DEFAULT['DefaultService']
     * @param {string} opt.namespace [OPTIONAL]
     * @param {string} opt.type [OPTIONAL] DEFAULT['instance'] VALUES['module', 'type', 'instance', 'action', 'raw', 'alias', 'lib', 'package']
     * @param {string} opt.module [OPTIONAL] DEFAULT['app']
     * @param {string} opt.dependency [OPTIONAL] DEFAULT[null]
     * @param {any}    opt.options [OPTIONAL] DEFAULT[null] only for opt.type ['instance', 'action', 'raw']
     * @param {string} opt.source [OPTIONAL] DEFAULT['default'] only for opt.type 'alias'
     * @param {any}    opt.params [OPTIONAL] DEFAULT[null] only for opt.type 'action'
     * @param {string} opt.path [OPTIONAL] DEFAULT[@opt.type]
     * @param {string} opt.file [OPTIONAL]
     * @param {string} opt.id [OPTIONAL]
     * @returns {any}
     */
    get(opt?: {}): any;
    /**
     * @description Service Locator Pattern (SL)
     * @param {Object} opt
     * @returns result
     */
    process(opt: any): any;
    /**
     * @description Factory Pattern load Type
     * @param {Object} opt
     * @returns {Class} result
     */
    type(opt: any): Class;
    /**
     * @description Factory Pattern
     * @param {Object} opt
     * @returns {Object} result
     */
    instance(opt: any): any;
    /**
     * @description excecute action from object
     * @param {Object} opt
     * @returns {Class}
     */
    action(opt: any): Class;
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
