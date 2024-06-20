export = Ioc;
/**
 * @typedef {import('../types').THook} THook
 * @typedef {import('../types').TSubscription} TSubscription
 * @typedef {import('../types').TList} TList
 */
declare class Ioc {
    /**
     * @description class constructor
     * @param {TList} [cfg]
     */
    constructor(cfg?: TList);
    /**
     * @type {THook}
     */
    hook: THook;
    helper: any;
    /**
     * @description Perform a custom action based on the parameters
     * @param {Object} payload
     * @param {Date} payload.date
     * @param {TList} payload.data
     * @param {TSubscription} payload.target
     * @returns {*} result
     */
    run(payload: {
        date: Date;
        data: TList;
        target: TSubscription;
    }): any;
}
declare namespace Ioc {
    export { THook, TSubscription, TList };
}
type THook = import("../types").THook;
type TSubscription = import("../types").TSubscription;
type TList = import("../types").TList;
