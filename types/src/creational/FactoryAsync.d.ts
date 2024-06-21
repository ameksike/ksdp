export = FactoryAsync;
/**
 * @typedef {Object} BuildOption
 * @property {*} cls - taget Class.
 * @property {Array<any>} params - params for taget constructor.
 */
declare class FactoryAsync {
    /**
     * @param {Object} [payload]
     * @param {Console} [payload.logger]
     * @param {Loader} [payload.loader]
     */
    constructor(payload?: {
        logger?: Console;
        loader?: Loader;
    });
    /**
     * @type {Loader}
     */
    loader: Loader;
    /**
     * @type {Console}
     */
    logger: Console;
    /**
     * @description Get as array
     * @param {Object} payload The input data.
     * @return {Array<any>}
     */
    asList(payload: any): Array<any>;
    /**
     * @description Load Class
     * @param {Object} [payload] The input data.
     * @param {String} [payload.name] taget name
     * @param {String} [payload.namespace] taget name
     * @param {String} [payload.file] taget file path
     * @param {String} [payload.mode] factory mode
     * @param {String} [payload.search]
     * @return {Promise<any>} Class
     */
    load(payload?: {
        name?: string;
        namespace?: string;
        file?: string;
        mode?: string;
        search?: string;
    }): Promise<any>;
    /**
     * @description require a file or list of them
     * @param {String|Array<String>} file
     * @param {Object} [option]
     * @returns {Promise<{data:Object|null; file: String}|null>} result - The output object.
     */
    require(file: string | Array<string>, option?: any): Promise<{
        data: any | null;
        file: string;
    } | null>;
    /**
     * @description Get Instance
     * @param {BuildOption|*} payload taget Class
     * @return {Object|null} Instance
     * @example new (Function.prototype.bind.apply(Cls, Prm))
     */
    build(payload?: BuildOption | any): any | null;
    /**
     * @description Get Instance
     * @param {Object} [payload] The input data.
     * @param {String} [payload.name] taget Name
     * @param {String} [payload.file] taget File Path
     * @param {Object} [payload.params] params for taget constructor
     * @param {*} [payload.cls] class or object
     * @return {Promise<Object|null>} Instance
     */
    get(payload?: {
        name?: string;
        file?: string;
        params?: any;
        cls?: any;
    }): Promise<any | null>;
    /**
     * @description internal log handler
     */
    log(...args: any[]): this;
}
declare namespace FactoryAsync {
    export { BuildOption };
}
import Loader = require("../common/loader");
type BuildOption = {
    /**
     * - taget Class.
     */
    cls: any;
    /**
     * - params for taget constructor.
     */
    params: Array<any>;
};
