/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        09/11/2019
 * @copyright   Copyright (c) 2019-2050
 * @description Native Compiler 
 * @dependency  Factory
 * @license     LGPL
 * @version     1.0
 * @requires    Factory
 * @requires    Inherit
 **/
const Factory = require('../../../creational/FactoryAsync');
const Inherit = require('../../../inherit');
const _path = require('path');

/**
 * @typedef {import('../../../types').TOptionIoC} TOptionIoC
 * @typedef {import('../IoC')} TIoC
 */
class NativeAsync {

    /**
     * @type {Inherit}
     */
    #inherit;

    /**
     * @returns {Inherit}
     */
    get inherit() {
        return this.#inherit;
    }

    /**
     * @type {Factory}
     */
    #factory;

    /**
     * @returns {Factory}
     */
    get factory() {
        return this.#factory;
    }

    /**
     * @type {TIoC}
     */
    #ioc;

    /**
     * @returns {TIoC}
     */
    get ioc() {
        return this.#ioc;
    }

    /**
     * @param {TIoC|null} [ioc] 
     */
    constructor(ioc = null) {
        this.#ioc = ioc;
        this.#inherit = Inherit;
        this.#factory = new Factory();
    }

    /**
     * @description Service Locator Pattern (SL)
     * @param {Object} opt 
     * @returns result
     */
    async run(opt) {
        let path, out = null;
        switch (opt.type) {

            case 'raw':
                out = opt.options || opt.data;
                break;

            case 'module':
                opt.file = opt.file || _path.join(this.ioc?.opt?.path, opt.name);
                out = await this.instance(opt);
                break;

            case 'package':
                out = await this.factory.require(opt.name);
                out = this.inherit.namespace(out, opt.namespace || opt.name);
                out = await this.setDI(out, opt);
                break;

            case 'lib':
                out = await this.instance(opt);
                break;

            case 'alias':
                out = await this.ioc?.get(opt.source);
                break;

            default:
                path = this.ioc?.opt?.path;
                path = opt.module ? _path.join(path, opt.module) : path;
                path = opt.path ? _path.join(path, opt.path) : path;
                opt.file = opt.file || _path.join(path, opt.name);
                out = this[opt.type] ? await this[opt.type](opt) : null;
                break;
        }
        return out;
    }

    /**
     * @description Factory Pattern
     * @param {Object} opt 
     * @returns {Promise<Object>} result
     */
    async instance(opt) {
        try {
            if (opt.file) {
                opt.file = this.ioc?.opt?.path ? opt.file.replace('./', this.ioc.opt.path) : opt.file;
                opt.file = _path.resolve(opt.file);
            }
            opt.params = opt.options || opt.params;
            let obj = await this.factory.get(opt);
            if (!obj) return null;
            obj = await this.setDI(obj, opt);
            if (obj.init instanceof Function) {
                await obj.init();
            }
            return obj;
        } catch (error) {
            if (this.ioc?.error?.on instanceof Function) {
                this.ioc.error.on(error);
            }
            return null;
        }
    }

    /**
     * @description excecute action from object
     * @param {Object} opt 
     * @returns {Promise<any>}
     */
    async action(opt) {
        const object = await this.instance(opt);
        const action = object[opt.action];
        return (action instanceof Function) ? await action.apply(object, opt.params || []) : null;
    }

    /**
     * @description get dependency 
     * @param {Object} opt 
     * @returns {Promise<Object>} result
     */
    async dependency(opt) {
        try {
            return await this.factory.load(opt);
        } catch (error) {
            if (this.ioc?.error?.on instanceof Function) {
                this.ioc.error.on(error);
            }
            return null;
        }
    }

    /**
     * @description Dependency Injection Pattern (DI)
     * @param {Object} obj 
     * @param {Object} opt 
     * @returns {Promise<Object>} result
     */
    async setDI(obj, opt) {
        if (!opt?.dependency) {
            return obj;
        }
        for (let i in opt.dependency) {
            obj[i] = await this.ioc?.get(opt.dependency[i]);
        }
        return obj;
    }
}

module.exports = NativeAsync;