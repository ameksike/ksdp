export = Strategy;
/**
 * @typedef {Object} StrategyOption
 * @property {String} type - Strategy Key Type.
 * @property {String} path - Strategy Key Path.
 * @property {String} name - Strategy Key Name.
 * @property {Array} params - Single param for Strategy constructor.
 */
declare class Strategy {
    constructor(payload: any);
    ctrl: {};
    params: any[];
    path: string;
    default: string;
    factory: Factory;
    /**
     * @description Get strategy
     * @param {Object} payload The input data.
     * @param {String} payload.type Strategy Key Path
     * @param {String} [payload.name='Default'] Strategy Key Name
     * @param {Object} payload.params
     * @return {Strategy} This
     */
    configure(payload?: {
        type: string;
        name?: string;
        params: any;
    }): Strategy;
    logger: any;
    /**
     * @description internal log handler
     */
    log(...args: any[]): this;
    /**
     * @description Get strategy Instance
     * @param {(StrategyOption|Array<StrategyOption>)} payload
     * @return {Object|Array<Object>} Strategy Instance
     */
    get(payload?: (StrategyOption | Array<StrategyOption>)): any | Array<any>;
    /**
     * @description Set strategy
     * @param {StrategyOption|Array<StrategyOption>} payload
     * @param {String} [alias=""]
     * @return {Object|Array<Object>} Strategy Instance
     */
    set(payload?: StrategyOption | Array<StrategyOption>, alias?: string): any | Array<any>;
}
declare namespace Strategy {
    export { StrategyOption };
}
import Factory = require("../creational/Factory");
type StrategyOption = {
    /**
     * - Strategy Key Type.
     */
    type: string;
    /**
     * - Strategy Key Path.
     */
    path: string;
    /**
     * - Strategy Key Name.
     */
    name: string;
    /**
     * - Single param for Strategy constructor.
     */
    params: any[];
};
