export = StrategyAsync;
/**
 * @typedef {Object} StrategyOption
 * @property {String} [type] - Strategy Key Type.
 * @property {String} [path] - Strategy Key Path.
 * @property {String} [name] - Strategy Key Name.
 * @property {Array<any>} [params] - Single param for Strategy constructor.
 * @property {Boolean|Number} [safe] - Single param for Strategy constructor.
 * @property {*} [target] - Class or Object
 */
declare class StrategyAsync {
    /**
     * @param {*} payload
     */
    constructor(payload: any);
    /** @type {any} **/
    ctrl: any;
    /** @type {Array<any>} **/
    params: Array<any>;
    path: string;
    default: string;
    factory: Factory;
    /**
     * @description Get strategy
     * @param {Object} [payload] The input data.
     * @param {String} [payload.name='Default'] Strategy Key Name
     * @param {String} [payload.default='Default'] Strategy Key Name
     * @param {Array<any>} [payload.params]
     * @param {Console} [payload.logger]
     * @param {String} [payload.path]
     * @return {StrategyAsync} self
     */
    configure(payload?: {
        name?: string;
        default?: string;
        params?: Array<any>;
        logger?: Console;
        path?: string;
    }): StrategyAsync;
    logger: Console;
    /**
     * @description internal log handler
     */
    log(...args: any[]): this;
    /**
     * @description Get strategy Instance
     * @param {(String|String[]|StrategyOption|Array<StrategyOption>)} payload
     * @param {(String|String[]|StrategyOption|Array<StrategyOption>)|null} [alt]
     * @return {Promise<Object|Array<Object>|null>} Strategy Instance
     */
    get(payload?: (string | string[] | StrategyOption | Array<StrategyOption>), alt?: (string | string[] | StrategyOption | Array<StrategyOption>) | null): Promise<any | Array<any> | null>;
    /**
     * @description Set strategy
     * @param {StrategyOption|Array<StrategyOption>} payload
     * @param {String} [alias='']
     * @return {Promise<Object|Array<Object>|null>} Strategy Instance
     */
    set(payload?: StrategyOption | Array<StrategyOption>, alias?: string): Promise<any | Array<any> | null>;
    #private;
}
declare namespace StrategyAsync {
    export { StrategyOption };
}
import Factory = require("../creational/FactoryAsync");
type StrategyOption = {
    /**
     * - Strategy Key Type.
     */
    type?: string;
    /**
     * - Strategy Key Path.
     */
    path?: string;
    /**
     * - Strategy Key Name.
     */
    name?: string;
    /**
     * - Single param for Strategy constructor.
     */
    params?: Array<any>;
    /**
     * - Single param for Strategy constructor.
     */
    safe?: boolean | number;
    /**
     * - Class or Object
     */
    target?: any;
};
