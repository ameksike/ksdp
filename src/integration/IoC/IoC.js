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
const inherit = require('../../inherit');
const _path = require('path');

/**
 * @typedef {import('../../types').TOptionIoC} TOptionIoC
 */
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
     * @param {Object} [opt] The input data.
     * @param {String} [opt.name] Alias for it lib
     * @param {Object} [opt.src] Data source 
     * @param {String} [opt.path] Search path 
     * @param {Object} [opt.error] Error Handler 
     */
    configure(opt = null) {
        opt = opt || {};
        this.opt.src = Object.assign(this.opt.src || {}, opt.src || {});
        this.opt.name = opt.name || this.opt.name || 'IoC';
        this.opt.path = opt.path || this.opt.path || __dirname + '/../../../';
        this.error = opt.error || this.error;
        return this;
    }

    /**
     * @description Fill payload
     * @param {TOptionIoC|String} opt The input data.  
     * @returns {Object}
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
                cfg.params = cfg.options || cfg.params;
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

    /**
     * @description register a resource
     * @param {Object|String|Function|Array} value 
     * @param {Object} [opt] 
     * @returns {IoC} self
     */
    set(value, opt = {}) {
        opt = this.fill(opt);
        opt.rows = opt.rows || [];
        if (Array.isArray(value)) {
            for (let item of value) {
                item?.value && this.set(item.value, { opt, ...this.fill(item.option) });
            }
        } else {
            this.ctrls[opt.type] = this.ctrls[opt.type] || {};
            this.ctrls[opt.type][opt.id] = value;
            opt.rows.push(value);
        }
        return this;
    }

    /**
     * @description remove a resource
     * @param {Object|String|Function|Array} opt 
     * @param {Object} [out] 
     * @returns {IoC} self
     */
    del(opt, out = {}) {
        out = out || {};
        out.rows = opt.rows || [];
        if (Array.isArray(opt)) {
            for (let item of opt) {
                this.del(item, out);
            }
        } else {
            opt = this.fill(opt);
            this.ctrls[opt.type] = this.ctrls[opt.type] || {};
            out.rows.push(this.ctrls[opt.type][opt.id]);
            delete this.ctrls[opt.type][opt.id];
        }
        return this;
    }

    /**
     * @description alias for register a resource
     * @param {Object|String|Function|Array} value 
     * @param {Object} [opt] 
     * @returns {IoC} self
     */
    register(value, opt = {}) {
        return this.set(value, opt);
    }

    /**
     * @description alias for remove a resource
     * @param {Object|String|Function|Array} opt 
     * @param {Object} out 
     * @returns {IoC} self
     */
    unregister(opt = {}, out = {}) {
        return this.del(opt, out);
    }

    /**
     * @description Inversion of Control Pattern (IoC)
     * @param {TOptionIoC|String} opt The input data.
     * @returns {Object}
     */
    get(opt = {}) {
        let cfg = this.fill(opt);
        if (cfg.name === this.opt.name) {
            return this;
        }
        this.ctrls[cfg.type] = this.ctrls[cfg.type] || {};
        if (!this.ctrls[cfg.type][cfg.id]) {
            this.ctrls[cfg.type][cfg.id] = this.process(cfg);
        }
        return this.ctrls[cfg.type][cfg.id];
    }

    /**
     * @description Service Locator Pattern (SL)
     * @param {Object} opt 
     * @returns result
     */
    process(opt) {
        let path, out = null;
        let isPack = (itm) => itm?.moduleType === "lib" || itm?.moduleType === "package";
        let dirPack = (name) => require?.resolve && _path.dirname(require.resolve(name));
        switch (opt.type) {
            case 'module':
                opt.file = opt.file || _path.join(this.opt.path, opt.name);
                out = this.instance(opt);
                out && (out._ = { type: 'module', path: _path.resolve(opt.file) });
                break;

            case 'raw':
                out = opt.options || opt.data;
                break;

            case 'package':
                out = require(opt.name);
                out = this.inherit.namespace(out, opt.namespace || opt.name);
                out = this.setDI(out, opt);
                break;

            case 'lib':
                out = require(opt.name);
                out = this.inherit.namespace(out, opt.namespace || opt.name);
                out = this.factory.build({ cls: out, ...opt });
                out = this.setDI(out, opt);
                out && (out._ = { type: 'lib', path: dirPack(opt.name) });
                out?.init instanceof Function && out.init();
                break;

            case 'alias':
                out = this.get(opt.source);
                break;

            default:
                path = isPack(opt) ? dirPack(opt.module) : this.opt.path;
                path = !isPack(opt) && opt.module ? _path.join(path, opt.module) : path;
                path = opt.path ? _path.join(path, opt.path) : path;

                opt.file = opt.file || [
                    _path.join(path, opt.name + '.js'),
                    _path.join(path, opt.name, 'index.js'),
                    _path.join(path, opt.name, opt.name + '.js'),
                ];
                out = this[opt.type] ? this[opt.type](opt) : null;
                break;
        }
        return out;
    }

    /**
     * @description Factory Pattern load Type 
     * @param {Object} opt 
     * @returns {*} result
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
     * @returns {*}
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