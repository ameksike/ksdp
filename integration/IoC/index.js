/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		09/11/2019
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
class IoC {

    constructor(opt = null) {
        this.opt = {};
        this.ctrls = {};
        this.error = null;
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
        this.opt.src = opt.src || {};
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
        const cfg = opt instanceof Object ? opt : (this.opt.src[opt] || { name: opt });
        cfg.name = cfg.name || (typeof (opt) === 'string' ? opt : 'DefaultService');
        cfg.type = cfg.type || 'instance';
        cfg.source = cfg.source || 'default';
        cfg.module = cfg.module || (cfg.type === 'module' ? cfg.name : 'app');
        cfg.path = cfg.path || (cfg.type === 'module' ? '' : 'service');
        cfg.id = cfg.id || (cfg.type != 'module' ? cfg.module + ':' + cfg.path + ':' + cfg.name : cfg.name);
        return cfg;
    }

    set(value, opt = {}) {
        opt = this.fill(opt);
        this.ctrls[opt.type]
        this.ctrls[opt.type] = this.ctrls[opt.type] || {};
        this.ctrls[opt.type][opt.id] = value;
    }

    /**
     * @description Inversion of Control Pattern (IoC)
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
     * @param {*} opt 
     * @returns 
     */
    process(opt) {
        let path, out = null;
        switch (opt.type) {
            case 'module':
                opt.file = opt.file || this.opt.path + opt.name;
                out = this.instance(opt);
                break;

            case 'raw':
                out = opt.options;
                break;

            case 'lib':
                out = require(opt.name);
                break;

            case 'alias':
                out = this.get(opt.source);
                break;

            default:
                path = this.opt.path;
                path = opt.module ? path + opt.module + '/' : path;
                path = opt.path ? path + opt.path + '/' : path;

                opt.file = opt.file || this.validPath([
                    path + opt.name + '.js',
                    path + opt.name + '/' + opt.name + '.js',
                    path + opt.name + '/index.js'
                ]);
                out = this[opt.type] ? this[opt.type](opt) : null;
                break;
        }
        return out;
    }

    /**
     * @description get valid path from path list
     * @param {array[string]} list 
     */
    validPath(list) {
        const fs = require('fs');
        for (let i in list) {
            if (fs.existsSync(list[i])) {
                return list[i];
            }
        }
        return false;
    }

    /**
     * @description Factory Pattern load Type 
     * @param {*} opt 
     * @returns {Class}
     */
    type(opt) {
        try {
            const Ctrt = require(opt.file);
            return Ctrt[opt.name] || Ctrt;
        }
        catch (error) {
            if (this.error) {
                this.error.on(error);
            }
            return null;
        }
    }

    /**
     * @description Factory Pattern
     * @param {*} opt 
     * @returns 
     */
    instance(opt) {
        try {
            const target = this.type(opt);
            let obj = (target instanceof Function) ? new target(opt.options) : target;
            obj = this.setDI(obj, opt);
            if (obj.init) {
                obj.init();
            }
            return obj;
        }
        catch (error) {
            if (this.error) {
                this.error.on(error);
            }
            return null;
        }
    }

    /**
     * @description excecute action from object
     * @param {*} opt 
     * @returns {Class}
     */
    action(opt) {
        const object = this.instance(opt);
        const action = object[opt.action];
        return (action instanceof Function) ? action.apply(object, opt.params || []) : null;
    }

    /**
     * @description Dependency Injection Pattern (DI)
     * @param {*} obj 
     * @param {*} opt 
     * @returns Object
     */
    setDI(obj, opt) {
        if (!opt && !opt.dependency) {
            return obj;
        }
        for (let i in opt.dependency) {
            obj[i] = this.get(opt.dependency[i]);
        }
        return obj;
    }
}
module.exports = IoC;
