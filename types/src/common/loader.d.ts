export = Loader;
declare class Loader {
    constructor(payload: any);
    /**
     * @type {Object}
     */
    cache: any;
    /**
     * @type {Array<String>}
     */
    files: Array<string>;
    logger: any;
    /**
     * @description load Node.Js modules (CJS, EMS)
     * @param {String} mod - module name or path
     * @param {TLoaderOption} [option] - configuration options
     * @returns {Promise<Object|null>} module
     */
    load(mod: string, option?: TLoaderOption): Promise<any | null>;
    /**
     * @description load Node.Js CJS module
     * @param {String} module - module name or path
     * @param {TLoaderOption} [option] - configuration options
     * @returns {Object} module
     */
    loadSync(module: string, option?: TLoaderOption): any;
    isValid(tmp: any, option: any): boolean;
    /**
     * @description retry loading the module looking for an alternative path
     * @param {String} module - module name or path
     * @param {TLoaderOption} [option] - configuration options
     * @returns {Promise<Object|null>} module
     */
    retry(module: string, option?: TLoaderOption): Promise<any | null>;
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
declare namespace Loader {
    export { TLoaderOption };
}
type TLoaderOption = import('../types').TLoaderOption;
