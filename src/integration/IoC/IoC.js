/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        09/11/2019
 * @copyright   Copyright (c) 2019-2050
 * @description Native Compiler 
 * @dependency  Factory
 * @license     GPL
 * @version     1.0
 **/

const Strategy = require('../../behavioral/Strategy');
const _path = require('path')
/**
 * @typedef {import('../../types').TOptionIoC} TOptionIoC
 */
class IoC {

    #analyzer;
    #compiler;

    /**
     * @returns {Strategy}
     */
    get compiler() {
        return this.#compiler;
    }

    /**
     * @returns {Strategy}
     */
    get analyzer() {
        return this.#analyzer;
    }

    constructor(opt = null) {
        this.opt = {};
        this.ctrls = {};
        this.error = null;
        this.#analyzer = new Strategy({
            path: _path.resolve(__dirname),
            default: 'analyzer',
            params: [this]
        });
        this.#compiler = new Strategy({
            path: _path.resolve(__dirname),
            default: 'compiler',
            params: [this]
        });
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
     * @description Inversion of Control Pattern (IoC)
     * @param {String|TOptionIoC} opt The input data.
     * @returns {Object} resource
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
     * @description add a new config item 
     * @param {Object|Array} option 
     * @param {String} index 
     * @returns {IoC} self
     */
    add(option, index = null) {
        if (Array.isArray(option)) {
            for (let item of option) {
                item && this.add(item, index);
            }
        } else {
            if (!this.opt?.src) {
                this.opt = this.opt || {};
                this.opt.src = this.opt.src || {};
            }
            let key = index || option?.name || 'default';
            this.opt.src[key] = option;
        }
        return this;
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
     * @description Service Locator Pattern (SL)
     * @param {Object} opt 
     * @returns result
     */
    process(opt) {
        let driver = this.compiler.get(opt.type, { name: 'Native', params: [this] });
        return driver?.run(opt);
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
        const drvDef = { name: 'Native', params: [this] };
        cfg.name = cfg.name || (typeof (opt) === 'string' ? opt : 'DefaultService');
        cfg.type = cfg.type || 'instance';
        cfg.source = cfg.source || 'default';
        cfg.namespace = cfg.namespace || '';
        let driver = this.analyzer.get(cfg.type || drvDef, drvDef);
        return driver?.run(opt);
    }
}

module.exports = IoC;