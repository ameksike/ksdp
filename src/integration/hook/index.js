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
class Hook {

    #notifier;
    #subscriber;
    #processor;
    #cmd;

    get notifier() {
        return this.#notifier;
    }
    get subscriber() {
        return this.#subscriber;
    }
    get processor() {
        return this.#processor;
    }
    get cmd() {
        return this.#cmd;
    }

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

    configure(cfg) {
        this.notifier.configure(cfg);
        this.subscriber.configure(cfg);
        return this;
    }

    /**
     * @description Trigger hooks notification
     * @param {EventOption} payload 
     * @return {{ [String]: Promise }} 
     */
    trigger(payload) {
        const out = {};
        if (payload.subscriber instanceof Array) {
            for (const i of payload.subscriber) {
                out[i] = this.run(payload, i);
            }
        } else {
            out[payload.subscriber] = this.run(payload, payload.subscriber);
        }
        return out;
    }

    /**
     * @description trigger hooks notification by subscriber
     * @param {EventOption} options 
     * @param {String} [name=Memory]
     * @return {{ [String]: Object }} 
     */
    async run(payload, name = "Memory") {
        let subscriber = this.subscriber.get(name);
        let targets = await subscriber.subscriptions(payload);
        let out = [];
        for (let i in targets) {
            let target = targets[i];
            let notifier = this.notifier.get(target?.notifier || target?.target);
            if (notifier) {
                let pld = { ...payload };
                pld.date = Date.now();
                pld.data = pld.data || {};
                pld.target = target;
                notifier.hook = this;
                if (pld?.target?.expression && pld.target.processor) {
                    let processor = this.processor.get(pld.target.processor);
                    if (processor) {
                        let resprd = this.cmd?.run(processor?.run, [pld?.target?.expression, pld.data, pld], processor);
                        if (!resprd?.result) {
                            continue;
                        }
                    }
                }
                let predat = subscriber.format instanceof Function ? subscriber.format(pld) : pld;
                let preres = this.cmd?.run(pld?.onPreTrigger, [predat], pld?.scope);
                let insres = this.cmd?.run(notifier?.run, [preres?.result || predat], notifier);
                let posres = this.cmd?.run(pld?.onPosTrigger, [insres?.result], pld?.scope);
                out.push(posres?.result || insres?.result);
            }
        }
        return Promise.all(out);
    }

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
    async subscribe(payload) {
        try {
            if (Array.isArray(payload)) {
                const out = [];
                for (let item of payload) {
                    out.push(this.subscribe(item));
                }
                return out;
            }
            const subscriber = this.subscriber.get(payload.subscriber);
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
     * @description Remove subscriber from event
     * @param {Object} payload - input data 
     * @param {String} payload.subscriber  
     * @param {String} payload.event 
     * @param {Number} payload.owner 
     * @returns {Response} result The output object with action=unsubscribe.
     */
    async unsubscribe(payload) {
        try {
            if (Array.isArray(payload)) {
                const out = [];
                for (let item of payload) {
                    out.push(this.unsubscribe(item));
                }
                return out;
            }
            payload = payload || {};
            payload.subscriber = payload.subscriber || 'Memory'
            const subscriber = this.subscriber.get(payload.subscriber);
            return await subscriber?.unsubscribe(payload)
        } catch (error) {
            this.logger?.error({
                src: 'Ksdp:Hook:unsubscribe',
                data: payload
            });
            return null;
        }
    }

    /**
     * @description Events list by subscriber
     * @param {Object} payload - input data 
     * @param {String} payload.subscriber
     * @param {String} payload.event [OPTIONAL]
     * @param {Number} payload.subscriber 
     * @return {Array} subscriptions
     */
    async subscriptions(payload) {
        try {
            payload = payload || {};
            payload.subscriber = payload.subscriber || 'Memory';
            const subscriber = this.subscriber.get(payload.subscriber);
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
     * @param {*} payload
     * @return {Array<{name: String, description: String}>} 
     */
    async events(payload) {
        try {
            payload = payload || {};
            payload.subscriber = payload.subscriber || 'Memory';
            const subscriber = this.subscriber.get(payload.subscriber);
            return await subscriber?.events(payload);
        } catch (error) {
            return [];
        }
    }
}

module.exports = Hook;