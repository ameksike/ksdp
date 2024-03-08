/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/10/2019
 * @description Factory pattern
 * @copyright  	Copyright (c) 2019-2050
 * @license    	GPL
 * @version    	1.0
 **/

const inherit = require("../inherit");

/**
 * @typedef {Object} BuildOption
 * @property {*} cls - taget Class.
 * @property {Array} params - params for taget constructor.
 */
class Factory {

    constructor(payload) {
        this.logger = payload?.logger || console;
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
     * @param {String} [payload.search] 
     * @return {*} Class
     */
    load(payload) {
        try {
            const content = this.require(payload.file);
            if (!content?.data) return null;
            const Src = content.data;
            return inherit.namespace(Src, payload.namespace || payload.name);
        } catch (error) {
            this.log({
                src: "ksdp:creational:Factory:load",
                data: payload,
                error
            });
            return null;
        }
    }

    /**
     * @description require a file or list of them
     * @param {String|Array<String>} file 
     * @returns {Object} result - The output object.
     * @property {Object} [result.data] - data content.
     * @property {String} [result.file] - file path.
     */
    require(file) {
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
                    data: require(file),
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
            payload = { cls: payload };
        }
        try {
            const Cls = payload.cls;
            if (!(Cls instanceof Function)) {
                return Cls;
            }
            const params = this.asList(payload.params);
            return new Cls(...params);
        } catch (error) {
            this.log({
                src: "ksdp:creational:Factory:build",
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
     * @return {Object} Instance
     */
    get(payload = null) {
        if (!payload) {
            return null;
        }
        payload.cls = payload.cls || this.load(payload);
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

module.exports = Factory;