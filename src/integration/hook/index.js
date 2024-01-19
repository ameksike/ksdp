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
 * @typedef {({[name:String]:Object} | Array)} List 
 **/

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
 * @property {Date} [date]
 * @property {Function} [onPreTrigger] - formater action to run before process the event but after the subscriber format action
 * @property {Function} [onPosTrigger] - formater action to run after process the event action
 **/

/**
 * @typedef {Object} Event
 * @property {String|Number} [id]
 * @property {String} event
 * @property {String} description
 * @property {String} [payload]
 * @property {String} [group]
 * @property {String} [status]
 */
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
     * @param {Subscription} payload 
     * @return {{ [subscriber: String]: Promise<Array> }} 
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
     * @param {EventOption} payload 
     * @param {String} [name=Memory]
     * @return {Promise<Array>} 
     */
    async run(payload, name = "Memory") {
        let subscriber = this.subscriber.get(name);
        let targets = await subscriber?.subscriptions(payload);
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
                let predat = subscriber?.format instanceof Function ? subscriber.format(pld) : pld;
                let preres = this.cmd?.run(pld?.onPreTrigger, [predat], pld?.scope);
                let insres = this.cmd?.run(notifier?.run, [preres?.result || predat], notifier);
                let posres = this.cmd?.run(pld?.onPosTrigger, [insres?.result], pld?.scope);
                out.push(posres?.result || insres?.result);
            }
        }
        return Promise.all(out);
    }

    /**
     * @description Save subscription
     * @param {Subscription|Array<Subscription>} payload
     * @returns {Subscription|Array<Subscription>} subscribed
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
     * @description Remove subscription
     * @param {Subscription|Array<Subscription>} payload
     * @returns {Subscription|Array<Subscription>} unsubscription
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
     * @description get the subscriptions list
     * @param {Subscription} payload - input data 
     * @return {Array<Subscription>} subscriptions
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
     * @param {List} payload
     * @return {Array<Event>} 
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