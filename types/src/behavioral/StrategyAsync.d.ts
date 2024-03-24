export = StrategyAsync;
/**
 * @typedef {Object} StrategyOption
 * @property {String} [type] - Strategy Key Type.
 * @property {String} [path] - Strategy Key Path.
 * @property {String} [name] - Strategy Key Name.
 * @property {Array} [params] - Single param for Strategy constructor.
 * @property {Boolean|Number} [safe] - Single param for Strategy constructor.
 * @property {*} [target] - Class or Object
 */
declare class StrategyAsync {
    constructor(payload: any);
    ctrl: {};
    params: any[];
    path: string;
    default: string;
    factory: Factory;
    /**
     * @description Get strategy
     * @param {Object} [payload] The input data.
     * @param {String} [payload.name='Default'] Strategy Key Name
     * @param {String} [payload.default='Default'] Strategy Key Name
     * @param {Object} [payload.params]
     * @param {Console} [payload.logger]
     * @param {String} [payload.path]
     * @return {StrategyAsync} self
     */
    configure(payload?: {
        name?: string;
        default?: string;
        params?: any;
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
     * @return {Promise<Object|Array<Object>>} Strategy Instance
     */
    get(payload?: (string | string[] | StrategyOption | Array<StrategyOption>), alt?: (string | string[] | StrategyOption | Array<StrategyOption>) | null): Promise<any | Array<any>>;
    /**
     * @description Set strategy
     * @param {StrategyOption|Array<StrategyOption>} payload
     * @param {String} [alias='']
     * @return {Promise<Object|Array<Object>>} Strategy Instance
     */
    set(payload?: StrategyOption | Array<StrategyOption>, alias?: string): Promise<any | Array<any>>;
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
    params?: any[];
    /**
     * - Single param for Strategy constructor.
     */
    safe?: boolean | number;
    /**
     * - Class or Object
     */
    target?: any;
};
