export = Loader;
declare class Loader {
    /**
     * @type {Object}
     */
    cache: any;
    /**
     * @type {Array<String>}
     */
    files: Array<string>;
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
    load(module: string, option?: {
        auto?: boolean;
        fill?: boolean;
        force?: boolean;
        retry?: boolean;
        default?: any | null;
        error?: any | null;
    }): Promise<any | null>;
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
    loadSync(module: string, option?: {
        auto?: boolean;
        fill?: boolean;
        force?: boolean;
        default?: any | null;
        error?: any | null;
    }): any;
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
    retry(module: string, option?: {
        auto?: boolean;
        fill?: boolean;
        force?: boolean;
        retry?: boolean;
        default?: any | null;
        error?: any | null;
    }): Promise<any | null>;
    /**
     * @description search for an alternative module path
     * @param {String} module - module name or path
     * @returns {Promise<URL>} module
     */
    resolve(module: string): Promise<URL>;
    /**
     * @description find the main module file
     * @param {String} module - module name or path
     * @returns {Promise<String>} filepath
     */
    getFile(module: string): Promise<string>;
    /**
     * @description get URL from file path
     * @param {String} file
     * @returns {URL} URL
     */
    getURL(file: string): URL;
    /**
     * @description check if a file exists
     * @param {String} file
     * @returns {Promise<Boolean>} exists
     */
    exists(file: string): Promise<boolean>;
    /**
     * @description get the cache index key
     * @param {Object|String} module
     * @param {Object} option
     * @returns {String} key
     */
    getKey(module: any | string, option: any): string;
}
