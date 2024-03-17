/**
 * @typedef {import('../types').TLoaderOption} TLoaderOption
 */
const _path = require('path');
const _fs = require('fs');
class Loader {

    /**
     * @type {Object}
     */
    cache;

    /**
     * @type {Array<String>}
     */
    files;

    constructor() {
        this.cache = {};
        this.files = ['index.js', 'index.mjs', 'index.cjs'];
    }

    /**
     * @description load Node.Js modules (CJS, EMS)
     * @param {String} module - module name or path
     * @param {TLoaderOption} [option] - configuration options
     * @returns {Promise<Object|null>} module
     */
    async load(module, option = {}) {
        option = option || {};
        option.retry = option.retry === undefined ? 1 : option.retry;
        try {
            if (option.force) {
                delete this.cache[module];
            }
            let key = this.getKey(module, option);
            if (!this.cache[key]) {
                let tmp = await import(module);
                if (tmp.default?.name && (option.fill || option.fill === undefined)) {
                    let def = tmp.default.name;
                    tmp = { [def]: tmp.default, ...tmp };
                }
                this.cache[key] = tmp;
            }
            return option.auto ? this.cache[key].default : this.cache[key];
        }
        catch (error) {
            option.error = option.error || error;
            if (option.retry > 0) {
                option.retry = 0;
                return this.retry(module, option);
            } else {
                return option.default || null;
            }
        }
    }

    /**
     * @description load Node.Js CJS module
     * @param {String} module - module name or path
     * @param {TLoaderOption} [option] - configuration options
     * @returns {Object} module
     */
    loadSync(module, option = {}) {
        option = option || {};
        try {
            if (typeof require !== 'function') {
                throw new Error('EMS modules are not supported: ' + module)
            }
            let key = this.getKey(module, option);
            if (option.force) {
                delete this.cache[key];
                delete require.cache[require.resolve(module)];
            }
            if (!this.cache[key]) {
                let tmp = require(module);
                if (Object.keys(tmp).length === 0 && option.strict) {
                    throw new Error('Invalid empty module');
                }
                this.cache[key] = tmp;
            }
            return this.cache[key];
        }
        catch (error) {
            option.error = error;
            return option.default || null;
        }
    }

    /**
     * @description retry loading the module looking for an alternative path
     * @param {String} module - module name or path
     * @param {TLoaderOption} [option] - configuration options
     * @returns {Promise<Object|null>} module
     */
    async retry(module, option) {
		option = option || {};
        option.strict = true;
        let mod = this.loadSync(module, option);
        if (mod) {
            option.type = 'cjs';
            return mod;
        }
        mod = await this.resolve(module);
        if (mod) {
            option.type = 'mjs';
            return this.load(mod, option);
        }
    }

    /**
     * @description search for an alternative module path
     * @param {String} module - module name or path
     * @returns {Promise<URL>} module
     */
    async resolve(module) {
        try {
            let stat = await _fs.promises.stat(module);
            let file = stat.isDirectory() ? await this.getFile(module) : module;
            return file ? this.getURL(file) : null;
        }
        catch (error) {
            return error
        }
    }

    /**
     * @description find the main module file
     * @param {String} module - module name or path
     * @returns {Promise<String>} filepath
     */
    async getFile(module) {
        let path = _path.resolve(module);
        for (let file of this.files) {
            let tmp = _path.join(path, file);
            if (await this.exists(tmp)) {
                return tmp;
            }
        }
        return null;
    }

    /**
     * @description get URL from file path
     * @param {String} file 
     * @returns {URL} URL
     */
    getURL(file) {
        let protocol = /http(s)*:\/\//.test(file) ? file : 'file:///';
        return new URL(protocol + file);
    }

    /**
     * @description check if a file exists
     * @param {String} file 
     * @returns {Promise<Boolean>} exists
     */
    async exists(file) {
        try {
            await _fs.promises.access(file, _fs.constants.R_OK | _fs.constants.W_OK);
            return true;
        }
        catch (_) {
            return false;
        }
    }

    /**
     * @description get the cache index key 
     * @param {Object|String} module 
     * @param {Object} option 
     * @returns {String} key
     */
    getKey(module, option) {
        if (option.key) {
            return option.key;
        }
        if (typeof module === "string") {
            return _path.resolve(module);
        } else {
            return module?.pathname ? _path.resolve(module.pathname) : null;
        }
    }
}
module.exports = Loader;