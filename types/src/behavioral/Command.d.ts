export = Command;
declare class Command {
    constructor(opt: any);
    configure(opt?: boolean): void;
    factory: any;
    /**
     * @description run action with params on scope
     * @param {String} action
     * @param {Object} params
     * @param {Object} scope
     * @return {Object}
     */
    run(action: string, params: any, scope: any): any;
    /**
     * @description Get as array
     * @param {Object} payload value
     * @return {Array}
     */
    asList(payload: any): any[];
    /**
     * @description resolve scope
     * @param {Object} scope
     */
    getScope(scope: any): any;
}
