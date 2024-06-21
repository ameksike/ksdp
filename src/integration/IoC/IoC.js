/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        09/11/2019
 * @copyright   Copyright (c) 2019-2050
 * @description IoC, LS, DI
 * @requires    Strategy
 * @license     LGPL
 * @version     1.0
 **/

const Strategy = require('../../behavioral/Strategy');
const _path = require('path')
/**
 * @typedef {import('../../types').TOptionIoC} TOptionIoC
 * @typedef {import('../../types').TList} TList
 */

class IoC {

    #analyzer;
    #compiler;

    /**
     *  @type {TOptionIoC} 
     */
    opt;

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

    /**
     * @param {*} opt 
     */
    constructor(opt = null) {
        this.opt = {};
        /** @type {any} */
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
     * @description register Native alias 
     */
    init() {
        if (this.#compiler?.ctrl?.compiler?.lib && this.#analyzer?.ctrl?.analyzer?.lib) {
            return;
        }
        /** @type {any} */
        let natAnalizer = this.analyzer.get({ name: 'Native', params: [this] });
        /** @type {any} */
        let natCompiler = this.compiler.get({ name: 'Native', params: [this] });
        this.#analyzer.set(natAnalizer, 'lib');
        this.#analyzer.set(natAnalizer, 'module');
        this.#analyzer.set(natAnalizer, 'package');
        this.#analyzer.set(natAnalizer, 'instance');
        this.#compiler.set(natCompiler, 'lib');
        this.#compiler.set(natCompiler, 'module');
        this.#compiler.set(natCompiler, 'package');
        this.#compiler.set(natCompiler, 'instance');
    }

    /**
     * @description Configure Lib
     * @param {TOptionIoC} [opt] The input data.
     */
    configure(opt) {
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
        /** @type {any} */
        let cfg = this.fill(opt);
        if (cfg.name === this.opt.name) {
            return this;
        }
        if (cfg.mode === 'transient') {
            return this.process(cfg);
        }
        this.ctrls[cfg.type] = this.ctrls[cfg.type] || {};
        if (!this.ctrls[cfg.type][cfg.id]) {
            this.ctrls[cfg.type][cfg.id] = this.process(cfg);
        }
        return this.ctrls[cfg.type][cfg.id];
    }

    /**
     * @description add a new config item 
     * @param {TList|Array<any>} option 
     * @param {String} [index] 
     * @returns {IoC} self
     */
    add(option, index) {
        if (Array.isArray(option)) {
            for (let item of option) {
                item && this.add(item, index);
            }
        } else {
            if (!this.opt?.src) {
                this.opt = this.opt || {};
                this.opt.src = this.opt.src || {};
            }
            let key = index || typeof option?.name === "string" && option?.name || 'default';
            this.opt.src[key] = option;
        }
        return this;
    }

    /**
     * @description register a resource
     * @param {Object|String|Function|Array<any>} value 
     * @param {Object} [option] 
     * @returns {IoC} self
     */
    set(value, option = {}) {
        let opt = this.fill(option) || {};
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
     * @param {Object|String|Function|Array<any>} opt 
     * @param {Object} [out] 
     * @param {Array<any>} [out.rows] 
     * @returns {IoC} self
     */
    del(opt, out) {
        out = out || {};
        out.rows = out.rows || [];
        if (Array.isArray(opt)) {
            for (let item of opt) {
                this.del(item, out);
            }
        } else {
            /** @type {any} */
            let _opt = this.fill(opt) || {};
            this.ctrls[_opt.type] = this.ctrls[_opt.type] || {};
            out.rows.push(this.ctrls[_opt.type][_opt.id]);
            delete this.ctrls[_opt.type][_opt.id];
        }
        return this;
    }

    /**
     * @description alias for register a resource
     * @param {Object|String|Function|Array<any>} value 
     * @param {Object} [opt] 
     * @returns {IoC} self
     */
    register(value, opt = {}) {
        return this.set(value, opt);
    }

    /**
     * @description alias for remove a resource
     * @param {Object|String|Function|Array<any>} opt 
     * @param {Object} out 
     * @returns {IoC} self
     */
    unregister(opt = {}, out = {}) {
        return this.del(opt, out);
    }

    /**
     * @description Service Locator Pattern (SL)
     * @param {Object} opt 
     * @param {(String|String[]|any)} opt.type 
     * @returns result
     */
    process(opt) {
        this.init();
        /** @type {any} */
        let driver = this.compiler.get(opt?.type, { name: 'Native', params: [this] });
        return driver?.run(opt);
    }

    /**
     * @description Fill payload
     * @param {TOptionIoC|String} opt The input data.  
     * @returns {any}
     */
    fill(opt) {
        this.init();
        /** @type {any} */
        const cfg = opt instanceof Object ? opt : (this.opt?.src && this.opt.src[opt] || {
            name: opt
        });
        const drvDef = { name: 'Native', params: [this] };
        /** @type {any} */
        let driver = this.analyzer.get(cfg.type || drvDef, drvDef);
        return driver?.run(opt);
    }
}

module.exports = IoC;