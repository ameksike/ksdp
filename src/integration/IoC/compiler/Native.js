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
const Factory = require('../../../creational/Factory');
const Inherit = require('../../../inherit');
const _path = require('path');

/**
 * @typedef {import('../../../types').TOptionIoC} TOptionIoC
 * @typedef {import('../IoC')} TIoC
 * @typedef {import('../../../types').TList} TList
 */
class Native {

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
     * @type {TIoC|null}
     */
    #ioc;

    /**
     * @returns {TIoC|null}
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
     * @param {any} opt 
     * @returns result
     */
    run(opt) {
        let path, out = null;
        let isPack = (/** @type {{moduleType:String}} */ itm) => itm?.moduleType === "lib" || itm?.moduleType === "package";
        let dirPack = (/** @type {String} */ name) => require?.resolve && _path.dirname(require.resolve(name));
        switch (opt.type) {
            case 'module':
                opt.file = opt.file || (this.ioc?.opt?.path && _path.join(this.ioc.opt.path, opt.name));
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
                let mod = opt.file || opt.name;
                if (opt.file) {
                    opt.file = this.ioc?.opt?.path ? opt.file.replace('./', this.ioc.opt.path) : opt.file;
                    mod = _path.resolve(opt.file);
                }
                /** @type {any} */
                out = require(mod);
                out = this.inherit.namespace(out, opt.namespace || opt.name);
                out = this.factory.build({ cls: out, ...opt });
                out = (out && this.setDI(out, opt)) || out;
                out && !opt?.file && (out._ = { type: 'lib', path: dirPack(opt.name) });
                out?.init instanceof Function && out.init();
                break;

            case 'alias':
                out = this.ioc?.get(opt.source);
                break;

            default:
                path = isPack(opt) ? dirPack(opt.module) : this.ioc?.opt?.path;
                path = !isPack(opt) && opt.module ? _path.join(path || "", opt.module) : path;
                path = opt.path ? _path.join(path || "", opt.path) : path;
                opt.file = opt.file || [
                    _path.join(path || "", opt.name + '.js'),
                    _path.join(path || "", opt.name, 'index.js'),
                    _path.join(path || "", opt.name, opt.name + '.js'),
                ];
                /** @type {any} */
                let _this = this;
                out = _this[opt.type] ? _this[opt.type](opt) : null;
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
            if (this.ioc?.error?.on instanceof Function) {
                this.ioc.error.on(error);
            }
            return null;
        }
    }

    /**
     * @description Factory Pattern
     * @param {Object} opt 
     * @param {String} [opt.name] 
     * @param {String} [opt.file] 
     * @param {any} [opt.params] 
     * @param {any} [opt.options]
     * @param {any} [opt.dependency] 
     * @returns {any} result
     */
    instance(opt) {
        try {
            let obj = this.factory.get({
                name: opt.name,
                file: opt.file,
                params: opt.options || opt.params
            });
            if (!obj) return null;
            /** @type {any} */
            let _obj = obj && this.setDI(obj, opt);
            if (_obj.init) {
                _obj.init();
            }
            return _obj;
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
     * @param {String} opt.action 
     * @param {any} opt.params 
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
     * @param {any} obj 
     * @param {Object} [opt] 
     * @param {TList} [opt.dependency] 
     * @returns {any} result
     */
    setDI(obj, opt) {
        if (!opt?.dependency) {
            return obj;
        }
        for (let i in opt.dependency) {
            obj[i] = this.ioc?.get(opt.dependency[i]);
        }
        return obj;
    }
}

module.exports = Native;