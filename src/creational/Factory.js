/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/10/2019
 * @description Factory pattern
 * @copyright  	Copyright (c) 2019-2050
 * @license    	GPL
 * @version    	1.0
 * */
class Factory {

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
        } else {
            if (fs.existsSync(target)) {
                return target;
            }
        }
        return false;
    }

    /**
     * @description Namespace resolution 
     * @param {Any} src 
     * @param {String} name 
     */
    namespace(src, name = null) {
        if (!name) return src;
        const ns = typeof (name) == 'string' ? name.split(".") : name;
        let target = src[ns[0]];
        for (let i = 1; i < ns.length; i++) {
            target = target[ns[i]];
        }
        return target || src;
    }

    /**
     * @description Load Class
     * @param {String} payload.name taget name
     * @param {String} payload.file taget file path
     * @return {Any} Class
     */
    load(payload) {
        try {
            const file = this.validPath(payload.file);
            if (!file) return null;
            const Src = require(file);
            return this.namespace(Src, payload.namespace || payload.name);
        } catch (error) {
            console.log(error);
            return null;
        }
    }


    /**
     * @description Get Instance
     * @param {Class} payload.cls taget Class
     * @param {Any} payload.params params for taget constructor
     * @return {Object} Instance
     */
    build(payload = null) {
        if (!payload) return null;
        try {
            const Cls = payload.cls;
            const Prm = this.asList(payload.params);
            const Obj = (Cls instanceof Function) ? new Cls(...Prm) : Cls;
            // this.ctrl[type][name] = new (Function.prototype.bind.apply(Cls, params));
            return Obj;
        } catch (error) {
            console.log(error);
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
}

module.exports = Factory;