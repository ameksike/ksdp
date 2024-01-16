export = Hook;
declare class Hook {
    /**
     * @typedef {Object} Subscription
     * @property {Number} [id]
     * @property {String} event
     * @property {*} [value]
     * @property {String} [data]
     * @property {String} [notifier]
     * @property {String} [group]
     * @property {Number} [owner]
     * @property {Number} [status]
     * @property {String} [processor]
     * @property {String} [expression]
     * @property {Function} [onPreTrigger] - [OPTIONAL].
     * @property {Function} [onPosTrigger] - [OPTIONAL].
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
     * @param {Subscription} payload
     * @return {{ [subscriber: String]: Promise }}
     */
    trigger(payload: {
        id?: number;
        event: string;
        value?: any;
        data?: string;
        notifier?: string;
        group?: string;
        owner?: number;
        status?: number;
        processor?: string;
        expression?: string;
        /**
         * - [OPTIONAL].
         */
        onPreTrigger?: Function;
        /**
         * - [OPTIONAL].
         */
        onPosTrigger?: Function;
    }): {
        [subscriber: string]: Promise<any>;
    };
    /**
     * @description trigger hooks notification by subscriber
     * @param {EventOption} options
     * @param {String} [name=Memory]
     * @return {{ [subscriber: String]: Object }}
     */
    run(payload: any, name?: string): {
        [subscriber: string]: any;
    };
    /**
     * @description Save subscription
     * @param {Subscription|Array<Subscription>} payload
     * @returns {Subscription|Array<Subscription>} subscribed
     */
    subscribe(payload: {
        id?: number;
        event: string;
        value?: any;
        data?: string;
        notifier?: string;
        group?: string;
        owner?: number;
        status?: number;
        processor?: string;
        expression?: string;
        /**
         * - [OPTIONAL].
         */
        onPreTrigger?: Function;
        /**
         * - [OPTIONAL].
         */
        onPosTrigger?: Function;
    } | {
        id?: number;
        event: string;
        value?: any;
        data?: string;
        notifier?: string;
        group?: string;
        owner?: number;
        status?: number;
        processor?: string;
        expression?: string;
        /**
         * - [OPTIONAL].
         */
        onPreTrigger?: Function;
        /**
         * - [OPTIONAL].
         */
        onPosTrigger?: Function;
    }[]): {
        id?: number;
        event: string;
        value?: any;
        data?: string;
        notifier?: string;
        group?: string;
        owner?: number;
        status?: number;
        processor?: string;
        expression?: string;
        /**
         * - [OPTIONAL].
         */
        onPreTrigger?: Function;
        /**
         * - [OPTIONAL].
         */
        onPosTrigger?: Function;
    } | {
        id?: number;
        event: string;
        value?: any;
        data?: string;
        notifier?: string;
        group?: string;
        owner?: number;
        status?: number;
        processor?: string;
        expression?: string;
        /**
         * - [OPTIONAL].
         */
        onPreTrigger?: Function;
        /**
         * - [OPTIONAL].
         */
        onPosTrigger?: Function;
    }[];
    /**
     * @description Remove subscription
     * @param {Subscription|Array<Subscription>} payload
     * @returns {Subscription|Array<Subscription>} unsubscription
     */
    unsubscribe(payload: {
        id?: number;
        event: string;
        value?: any;
        data?: string;
        notifier?: string;
        group?: string;
        owner?: number;
        status?: number;
        processor?: string;
        expression?: string;
        /**
         * - [OPTIONAL].
         */
        onPreTrigger?: Function;
        /**
         * - [OPTIONAL].
         */
        onPosTrigger?: Function;
    } | {
        id?: number;
        event: string;
        value?: any;
        data?: string;
        notifier?: string;
        group?: string;
        owner?: number;
        status?: number;
        processor?: string;
        expression?: string;
        /**
         * - [OPTIONAL].
         */
        onPreTrigger?: Function;
        /**
         * - [OPTIONAL].
         */
        onPosTrigger?: Function;
    }[]): {
        id?: number;
        event: string;
        value?: any;
        data?: string;
        notifier?: string;
        group?: string;
        owner?: number;
        status?: number;
        processor?: string;
        expression?: string;
        /**
         * - [OPTIONAL].
         */
        onPreTrigger?: Function;
        /**
         * - [OPTIONAL].
         */
        onPosTrigger?: Function;
    } | {
        id?: number;
        event: string;
        value?: any;
        data?: string;
        notifier?: string;
        group?: string;
        owner?: number;
        status?: number;
        processor?: string;
        expression?: string;
        /**
         * - [OPTIONAL].
         */
        onPreTrigger?: Function;
        /**
         * - [OPTIONAL].
         */
        onPosTrigger?: Function;
    }[];
    /**
     * @description Events list by subscriber
     * @param {Subscription} payload - input data
     * @return {Array<Subscription>} subscriptions
     */
    subscriptions(payload: {
        id?: number;
        event: string;
        value?: any;
        data?: string;
        notifier?: string;
        group?: string;
        owner?: number;
        status?: number;
        processor?: string;
        expression?: string;
        /**
         * - [OPTIONAL].
         */
        onPreTrigger?: Function;
        /**
         * - [OPTIONAL].
         */
        onPosTrigger?: Function;
    }): {
        id?: number;
        event: string;
        value?: any;
        data?: string;
        notifier?: string;
        group?: string;
        owner?: number;
        status?: number;
        processor?: string;
        expression?: string;
        /**
         * - [OPTIONAL].
         */
        onPreTrigger?: Function;
        /**
         * - [OPTIONAL].
         */
        onPosTrigger?: Function;
    }[];
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
