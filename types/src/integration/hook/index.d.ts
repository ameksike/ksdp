export = Hook;
declare class Hook {
    /**
     * @typedef {Object} EventOption
     * @property {String|String[]} subscriber - Strategy Key Type.
     * @property {String} event - Strategy Key Type.
     * @property {Object} [data] - [OPTIONAL].
     * @property {Object} [owner] - [OPTIONAL]
     * @property {Function} [onPreTrigger] - [OPTIONAL].
     * @property {Function} [onPosTrigger] - [OPTIONAL].
     * @property {Object} [scope] - [OPTIONAL].
     */
    /**
     * @typedef {'success' | 'failed'} EnumStatus
     * @typedef {'unsubscribe' | 'subscribe'} EnumAction
     */
    /**
     * @typedef {Object} Response
     * @property {EnumAction} action
     * @property {EnumStatus} status
     * @property {String} details=event
     */
    constructor(cfg: any);
    get notifier(): Strategy;
    get subscriber(): Strategy;
    get processor(): Strategy;
    get cmd(): Command;
    logger: any;
    configure(cfg: any): this;
    /**
     * @description Trigger hooks notification
     * @param {EventOption} payload
     * @return {{ [String]: Promise }}
     */
    trigger(payload: {
        /**
         * - Strategy Key Type.
         */
        subscriber: string | string[];
        /**
         * - Strategy Key Type.
         */
        event: string;
        /**
         * - [OPTIONAL].
         */
        data?: any;
        /**
         * - [OPTIONAL]
         */
        owner?: any;
        /**
         * - [OPTIONAL].
         */
        onPreTrigger?: Function;
        /**
         * - [OPTIONAL].
         */
        onPosTrigger?: Function;
        /**
         * - [OPTIONAL].
         */
        scope?: any;
    }): {
        [String]: Promise<any>;
    };
    /**
     * @description trigger hooks notification by subscriber
     * @param {EventOption} options
     * @param {String} [name=Memory]
     * @return {{ [String]: Object }}
     */
    run(payload: any, name?: string): {
        [String]: any;
    };
    /**
     * @description Add subscriber to event
     *
     * @param {Object} payload - input data
     * @param {String} payload.subscriber
     * @param {String} payload.target
     * @param {String} payload.value
     * @param {String} payload.event
     * @param {Number} payload.owner
     *
     * @returns {Response} result The output object with action=subscribe.
     */
    subscribe(payload: {
        subscriber: string;
        target: string;
        value: string;
        event: string;
        owner: number;
    }): {
        action: "unsubscribe" | "subscribe";
        status: "failed" | "success";
        /**
         * =event
         */
        details: string;
    };
    /**
     * @description Remove subscriber from event
     * @param {Object} payload - input data
     * @param {String} payload.subscriber
     * @param {String} payload.event
     * @param {Number} payload.owner
     * @returns {Response} result The output object with action=unsubscribe.
     */
    unsubscribe(payload: {
        subscriber: string;
        event: string;
        owner: number;
    }): {
        action: "unsubscribe" | "subscribe";
        status: "failed" | "success";
        /**
         * =event
         */
        details: string;
    };
    /**
     * @description Events list by subscriber
     * @param {Object} payload - input data
     * @param {String} payload.subscriber
     * @param {String} payload.event [OPTIONAL]
     * @param {Number} payload.subscriber
     * @return {Array} subscriptions
     */
    subscriptions(payload: {
        subscriber: string;
        event: string;
        subscriber: string;
    }): any[];
    /**
     * @description List of all avalible events
     * @param {*} payload
     * @return {Array<{name: String, description: String}>}
     */
    events(payload: any): Array<{
        name: string;
        description: string;
    }>;
    #private;
}
import Strategy = require("../../behavioral/Strategy");
import Command = require("../../behavioral/Command");
