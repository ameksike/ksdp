export = Command;
declare class Command {
    constructor(opt: any);
    configure(opt?: boolean): void;
    factory: any;
    /**
     * @description run action with params on scope
     * @param {String} action
     * @param {Any} params
     * @param {Object} scope
     * @return {Any}
     */
    run(action: string, params: Any, scope: any): Any;
    /**
     * @description Get as array
     * @param {Any} payload value
     * @return {Array}
     */
    asList(payload: Any): any[];
    /**
     * @description resolve scope
     * @param {Any} scope
     */
    getScope(scope: Any): any;
}
