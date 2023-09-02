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
class Factory {

    constructor(payload) {
        this.logger = payload?.logger || console;
    }

    /**
     * @description Get as array
     * @param {Any} payload value 
     * @return {Array} 
     */
    asList(payload) {
        return (payload instanceof Array ? payload : [payload]);
    }

    /**
     * @description get valid path from path list
     * @param {array[string]} target 
     */
    validPath(target) {
        const fs = require('fs');
        if (target instanceof Array) {
            for (let i in target) {
                if (fs.existsSync(target[i])) {
                    return target[i];
                }
            }
        }
        return target;
    }

    /**
     * @description Load Class
     * @param {String} payload.name taget name
     * @param {String} payload.file taget file path
     * @param {String} payload.search 
     * @return {Any} Class
     */
    load(payload) {
        try {
            payload.search = payload.search || true;
            const file = payload.search ? this.validPath(payload.file) : payload.file;
            if (!file) return null;
            const Src = require(file);
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
     * @description Get Instance
     * @param {Object|Function} payload taget Class
     * @param {Class|Function} payload.cls taget Class
     * @param {Array} payload.params params for taget constructor
     * @return {Object} Instance
     * @example new (Function.prototype.bind.apply(Cls, Prm))
     */
    build(payload = null) {
        if (!payload) return null;
        if (payload instanceof Function) {
            payload = { cls: payload };
        }
        try {
            const Cls = payload.cls;
            const Prm = this.asList(payload.params);
            return (Cls instanceof Function) ? new Cls(...Prm) : payload;
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
     * @param {String} payload.name taget Name
     * @param {String} payload.file taget File Path
     * @param {Any} payload.params params for taget constructor
     * @return {Object} Instance
     */
    get(payload = null) {
        if (!payload) return null;
        payload.cls = this.load(payload);
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