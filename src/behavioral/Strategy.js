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
     * @param {String} type Strategy Key Path
     * @param {String} name Strategy Key Name
     * @param {Any} params  
     * @return {Object} This
     */
    configure(payload = {}) {
        this.default = payload.default || this.default;
        this.path = payload.path || this.path;
        this.params = !payload.params ? this.params : this.asArray(payload.params);
        this.logger = payload.logger || console;
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
     * @param {Object|Array} payload
     * @param {String} payload.type Strategy Key Path
     * @param {String} payload.path Strategy Key Path
     * @param {String} payload.name Strategy Key Name
     * @param {Array} payload.params Single param for Strategy constructor
     * @return {Object|Array} Strategy Instance
     */
    get(payload = {}) {
        try {
            if (Array.isArray(payload)) {
                const out = [];
                for (let item of payload) {
                    out.push(this.get(item));
                }
                return out;
            }
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
                console.log(_path.join(path, type, Stg + ".js"))
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
     * @description Set strategy
     * @param {Object|Array} payload 
     * @param {String} alias [OPTIONAL]
     * @return {Object|Array} Strategy Instance
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