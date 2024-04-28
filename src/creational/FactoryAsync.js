/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        24/03/2024
 * @description Factory pattern with support for ESM and CJS
 * @copyright   Copyright (c) 2019-2050
 * @license     GPL
 * @version     1.0
 **/

const inherit = require("../inherit");
const Loader = require("../common/loader");

/**
 * @typedef {Object} BuildOption
 * @property {*} cls - taget Class.
 * @property {Array} params - params for taget constructor.
 */
class FactoryAsync {

    /**
     * @type {Object}
     */
    loader;

    /**
     * @type {Object}
     */
    logger;

    /**
     * @param {Object} [payload]
     * @param {Object} [payload.logger] 
     * @param {Object} [payload.loader] 
     */
    constructor(payload) {
        this.logger = payload?.logger || console;
        this.loader = payload?.loader || new Loader();
    }

    /**
     * @description Get as array
     * @param {Object} payload The input data.
     * @return {Array} 
     */
    asList(payload) {
        return (payload instanceof Array ? payload : [payload]);
    }

    /**
     * @description Load Class
     * @param {Object} [payload] The input data.
     * @param {String} [payload.name] taget name
     * @param {String} [payload.namespace] taget name
     * @param {String} [payload.file] taget file path
     * @param {String} [payload.mode] factory mode
     * @param {String} [payload.search] 
     * @return {Promise<any>} Class
     */
    async load(payload) {
        try {
            let options = { mode: payload?.mode };
            let content = await this.require(payload.file || payload.name, options);
            if (!content?.data) return null;
            let Src = content.data;
            if (Src?.type === 'mjs') {
                Src = Src?.default || Src;
            }
            return inherit.namespace(Src, payload.namespace || payload.name);
        } catch (error) {
            this.log({
                src: "ksdp:creational:FactoryAsync:load",
                data: payload,
                error
            });
            return null;
        }
    }

    /**
     * @description require a file or list of them
     * @param {String|Array<String>} file 
     * @param {Object} [option] 
     * @returns {Promise<Object>} result - The output object.
     * @property {Object} [result.data] - data content.
     * @property {String} [result.file] - file path.
     */
    async require(file, option = undefined) {
        try {
            if (Array.isArray(file)) {
                for (let i of file) {
                    let content = this.require(i);
                    if (content) {
                        return content;
                    }
                }
            } else {
                return {
                    data: await this.loader?.load(file, option),
                    file
                };
            }
        }
        catch (error) {
            return null;
        }
    }

    /**
     * @description Get Instance
     * @param {BuildOption|*} payload taget Class
     * @return {Object} Instance
     * @example new (Function.prototype.bind.apply(Cls, Prm))
     */
    build(payload = null) {
        if (!payload) return null;
        if (!payload.cls) {
            payload = { cls: payload?.default instanceof Function ? payload?.default : payload };
        }
        try {
            let Cls = payload.cls?.default instanceof Function ? payload.cls?.default : payload.cls;
            if (payload.cls?.type === 'mjs') {
                Cls = Cls?.default || Cls;
            }
            if (!inherit.isClass(Cls)) {
                return Cls;
            }
            let params = this.asList(payload.params);
            return new Cls(...params);
        } catch (error) {
            this.log({
                src: "ksdp:creational:FactoryAsync:build",
                data: payload,
                error
            });
            return null;
        }
    }

    /**
     * @description Get Instance
     * @param {Object} [payload] The input data.
     * @param {String} [payload.name] taget Name
     * @param {String} [payload.file] taget File Path
     * @param {Object} [payload.params] params for taget constructor
     * @param {*} [payload.cls] class or object
     * @return {Promise<Object>} Instance
     */
    async get(payload = null) {
        if (!payload) {
            return null;
        }
        payload.cls = payload.cls || await this.load(payload);
        if (!payload.cls) {
            return null;
        }
        return this.build(payload);
    }

    /**
     * @description internal log handler 
     */
    log() {
        (this.logger?.log instanceof Function) && this.logger.log(...arguments);
        return this;
    }
}

module.exports = FactoryAsync;