export = Strategy;
declare class Strategy {
    constructor(payload: any);
    ctrl: {};
    params: any[];
    path: string;
    default: string;
    factory: Factory;
    /**
     * @description Get strategy
     * @param {String} type Strategy Key Path
     * @param {String} name Strategy Key Name
     * @param {Any} params
     * @return {Object} This
     */
    configure(payload?: {}): any;
    logger: any;
    /**
     * @description internal log handler
     */
    log(...args: any[]): this;
    /**
     * @description Get strategy Instance
     * @param {Object|Array} payload
     * @param {String} payload.type Strategy Key Path
     * @param {String} payload.path Strategy Key Path
     * @param {String} payload.name Strategy Key Name
     * @param {Array} payload.params Single param for Strategy constructor
     * @return {Object|Array} Strategy Instance
     */
    get(payload?: any | any[]): any | any[];
    /**
     * @description Set strategy
     * @param {Object|Array} payload
     * @param {String} alias [OPTIONAL]
     * @return {Object|Array} Strategy Instance
     */
    set(payload?: any | any[], alias?: string): any | any[];
}
import Factory = require("../creational/Factory");
