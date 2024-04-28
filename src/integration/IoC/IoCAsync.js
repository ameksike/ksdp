/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        05/10/2023
 * @copyright   Copyright (c) 2019-2050
 * @description IoC, LS, DI
 * @requires    Strategy
 * @license     LGPL
 * @version     1.0
 **/

const Strategy = require('../../behavioral/StrategyAsync');
const _path = require('path')
/**
 * @typedef {import('../../types').TOptionIoC} TOptionIoC
 */
class IoCAsync {

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
        this.logger = opt?.logger || null;

        this.#analyzer = new Strategy({
            path: _path.resolve(__dirname),
            default: 'analyzer',
            params: [this, this.logger]
        });

        this.#compiler = new Strategy({
            path: _path.resolve(__dirname),
            default: 'compiler',
            params: [this, this.logger]
        });

        this.configure(opt);
    }

    /**
     * @description register Native alias 
     */
    async init() {
        if (this.#compiler?.ctrl?.compiler?.lib && this.#analyzer?.ctrl?.analyzer?.lib) {
            return;
        }
        let [natAnalizer, natCompiler] = await Promise.all([
            this.analyzer.get({ name: 'Native', params: [this] }),
            this.compiler.get({ name: 'NativeAsync', params: [this] })
        ]);
        await Promise.all([
            this.#analyzer.set(natAnalizer, 'lib'),
            this.#analyzer.set(natAnalizer, 'module'),
            this.#analyzer.set(natAnalizer, 'package'),
            this.#analyzer.set(natAnalizer, 'instance'),
            this.#compiler.set(natCompiler, 'lib'),
            this.#compiler.set(natCompiler, 'module'),
            this.#compiler.set(natCompiler, 'package'),
            this.#compiler.set(natCompiler, 'instance'),
        ]);
    }

    /**
     * @description Configure Lib
     * @param {Object} [opt] The input data.
     * @param {String} [opt.name] Alias for it lib
     * @param {Object} [opt.src] Data source 
     * @param {String} [opt.path] Search path 
     * @param {Object} [opt.error] Error Handler 
     * @param {Object} [opt.logger] logger Handler 
     */
    configure(opt = null) {
        opt = opt || {};
        this.opt.src = Object.assign(this.opt.src || {}, opt.src || {});
        this.opt.name = opt.name || this.opt.name || 'IoC';
        this.opt.path = opt.path || this.opt.path || __dirname + '/../../../';
        this.error = opt.error || this.error;
        this.logger = opt.logger || this.logger;
        return this;
    }

    /**
     * @description Inversion of Control Pattern (IoC)
     * @param {String|TOptionIoC} opt The input data.
     * @returns {Promise<Object>} resource
     */
    async get(opt = {}) {
        let cfg = await this.fill(opt);
        if (cfg.name === this.opt.name) {
            return this;
        }

        if (cfg.mode === 'transient') {
            return await this.process(cfg);
        }

        this.ctrls[cfg.type] = this.ctrls[cfg.type] || {};
        if (!this.ctrls[cfg.type][cfg.id]) {
            this.ctrls[cfg.type][cfg.id] = await this.process(cfg);
        }
        return this.ctrls[cfg.type][cfg.id];
    }

    /**
     * @description add a new config item 
     * @param {Object|Array} option 
     * @param {String} index 
     * @returns {Promise<IoCAsync>} self
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
        return Promise.resolve(this);
    }

    /**
     * @description register a resource
     * @param {Object|String|Function|Array} value 
     * @param {Object} [opt] 
     * @returns {Promise<IoCAsync>} self
     */
    async set(value, opt = {}) {
        opt = await this.fill(opt);
        opt.rows = opt.rows || [];
        if (Array.isArray(value)) {
            for (let item of value) {
                let fill = await this.fill(item.option);
                item?.value && this.set(item.value, { opt, ...fill });
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
     * @returns {Promise<IoCAsync>} self
     */
    async del(opt, out = {}) {
        out = out || {};
        out.rows = opt.rows || [];
        if (Array.isArray(opt)) {
            for (let item of opt) {
                this.del(item, out);
            }
        } else {
            opt = await this.fill(opt);
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
     * @returns {Promise<IoCAsync>} self
     */
    register(value, opt = {}) {
        return this.set(value, opt);
    }

    /**
     * @description alias for remove a resource
     * @param {Object|String|Function|Array} opt 
     * @param {Object} out 
     * @returns {Promise<IoCAsync>} self
     */
    unregister(opt = {}, out = {}) {
        return this.del(opt, out);
    }

    /**
     * @description Service Locator Pattern (SL)
     * @param {Object} opt 
     * @returns {Promise<any>} result
     */
    async process(opt) {
        await this.init();
        let driver = await this.compiler.get(opt.type, { name: 'NativeAsync', params: [this] });
        return await driver?.run(opt);
    }

    /**
     * @description Fill payload
     * @param {TOptionIoC|String} opt The input data.  
     * @returns {Promise<TOptionIoC>} option
     */
    async fill(opt) {
        await this.init();
        const cfg = opt instanceof Object ? opt : (this.opt.src[opt] || {
            name: opt
        });
        const drvDef = { name: 'Native', params: [this] };
        let driver = await this.analyzer.get(cfg.type || drvDef, drvDef);
        return driver?.run(opt);
    }
}

module.exports = IoCAsync;