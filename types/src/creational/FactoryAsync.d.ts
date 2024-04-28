export = FactoryAsync;
/**
 * @typedef {Object} BuildOption
 * @property {*} cls - taget Class.
 * @property {Array} params - params for taget constructor.
 */
declare class FactoryAsync {
    /**
     * @param {Object} [payload]
     * @param {Object} [payload.logger]
     * @param {Object} [payload.loader]
     */
    constructor(payload?: {
        logger?: any;
        loader?: any;
    });
    /**
     * @type {Object}
     */
    loader: any;
    /**
     * @type {Object}
     */
    logger: any;
    /**
     * @description Get as array
     * @param {Object} payload The input data.
     * @return {Array}
     */
    asList(payload: any): any[];
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
     * @returns {Promise<Object>} result - The output object.
     * @property {Object} [result.data] - data content.
     * @property {String} [result.file] - file path.
     */
    require(file: string | Array<string>, option?: any): Promise<any>;
    /**
     * @description Get Instance
     * @param {BuildOption|*} payload taget Class
     * @return {Object} Instance
     * @example new (Function.prototype.bind.apply(Cls, Prm))
     */
    build(payload?: BuildOption | any): any;
    /**
     * @description Get Instance
     * @param {Object} [payload] The input data.
     * @param {String} [payload.name] taget Name
     * @param {String} [payload.file] taget File Path
     * @param {Object} [payload.params] params for taget constructor
     * @param {*} [payload.cls] class or object
     * @return {Promise<Object>} Instance
     */
    get(payload?: {
        name?: string;
        file?: string;
        params?: any;
        cls?: any;
    }): Promise<any>;
    /**
     * @description internal log handler
     */
    log(...args: any[]): this;
}
declare namespace FactoryAsync {
    export { BuildOption };
}
type BuildOption = {
    /**
     * - taget Class.
     */
    cls: any;
    /**
     * - params for taget constructor.
     */
    params: any[];
};
