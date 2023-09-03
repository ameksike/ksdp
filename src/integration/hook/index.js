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
    #cmd;

    get notifier() {
        return this.#notifier;
    }
    get subscriber() {
        return this.#subscriber;
    }
    get cmd() {
        return this.#cmd;
    }

    constructor(cfg) {
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
     * @param {Array|String} payload.subscriber 
     * @param {String} payload.event 
     * @param {Object} payload.data [OPTIONAL]
     * @param {Funtion} payload.onPreTrigger [OPTIONAL]
     * @param {Funtion} payload.onPosTrigger [OPTIONAL]
     * @param {Funtion} payload.scope [OPTIONAL]
     * @return {Object} { [String]: Promise }
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
     * @param {Array|String} subscriber 
     * @param {Object} payload 
     * @param {String} payload.event 
     * @param {Object} payload.data [OPTIONAL]
     * @param {Object} payload.owner [OPTIONAL]
     * @param {Funtion} payload.onPreTrigger [OPTIONAL]
     * @param {Funtion} payload.onPosTrigger [OPTIONAL]
     * @param {Funtion} payload.scope [OPTIONAL]
     * @return {Object} { [String]: Object }
     */
    async run(payload, name = "Memory") {
        const subscriber = this.subscriber.get(name);
        const targets = await subscriber.subscriptions(payload);
        const out = [];
        for (const i in targets) {
            const notifier = this.notifier.get(targets[i]?.target || targets[i]?.notifier);
            if (notifier) {
                const predat = subscriber.format(payload) || payload;
                const params = this.cmd.run(payload?.onPreTrigger, [predat], payload?.scope) || predat;
                const result = notifier.run(params?.result);
                const posres = this.cmd.run(payload?.onPosTrigger, [result], payload?.scope) || result;
                out.push(posres?.result);
            }
        }
        return Promise.all(out);
    }

    /**
     * @description Add subscriber to event
     * @param {String} payload.subscriber  
     * @param {String} payload.target 
     * @param {String} payload.value 
     * @param {String} payload.event 
     * @param {Number} payload.owner 
     * @return { action: String ['subscribe'], status: String ['success'/'failed'], details: String [event] }
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
     * @param {String} payload.subscriber  
     * @param {String} payload.event 
     * @param {Number} payload.owner 
     * @return { action: String ['unsubscribe'], status: String ['success'/'failed'], details: String [event] }
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
     * @param {String} payload.subscriber
     * @param {String} payload.event [OPTIONAL]
     * @param {Number} payload.subscriber 
     * @return {Attay} subscriptions
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
     * @return {Array} [{name: String, description: String}]
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