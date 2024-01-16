export = Factory;
declare class Factory {
    constructor(payload: any);
    logger: any;
    /**
     * @description Get as array
     * @param {Any} payload value
     * @return {Array}
     */
    asList(payload: Any): any[];
    /**
     * @description Load Class
     * @param {String} payload.name taget name
     * @param {String} payload.file taget file path
     * @param {String} payload.search
     * @return {Any} Class
     */
    load(payload: any): Any;
    /**
     * @description require a file or list of them
     * @param {String|Array} file
     * @returns {data: Object, file: String}
     */
    require(file: string | any[]): data;
    /**
     * @description Get Instance
     * @param {Object|Function} payload taget Class
     * @param {Class|Function} payload.cls taget Class
     * @param {Array} payload.params params for taget constructor
     * @return {Object} Instance
     * @example new (Function.prototype.bind.apply(Cls, Prm))
     */
    build(payload?: any | Function): any;
    /**
     * @description Get Instance
     * @param {String} payload.name taget Name
     * @param {String} payload.file taget File Path
     * @param {Any} payload.params params for taget constructor
     * @return {Object} Instance
     */
    get(payload?: any): any;
    /**
     * @description internal log handler
     */
    log(...args: any[]): this;
}
