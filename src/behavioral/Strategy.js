/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @description Strategy pattern
 * @date		07/10/2019
 * @copyright  	Copyright (c) 2019-2050
 * @dependency  Factory
 * @license    	CPL
 * @version    	1.0
 **/
const Factory = require('../creational/Factory');
const _path = require("path");

/**
 * @typedef {Object} StrategyOption
 * @property {String} [type] - Strategy Key Type.
 * @property {String} [path] - Strategy Key Path.
 * @property {String} [name] - Strategy Key Name.
 * @property {Array} [params] - Single param for Strategy constructor.
 * @property {Boolean|Number} [safe] - Single param for Strategy constructor.
 * @property {*} [target] - Class or Object
 */
class Strategy {

    constructor(payload) {
        this.ctrl = {};
        this.params = [];
        this.path = '.';
        this.default = 'default';
        this.factory = new Factory();
        this.configure(payload);
    }

    /**
     * @description Get strategy
     * @param {Object} [payload] The input data.
     * @param {String} [payload.name='Default'] Strategy Key Name
     * @param {String} [payload.default='Default'] Strategy Key Name
     * @param {Object} [payload.params]  
     * @param {Console} [payload.logger]  
     * @param {String} [payload.path]  
     * @return {Strategy} self
     */
    configure(payload = {}) {
        this.default = payload?.default || payload?.name || this.default;
        this.path = payload?.path || this.path;
        this.params = payload?.params || this.params;
        this.logger = payload?.logger || console;
        return this;
    }

    /**
     * @description internal log handler 
     */
    log() {
        (this.logger?.log instanceof Function) && this.logger.log(...arguments);
        return this;
    }

    /**
      * @description Get strategy Instance
      * @param {(String|StrategyOption)} payload
      * @return {Object} Strategy Instance
      */
    getOne(payload = {}) {
        try {
            payload = typeof (payload) === 'string' ? { name: payload } : payload;
            const type = payload.type || this.default;
            const path = payload.path || this.path;
            const name = payload.name || 'Default';
            this.ctrl[type] = this.ctrl[type] || {};

            if (!this.ctrl[type][name]) {
                const Stg = name.charAt(0).toUpperCase() + name.slice(1);
                this.ctrl[type][name] = this.factory.get({
                    name: Stg,
                    file: _path.join(path, type, Stg + ".js"),
                    params: payload.params
                });
            }
            return this.ctrl[type][name];
        }
        catch (error) {
            this.log({
                src: "ksdp:behavioral:Strategy:get",
                data: payload,
                error
            });
            return null;
        }
    }

    /**
     * @description Get strategy Instance
     * @param {(String|String[]|StrategyOption|Array<StrategyOption>)} payload
     * @return {Object|Array<Object>} Strategy Instance
     */
    get(payload = {}) {
        try {
            if (Array.isArray(payload)) {
                const out = [];
                for (let item of payload) {
                    out.push(this.getOne(item));
                }
                return out;
            }
            return this.getOne(payload);
        }
        catch (error) {
            this.log({
                src: "ksdp:behavioral:Strategy:get",
                data: payload,
                error
            });
            return null;
        }
    }

    /**
     * @description Set strategy
     * @param {StrategyOption|Array<StrategyOption>} payload 
     * @param {String} [alias=""]
     * @return {Object|Array<Object>} Strategy Instance
     */
    set(payload = {}, alias = "") {
        try {
            if (!payload) {
                return null;
            }
            if (Array.isArray(payload)) {
                const out = [];
                for (let item of payload) {
                    out.push(this.set(item, alias));
                }
                return out;
            }
            const type = payload.type || this.default;
            const name = alias || payload.name || 'Default';
            this.ctrl[type] = this.ctrl[type] || {};
            if (!payload.safe || (payload.safe && !this.ctrl[type][name])) {
                const resorce = payload.target || payload;
                this.ctrl[type][name] = this.factory.build(resorce);
            }
            return this.ctrl[type][name];
        }
        catch (error) {
            this.log({
                src: "ksdp:behavioral:Strategy:set",
                data: payload,
                error
            });
            return null;
        }
    }
}

module.exports = Strategy;