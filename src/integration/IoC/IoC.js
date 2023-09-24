/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		09/11/2019
 * @copyright  	Copyright (c) 2019-2050
 * @description Inversion of Control (IoC)
 * @dependency  Factory
 * @license    	GPL
 * @version    	1.0
 **/
const Factory = require('../../creational/Factory');
const inherit = require("../../inherit");

class IoC {

    constructor(opt = null) {
        this.opt = {};
        this.ctrls = {};
        this.error = null;
        this.factory = new Factory();
        this.inherit = inherit;
        this.configure(opt);
    }

    /**
     * @description Configure Lib
     * @param {String} opt.name Alias for it lib
     * @param {Object} opt.src Data source 
     * @param {String} opt.path Search path 
     * @param {Object} opt.error Error Handler 
     */
    configure(opt = null) {
        opt = opt || {};
        this.opt.src = Object.assign(this.opt.src || {}, opt.src || {});
        this.opt.name = opt.name || 'IoC';
        this.opt.path = opt.path || __dirname + '/../../../';
        this.error = opt.error || this.error;
        return this;
    }

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
    fill(opt) {
        const cfg = opt instanceof Object ? opt : (this.opt.src[opt] || {
            name: opt
        });
        cfg.name = cfg.name || (typeof (opt) === 'string' ? opt : 'DefaultService');
        cfg.type = cfg.type || 'instance';
        cfg.source = cfg.source || 'default';
        cfg.namespace = cfg.namespace || '';
        switch (cfg.type) {
            case 'module':
                cfg.module = cfg.module || cfg.name;
                cfg.id = cfg.id || cfg.name;
                break;

            case 'package':
            case 'lib':
                cfg.id = cfg.id || (cfg.type + ':' + cfg.name + (cfg.namespace ? '.' + cfg.namespace : ''));
                cfg.params = opt.options || cfg.params;
                break;

            case 'dependency':
                cfg.id = cfg.id || (cfg.module + ':' + cfg.path + ':' + cfg.name);
                break;

            default:
                cfg.module = cfg.module || 'app';
                cfg.path = cfg.path || 'service';
                cfg.id = cfg.id || (cfg.module + ':' + cfg.path + ':' + cfg.name);
                break;
        }
        return cfg;
    }

    set(value, opt = {}) {
        opt = this.fill(opt);
        this.ctrls[opt.type] = this.ctrls[opt.type] || {};
        this.ctrls[opt.type][opt.id] = value;
    }

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
    get(opt = {}) {
        opt = this.fill(opt);
        if (opt.name === this.opt.name) {
            return this;
        }
        this.ctrls[opt.type] = this.ctrls[opt.type] || {};
        if (!this.ctrls[opt.type][opt.id]) {
            this.ctrls[opt.type][opt.id] = this.process(opt);
        }
        return this.ctrls[opt.type][opt.id];
    }

    /**
     * @description Service Locator Pattern (SL)
     * @param {Object} opt 
     * @returns result
     */
    process(opt) {
        let path, out = null;
        switch (opt.type) {
            case 'module':
                opt.file = opt.file || this.opt.path + opt.name;
                out = this.instance(opt);
                break;

            case 'raw':
                out = opt.options || opt.data;
                break;

            case 'package':
                out = require(opt.name);
                out = this.inherit.namespace(out, opt.namespace || opt.name);
                break;

            case 'lib':
                out = require(opt.name);
                out = this.inherit.namespace(out, opt.namespace || opt.name);
                out = this.factory.build({ cls: out, ...opt });
                out = this.setDI(out, opt);
                if (out.init) {
                    out.init();
                }
                break;

            case 'alias':
                out = this.get(opt.source);
                break;

            default:
                path = this.opt.path;
                path = opt.module ? path + opt.module + '/' : path;
                path = opt.path ? path + opt.path + '/' : path;

                opt.file = opt.file || [
                    path + opt.name + '.js',
                    path + opt.name + '/' + opt.name + '.js',
                    path + opt.name + '/index.js'
                ];
                out = this[opt.type] ? this[opt.type](opt) : null;
                break;
        }
        return out;
    }

    /**
     * @description Factory Pattern load Type 
     * @param {Object} opt 
     * @returns {Class} result
     */
    type(opt) {
        try {
            return this.factory.load(opt);
        } catch (error) {
            if (this.error) {
                this.error.on(error);
            }
            return null;
        }
    }

    /**
     * @description Factory Pattern
     * @param {Object} opt 
     * @returns {Object} result
     */
    instance(opt) {
        try {
            let obj = this.factory.get({
                name: opt.name,
                file: opt.file,
                params: opt.options || opt.params
            });
            if (!obj) return null;
            obj = this.setDI(obj, opt);
            if (obj.init) {
                obj.init();
            }
            return obj;
        } catch (error) {
            if (this.error) {
                this.error.on(error);
            }
            return null;
        }
    }

    /**
     * @description excecute action from object
     * @param {Object} opt 
     * @returns {Class}
     */
    action(opt) {
        const object = this.instance(opt);
        const action = object[opt.action];
        return (action instanceof Function) ? action.apply(object, opt.params || []) : null;
    }

    /**
     * @description get dependency 
     * @param {Object} opt 
     * @returns {Object} result
     */
    dependency(opt) {
        return this.factory.load(opt);
    }

    /**
     * @description Dependency Injection Pattern (DI)
     * @param {Object} obj 
     * @param {Object} opt 
     * @returns {Object} result
     */
    setDI(obj, opt) {
        if (!obj || !opt || !opt.dependency) {
            return obj;
        }
        for (let i in opt.dependency) {
            obj[i] = this.get(opt.dependency[i]);
        }
        return obj;
    }
}

module.exports = IoC;