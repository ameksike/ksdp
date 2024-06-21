export = Loader;
declare class Loader {
    /**
     * @param {*} payload
     */
    constructor(payload?: any);
    /**
     * @type {any}
     */
    cache: any;
    /**
     * @type {Array<String>}
     */
    files: Array<string>;
    logger: any;
    /**
     * @description load Node.Js modules (CJS, EMS)
     * @param {String|URL} mod - module name or path
     * @param {TLoaderOption} [option] - configuration options
     * @returns {Promise<Object|null>} module
     */
    load(mod: string | URL, option?: TLoaderOption): Promise<any | null>;
    /**
     * @description load Node.Js CJS module
     * @param {String} module - module name or path
     * @param {TLoaderOption} [option] - configuration options
     * @returns {Object|null} module
     */
    loadSync(module: string, option?: TLoaderOption): any | null;
    /**
     * @param {Object} tmp
     * @param {Object} tmp.prototype
     * @param {Object} option
     * @param {Object} [option.strict]
     * @returns {Boolean}
     */
    isValid(tmp: {
        prototype: any;
    }, option: {
        strict?: any;
    }): boolean;
    /**
     * @description retry loading the module looking for an alternative path
     * @param {String|URL} module - module name or path
     * @param {TLoaderOption} [option] - configuration options
     * @returns {Promise<Object|null>} module
     */
    retry(module: string | URL, option?: TLoaderOption): Promise<any | null>;
    /**
     * @description search for an alternative module path
     * @param {String} module - module name or path
     * @returns {Promise<URL|null>} module
     */
    resolve(module: string): Promise<URL | null>;
    /**
     * @description find the main module file
     * @param {String} module - module name or path
     * @returns {Promise<String|null>} filepath
     */
    getFile(module: string): Promise<string | null>;
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
     * @param {{pathname: String}|String} module
     * @param {any} option
     * @returns {String|null} key
     */
    getKey(module: {
        pathname: string;
    } | string, option: any): string | null;
}
declare namespace Loader {
    export { TLoaderOption };
}
type TLoaderOption = import("../types").TLoaderOption;
