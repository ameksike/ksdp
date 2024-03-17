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
     * @param {Object} [option] - configuration options
     * @param {Boolean} [option.auto] - export only the default 
     * @param {Boolean} [option.fill] - include the default property as the original definition
     * @param {Boolean} [option.force] - force to clean the cache before load the module
     * @param {Boolean} [option.retry] - retry loading module on error
     * @param {Object|null} [option.default] - default value to return if there is an error
     * @param {Object|null} [option.error] - error description if there is an error 
     * @returns {Promise<Object|null>} module
     */
    async load(module, option = {}) {
        option = option || {};
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
            if (option.retry || option.retry === undefined) {
                return this.retry(module, option);
            } else {
                return option.default || null;
            }
        }
    }

    /**
     * @description load Node.Js CJS module
     * @param {String} module - module name or path
     * @param {Object} [option] - configuration options
     * @param {Boolean} [option.auto] - export only the default 
     * @param {Boolean} [option.fill] - include the default property as the original definition
     * @param {Boolean} [option.force] - force to clean the cache before load the module
     * @param {Object|null} [option.default] - default value to return if there is an error
     * @param {Object|null} [option.error] - error description if there is an error 
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
                this.cache[key] = require(module);
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
     * @param {Object} [option] - configuration options
     * @param {Boolean} [option.auto] - export only the default 
     * @param {Boolean} [option.fill] - include the default property as the original definition
     * @param {Boolean} [option.force] - force to clean the cache before load the module
     * @param {Boolean} [option.retry] - retry loading module on error
     * @param {Object|null} [option.default] - default value to return if there is an error
     * @param {Object|null} [option.error] - error description if there is an error 
     * @returns {Promise<Object|null>} module
     */
    async retry(module, option) {
        let mod = this.loadSync(module, option);
        if (mod) {
            return mod;
        }
        mod = await this.resolve(module);
        if (mod) {
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