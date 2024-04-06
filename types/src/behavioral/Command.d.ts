export = Command;
/**
 * @typedef {({[name:String]:Object} | Array)} List
 **/
declare class Command {
    constructor(opt: any);
    /**
     * @description configure the Command lib
     * @param {Object} [opt]
     * @param {Function} [opt.factory]
     */
    configure(opt?: {
        factory?: Function;
    }): void;
    factory: Function;
    /**
     * @description run action with params on scope
     * @param {String|Function} action
     * @param {List} params
     * @param {Object} scope
     * @return {Object} result
     */
    run(action: string | Function, params: List, scope: any): any;
    /**
     * @description Get as array
     * @param {List} payload value
     * @return {Array} list
     */
    asList(payload: List): any[];
    /**
     * @description resolve scope
     * @param {Object} scope
     */
    getScope(scope: any): any;
}
declare namespace Command {
    export { List };
}
type List = ({
    [name: string]: any;
} | any[]);
