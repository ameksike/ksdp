/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		09/11/2019
 * @copyright  	Copyright (c) 2019-2050
 * @description Native Compiler 
 * @dependency  Factory
 * @license    	GPL
 * @version    	1.0
 **/
const Factory = require('../../../creational/Factory');
const inherit = require('../../../inherit');
const _path = require('path');

/**
 * @typedef {import('../../types').TOptionIoC} TOptionIoC
 * @typedef {import('../IoC')} TIoC
 */
class IoC {

    /**
     * @type {TIoC}
     */
    #ioc;

    /**
     * @param {TIoC|null} [ioc] 
     */
    constructor(ioc = null) {
        this.#ioc = ioc;
        this.inherit = inherit;
        this.factory = new Factory();
    }

    /**
     * @description Service Locator Pattern (SL)
     * @param {Object} opt 
     * @returns result
     */
    run(opt) {
        let path, out = null;
        let isPack = (itm) => itm?.moduleType === "lib" || itm?.moduleType === "package";
        let dirPack = (name) => require?.resolve && _path.dirname(require.resolve(name));
        switch (opt.type) {
            case 'module':
                opt.file = opt.file || _path.join(this.#ioc?.opt?.path, opt.name);
                out = this.instance(opt);
                out && (out._ = { type: 'module', path: _path.resolve(opt.file) });
                break;

            case 'raw':
                out = opt.options || opt.data;
                break;

            case 'package':
                out = require(opt.name);
                out = this.inherit.namespace(out, opt.namespace || opt.name);
                out = this.setDI(out, opt);
                break;

            case 'lib':
                out = require(opt.name);
                out = this.inherit.namespace(out, opt.namespace || opt.name);
                out = this.factory.build({ cls: out, ...opt });
                out = this.setDI(out, opt);
                out && (out._ = { type: 'lib', path: dirPack(opt.name) });
                out?.init instanceof Function && out.init();
                break;

            case 'alias':
                out = this.get(opt.source);
                break;

            default:
                path = isPack(opt) ? dirPack(opt.module) : this.#ioc?.opt?.path;
                path = !isPack(opt) && opt.module ? _path.join(path, opt.module) : path;
                path = opt.path ? _path.join(path, opt.path) : path;

                opt.file = opt.file || [
                    _path.join(path, opt.name + '.js'),
                    _path.join(path, opt.name, 'index.js'),
                    _path.join(path, opt.name, opt.name + '.js'),
                ];
                out = this[opt.type] ? this[opt.type](opt) : null;
                break;
        }
        return out;
    }

    /**
     * @description Factory Pattern load Type 
     * @param {Object} opt 
     * @returns {*} result
     */
    type(opt) {
        try {
            return this.factory.load(opt);
        } catch (error) {
            if (this.#ioc?.error?.on instanceof Function) {
                this.#ioc.error.on(error);
            }
            return null;
        }
    }

    /**
     * @description Factory Pattern
     * @param {Object} opt 
     * @returns {Object} result
     */
    instance(opt) {
        try {
            let obj = this.factory.get({
                name: opt.name,
                file: opt.file,
                params: opt.options || opt.params
            });
            if (!obj) return null;
            obj = this.setDI(obj, opt);
            if (obj.init) {
                obj.init();
            }
            return obj;
        } catch (error) {
            if (this.#ioc?.error?.on instanceof Function) {
                this.#ioc.error.on(error);
            }
            return null;
        }
    }

    /**
     * @description excecute action from object
     * @param {Object} opt 
     * @returns {*}
     */
    action(opt) {
        const object = this.instance(opt);
        const action = object[opt.action];
        return (action instanceof Function) ? action.apply(object, opt.params || []) : null;
    }

    /**
     * @description get dependency 
     * @param {Object} opt 
     * @returns {Object} result
     */
    dependency(opt) {
        return this.factory.load(opt);
    }

    /**
     * @description Dependency Injection Pattern (DI)
     * @param {Object} obj 
     * @param {Object} opt 
     * @returns {Object} result
     */
    setDI(obj, opt) {
        if (!opt?.dependency) {
            return obj;
        }
        for (let i in opt.dependency) {
            obj[i] = this.#ioc?.get(opt.dependency[i]);
        }
        return obj;
    }
}

module.exports = IoC;