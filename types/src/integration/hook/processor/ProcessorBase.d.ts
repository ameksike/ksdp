export = ProcessorBase;
/**
 * @typedef {import('../types').TList} TList
 */
declare class ProcessorBase {
    /**
     * @description Evaluate an expression
     * @param {String} expression
     * @param {TList} [data=null]
     * @param {Object} [metadata=null]
     * @param {Error} [metadata.error]
     * @param {String} [metadata.expression]
     * @param {TList} [metadata.data]
     * @returns {Number|String|Boolean} result
     */
    run(expression: string, data?: TList, metadata?: {
        error?: Error;
        expression?: string;
        data?: TList;
    }): number | string | boolean;
}
declare namespace ProcessorBase {
    export { TList };
}
type TList = import("../types").TList;
