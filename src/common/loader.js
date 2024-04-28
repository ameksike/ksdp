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

    constructor(payload) {
        this.cache = {};
        this.files = ['index.js', 'index.mjs', 'index.cjs'];
        this.logger = payload?.logger;
    }

    /**
     * @description load Node.Js modules (CJS, EMS)
     * @param {String} mod - module name or path
     * @param {TLoaderOption} [option] - configuration options
     * @returns {Promise<Object|null>} module
     */
    async load(mod, option = {}) {
        option = option || {};
        option.retry = option.retry === undefined ? 1 : option.retry;
        try {
            option.force = option.force ?? option.mode === 'transient';
            if (option.force) {
                delete this.cache[mod];
            }
            let key = this.getKey(mod, option);
            if (!this.cache[key]) {
                let tmp = await import(mod);
                if (tmp.default?.name && (option.fill || option.fill === undefined)) {
                    let def = tmp.default.name;
                    tmp = { [def]: tmp.default, ...tmp, type: 'mjs' };
                }
                if (!Object.isExtensible(tmp)) {
                    tmp = { type: 'mjs', ...tmp };
                } else {
                    tmp.type = tmp.type || 'mjs';
                }
                this.cache[key] = tmp;
            }
            return option.auto ? this.cache[key].default : this.cache[key];
        }
        catch (error) {
            if (option.retry > 0) {
                option.retry = 0;
                return this.retry(mod, option);
            } else {
                this.logger?.warn instanceof Function && this.logger.warn({ src: 'KsDp:Loader:load', error });
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
                if (!this.isValid(tmp, option)) {
                    throw new Error('Invalid empty module');
                }
                this.cache[key] = tmp;
            }
            return this.cache[key];
        }
        catch (error) {
            this.logger?.warn instanceof Function && this.logger.warn({ src: 'KsDp:Loader:loadSync', error });
            option.error = error;
            return option.default || null;
        }
    }

    isValid(tmp, option) {
        try {
            if (!tmp) {
                return false;
            }
            if (tmp?.prototype && !Object.keys(Object.getOwnPropertyDescriptors(tmp?.prototype)) && option?.strict) {
                return false;
            }
            return true;
        }
        catch (error) {
            return false;
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
            this.logger?.warn instanceof Function && this.logger.warn({ src: 'KsDp:Loader:resolve', error });
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
        let protocol = /http(s)*:\/\//.test(file) ? file : 'file://';
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