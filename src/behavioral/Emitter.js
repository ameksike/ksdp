/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        07/10/2019
 * @description Observer pattern [https://nodejs.org/api/events.html]
 * @copyright   Copyright (c) 2019-2050
 * @license     GPL
 * @version     1.0
 * @link        https://nodejs.org/api/events.html
 **/
const { EventEmitter, captureRejectionSymbol } = require('events');

class Emitter extends EventEmitter {

    /**
     * @type {any}
     */
    #data;

    constructor() {
        super({ captureRejections: true });
        this.#data = {};
    }

    /**
     * @param {*} err 
     * @param {*} event 
     * @param  {...any} args 
     */
    [captureRejectionSymbol](err, event, ...args) {
        this.emit('error', err, event, args);
    }

    /**
     * @description get data by event
     * @param {String|symbol} key 
     * @returns {*}
     */
    get(key = 'default') {
        return this.#data[key];
    }

    /**
     * @description get the listener decorator
     * @param {*} subscriber 
     * @param {String|symbol} [event] 
     * @param {Object} [option] 
     * @param {Array<any>} [option.args] 
     * @returns {*} listener
     */
    decorate(subscriber, event = 'default', option = {}) {
        let args = option?.args || [];
        let listener = subscriber instanceof Function ? (/** @type {any} */ ...arg) => subscriber(...arg, ...args) : null;
        !listener && subscriber[event] instanceof Function && (listener = (...arg) => subscriber[event](...arg, ...args));
        !listener && subscriber.on instanceof Function && (listener = (...arg) => subscriber.on(...arg, ...args));
        return listener;
    }

    /**
     * @description subscribe a listener to an event
     * @param {Array<any>|Object|Function} subscriber 
     * @param {String|symbol} [event] 
     * @param {Object} [option] 
     * @param {Array<any>} [option.args] 
     * @param {Array<any>} [option.rows] 
     * @param {String} [option.mode] 
     * @param {String|symbol} [option.event] 
     * @returns {Emitter} self
     */
    set(subscriber, event = 'default', option = {}) {
        option = option || {};
        if (!subscriber) {
            return this;
        }
        // add Listener
        if (Array.isArray(subscriber)) {
            for (let listener of subscriber) {
                this.set(listener, event, option);
            }
        } else {
            // decorate the listener
            let listener = this.decorate(subscriber, event, option);
            if (!listener) {
                return this;
            }
            // define the mode 
            if (option.mode === 'once') {
                this.once(event, listener);
            } else if (option.mode === 'prepend') {
                this.prependListener(event, listener);
            } else {
                this.on(event, listener);
            }
            // track actions 
            option.rows = option.rows || [];
            option.rows.push(listener);
            option.event = event;
        }

        return this;
    }

    /**
     * @description alias for subscribe a listener to an event
     * @param {Array<any>|Object|Function} subscriber 
     * @param {String|symbol} [event] 
     * @param {Object} [option] 
     * @param {Array<any>} [option.args] 
     * @param {Array<any>} [option.rows] 
     * @param {String} [option.mode] 
     * @param {String|symbol} [option.event] 
     * @returns {Emitter} self
     */
    add(subscriber, event = 'default', option = {}) {
        return this.set(subscriber, event, option);
    }

    /**
     * @description alias for subscribe a listener to an event
     * @param {Array<any>|Object|Function} subscriber 
     * @param {String|symbol} [event] 
     * @param {Object} [option] 
     * @param {Array<any>} [option.args] 
     * @param {Array<any>} [option.rows] 
     * @param {String} [option.mode] 
     * @param {String|symbol} [option.event] 
     * @returns {Emitter} self
     */
    subscribe(subscriber, event = 'default', option = {}) {
        return this.set(subscriber, event, option);
    }

    /**
     * @description alias for subscribe a listener to an event
     * @param {String|symbol} [event] 
     * @param {Array<any>|Object|Function|null} [subscriber] 
     * @param {Object} [option] 
     * @param {Array<any>} [option.rows] 
     * @param {String|symbol} [option.event] 
     * @param {Number} [option.index] 
     * @param {Number} [option.count] 
     * @returns {Emitter} self
     */
    unsubscribe(event = 'default', subscriber, option) {
        return this.del(event, subscriber, option);
    }

    /**
     * @description remove a subscriber from an event or clean an event
     * @param {String|symbol} [event] 
     * @param {Array<any>|Object|Function|null} [subscriber] 
     * @param {Object} [option] 
     * @param {Array<any>} [option.rows] 
     * @param {String|symbol} [option.event] 
     * @param {Number} [option.index] 
     * @param {Number} [option.count] 
     * @returns {Emitter} self
     */
    del(event = 'default', subscriber, option) {
        if (event && !subscriber && (option === undefined || option === null)) {
            this.removeAllListeners(event);
            return this;
        }
        option = option || {};
        if (Array.isArray(subscriber)) {
            for (let listener of subscriber) {
                this.del(event, listener, option);
            }
        } else {
            /** @type {any} **/
            let listener = subscriber;
            if (!listener) {
                let listeners = this.rawListeners(event);
                let index = option.index || 0;
                let count = index + (option.count || 0);
                count = count >= listeners.length ? listeners.length - 1 : count;
                for (let i = index; i <= count; i++) {
                    this.del(event, listeners[i], option);
                }
            } else {
                listener && this.removeListener(event, listener);
                option.rows = option.rows || [];
                option.rows.push(listener);
                option.event = event;
            }
        }
        return this;
    }

    /**
     * @description trigger an event
     * @param {String|symbol} event
     * @param {...any} args 
     * @returns {Boolean} res
     */
    emit(event, ...args) {
        this.#data[event] = args;
        return super.emit(event, ...args, this);
    }

    /**
     * @description Getting the Number of Subscriptions for an Event
     * @param {String|symbol} event
     * @returns {Number} count
     */
    count(event = 'default') {
        return this.listenerCount(event);
    }
}

module.exports = Emitter;
