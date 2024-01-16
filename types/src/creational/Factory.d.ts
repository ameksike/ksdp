export = Factory;
declare class Factory {
    constructor(payload: any);
    logger: any;
    /**
     * @description Get as array
     * @param {Object} payload The input data.
     * @return {Array}
     */
    asList(payload: any): any[];
    /**
     * @description Load Class
     * @param {Object} payload The input data.
     * @param {String} payload.name taget name
     * @param {String} payload.file taget file path
     * @param {String} payload.search
     * @return {Object} Class
     */
    load(payload: {
        name: string;
        file: string;
        search: string;
    }): any;
    /**
     * @description require a file or list of them
     * @param {String|Array<String>} file
     * @returns {Object} result - The output object.
     * @property {Object} result.data - data content.
     * @property {String} result.file - file path.
     */
    require(file: string | Array<string>): any;
    /**
     *
     * @typedef {Object} BuildOption
     * @property {Function} cls - taget Class.
     * @property {Array} params - params for taget constructor.
     *
     * @description Get Instance
     * @param {BuildOption|Function} payload taget Class
     * @return {Object} Instance
     * @example new (Function.prototype.bind.apply(Cls, Prm))
     */
    build(payload?: Function | {
        /**
         * - taget Class.
         */
        cls: Function;
        /**
         * - params for taget constructor.
         */
        params: any[];
    }): any;
    /**
     * @description Get Instance
     * @param {Object} payload The input data.
     * @param {String} payload.name taget Name
     * @param {String} payload.file taget File Path
     * @param {Object} payload.params params for taget constructor
     * @return {Object} Instance
     */
    get(payload?: {
        name: string;
        file: string;
        params: any;
    }): any;
    /**
     * @description internal log handler
     */
    log(...args: any[]): this;
}
