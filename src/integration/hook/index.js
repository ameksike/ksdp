/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		09/11/2023
 * @copyright  	Copyright (c) 2019-2050
 * @description Hook pattern base implementation 
 * @license    	GPL
 * @version    	1.0
 **/
const Strategy = require("../../behavioral/Strategy");
const Command = require("../../behavioral/Command");
const MemorySubscriber = require("./subscriber/Memory");
const IocNotifier = require("./notifier/Ioc");

/**
 * @typedef {import('./types').TEvent} TEvent 
 * @typedef {import('./types').TSubscription} TSubscription 
 * @typedef {import('./types').TList} TList 
 * @typedef {import('./types').TTarget} TTarget 
 * @typedef {import('./types').TSubscriber} TSubscriber 
 * @typedef {import('./types').TProcessor} TProcessor 
 * @typedef {import('./types').TResult} TResult 
 * @typedef {Object<string, Promise<any[]>>|{}} TListEmitted
 */
class Hook {

    #notifier;
    #subscriber;
    #processor;
    #cmd;

    /**
     * @returns {Strategy}
     */
    get notifier() {
        return this.#notifier;
    }

    /**
     * @returns {Strategy}
     */
    get subscriber() {
        return this.#subscriber;
    }

    /**
     * @returns {Strategy}
     */
    get processor() {
        return this.#processor;
    }

    /**
     * @returns {Command}
     */
    get cmd() {
        return this.#cmd;
    }

    /**
     * @param {*} cfg 
     */
    constructor(cfg) {
        this.#processor = new Strategy({ path: cfg.path, default: 'processor' });
        this.#notifier = new Strategy({ path: cfg.path, default: 'notifier' });
        this.#notifier.set({ name: "Ioc", target: IocNotifier });
        this.#subscriber = new Strategy({ path: cfg.path, default: 'subscriber' });
        this.#subscriber.set({ name: "Memory", target: MemorySubscriber });
        this.#cmd = new Command();
        this.logger = cfg.logger || this.logger;
        this.configure(cfg);
    }

    /**
     * @param {*} cfg 
     * @returns 
     */
    configure(cfg) {
        this.notifier.configure(cfg);
        this.subscriber.configure(cfg);
        return this;
    }

    /**
     * @description Trigger hooks notification
     * @param {TSubscription} payload 
     * @return {TListEmitted} 
     */
    trigger(payload) {
        /** @type {*} **/
        const out = {};
        if (Array.isArray(payload.subscriber)) {
            for (let i of payload.subscriber) {
                out[i] = this.run(payload, i);
            }
        } else {
            payload?.subscriber && (out[payload.subscriber] = this.run(payload, payload.subscriber || 'Memory'));
        }
        return out;
    }

    /**
     * @description trigger hooks notification by subscriber
     * @param {TSubscription} payload 
     * @param {String} [name=Memory]
     * @return {Promise<Array<any>>} 
     */
    async run(payload, name = "Memory") {
        /** @type {*} **/
        let subscriber = this.subscriber.get(name);
        if (!subscriber) {
            return Promise.reject('There are no subscribers available with name: ' + name);
        }
        subscriber.hook = this;
        let targets = await subscriber?.subscriptions(payload);
        let out = [];
        for (let i in targets) {
            let target = targets[i];
            let result = this.process(target, subscriber, payload);
            result !== null && result !== undefined && out.push(result);
        }
        return Promise.all(out);
    }

    /**
     * @description Process a subscription 
     * @param {TTarget} target 
     * @param {TSubscriber} subscriber 
     * @param {Object} payload 
     * @returns {*}
     */
    process(target, subscriber, payload) {
        try {
            // Load the notifier
            let tmpnotif = this.notifier.get(target?.notifier || target?.target);
            let notifier = Array.isArray(tmpnotif) ? tmpnotif[0] : tmpnotif;
            let param = target?.param;
            // Check the notifier
            if (!notifier) {
                this.logger?.warn({
                    src: 'Ksdp:Hook:Run:CheckNotifier',
                    error: 'Notifier not found',
                    data: {
                        event_id: target?.id,
                        event_name: target?.event,
                        notifier: target?.notifier
                    }
                });
                return null;
            }
            /**
             * @description Define the custom data for the event processing 
             * @type {TSubscription}
             */
            let pld = { data: {}, scope: null, ...payload, target, date: Date.now(), hook: this, mode: 1 };
            pld.data = pld.data || {};
            // Evaluate the expression
            if (pld?.target?.expression && pld.target.processor) {
                /** @type {any} **/
                let opts = {};
                let tmpprs = this.processor.get(pld.target.processor);
                /** @type {TProcessor} **/
                let processor = Array.isArray(tmpprs) ? tmpprs[0] : tmpprs;
                // Check the expression based on the processor
                if (processor) {
                    /** @type {TResult} **/
                    let resprd = this.cmd?.run(processor?.run, [pld?.target?.expression, pld.data, opts], processor);
                    let error = resprd?.error || opts.error;
                    if (!resprd?.result) {
                        // Loading the alternate notifier and parameters
                        if (pld.target.notifier_alt || pld.target.param_alt) {
                            let notifierAlt = this.notifier.get(pld.target.notifier_alt);
                            if (!notifierAlt) {
                                this.logger?.warn({
                                    src: 'Ksdp:Hook:Run:CheckNotifierAlt',
                                    error: 'Notifier not found',
                                    data: {
                                        event_id: pld?.target?.id,
                                        event_name: pld?.target?.event,
                                        notifier: pld.target.notifier_alt
                                    }
                                });
                            } else {
                                notifier = notifierAlt;
                                pld.mode = 0;
                            }
                            param = pld.target.param_alt || param;
                        }
                        else return null;
                    }
                    error && this.logger?.warn({
                        src: 'Ksdp:Hook:Run:CheckExpression',
                        error: error.message,
                        data: {
                            event_id: pld?.target?.id,
                            event_name: pld?.target?.event,
                            event_expression: pld?.target?.expression,
                            event_payload: pld.data
                        }
                    });
                }
            }
            // Parameter mapping
            if (param) {
                /** @type {any} **/
                let opts = {};
                let tmpprs = this.processor.get(pld?.target?.processor || 'Native');
                /** @type {TProcessor} **/
                let processor = Array.isArray(tmpprs) ? tmpprs[0] : tmpprs;
                /** @type {TResult} **/
                let resprd = pld.data && this.cmd?.run(processor?.run, [param, pld.data, opts], processor);
                let error = resprd?.error || opts.error;
                resprd?.result && (pld.data = resprd?.result);
                error && this.logger?.warn({
                    src: 'Ksdp:Hook:Run:MapParams',
                    error: error.message,
                    data: {
                        event_id: pld.target?.id,
                        event_name: pld.target?.event,
                        event_param: pld.target?.param,
                        event_payload: pld.data
                    }
                });
            }
            // Inject the hook library
            notifier.hook = this;
            // Run notifier action 
            let predat = subscriber?.format instanceof Function ? subscriber.format(pld) : pld;
            /** @type {TResult} **/
            let preres = this.cmd?.run(pld?.onPreTrigger, [predat], pld?.scope || {});
            /** @type {TResult} **/
            let insres = this.cmd?.run(notifier?.run, [preres?.result || predat], notifier);
            /** @type {TResult} **/
            let posres = this.cmd?.run(pld?.onPosTrigger, [insres?.result], pld?.scope || {});
            return posres?.result || insres?.result;
        }
        catch (/** @type {any} */ error) {
            this.logger?.warn({
                src: 'Ksdp:Hook:Process',
                error: error?.message,
                data: {
                    event_id: target?.id,
                    event_name: target?.event,
                    notifier: target?.notifier || target?.target
                }
            });
            return null;
        }

    }

    /**
     * @description Save subscription
     * @param {TSubscription} payload
     * @returns {Promise<TSubscription|null>} subscribed
     */
    async add(payload) {
        try {
            const tmp = this.subscriber.get(payload.subscriber);
            const subscriber = Array.isArray(tmp) ? tmp[0] : tmp;
            return await subscriber?.subscribe(payload);
        } catch (error) {
            this.logger?.error({
                src: 'Ksdp:Hook:subscribe',
                data: payload
            });
            return null;
        }
    }

    /**
     * @description Save subscription
     * @param {TSubscription|Array<TSubscription>} payload
     * @returns {Promise<Array<TSubscription|null>>} subscribed
     */
    async subscribe(payload) {
        if (Array.isArray(payload)) {
            const out = [];
            for (let item of payload) {
                out.push(this.add(item));
            }
            return Promise.all(out);
        }
        return [await this.add(payload)];
    }

    /**
     * @description Remove subscription
     * @param {TSubscription} payload
     * @returns {Promise<TSubscription|null>} unsubscription
     */
    async remove(payload) {
        try {
            payload = payload || { event: 'Memory' };
            payload.subscriber = payload.subscriber || 'Memory';
            const tmp = this.subscriber.get(payload.subscriber);
            const subscriber = Array.isArray(tmp) ? tmp[0] : tmp;
            return await subscriber?.unsubscribe(payload);
        } catch (error) {
            this.logger?.error({
                src: 'Ksdp:Hook:unsubscribe',
                data: payload
            });
            return null;
        }
    }

    /**
     * @description Remove subscription
     * @param {TSubscription|Array<TSubscription>} payload
     * @returns {Promise<Array<TSubscription|null>>} unsubscriptions
     */
    async unsubscribe(payload) {
        if (Array.isArray(payload)) {
            const out = [];
            for (let item of payload) {
                out.push(this.remove(item));
            }
            return Promise.all(out);
        }
        return [await this.remove(payload)];
    }

    /**
     * @description get the subscriptions list
     * @param {TSubscription} [payload] - input data 
     * @return {Promise<TSubscription[]>} subscriptions
     */
    async subscriptions(payload) {
        try {
            payload = payload || { event: 'Memory' };
            payload.subscriber = payload.subscriber || 'Memory';
            const tmp = this.subscriber.get(payload.subscriber);
            const subscriber = Array.isArray(tmp) ? tmp[0] : tmp;
            return await subscriber?.subscriptions(payload);
        } catch (error) {
            this.logger?.error({
                src: 'Ksdp:Hook:subscriptions',
                data: payload
            });
            return [];
        }
    }

    /**
     * @description List of all avalible events
     * @param {TList} payload
     * @return {Promise<TEvent[]>} 
     */
    async events(payload) {
        try {
            payload = payload || {};
            payload.subscriber = payload.subscriber || 'Memory';
            const tmp = this.subscriber.get(payload.subscriber);
            const subscriber = Array.isArray(tmp) ? tmp[0] : tmp;
            return await subscriber?.events(payload);
        } catch (error) {
            return [];
        }
    }
}

module.exports = Hook;