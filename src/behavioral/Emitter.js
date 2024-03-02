/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/10/2019
 * @description Observer pattern [https://nodejs.org/api/events.html]
 * @copyright  	Copyright (c) 2019-2050
 * @license    	GPL
 * @version    	1.0
 * @link        https://nodejs.org/api/events.html
 **/
const { EventEmitter, captureRejectionSymbol } = require('events');

class Emitter extends EventEmitter {

    /**
     * @type {Object}
     */
    #data;

    constructor() {
        super({ captureRejections: true });
        this.#data = {};
    }

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
     * @param {Array} [option.args] 
     * @returns {*} listener
     */
    #getListener(subscriber, event = 'default', option = null) {
        let args = option?.args || [];
        let listener = subscriber instanceof Function ? (...arg) => subscriber(...arg, ...args) : null;
        !listener && subscriber[event] instanceof Function && (listener = (...arg) => subscriber[event](...arg, ...args));
        !listener && subscriber.on instanceof Function && (listener = (...arg) => subscriber.on(...arg, ...args));
        return listener;
    }

    /**
     * @description subscribe a listener to an event
     * @param {Array|Object|Function} subscriber 
     * @param {String|symbol} [event] 
     * @param {Object} [option] 
     * @param {Array} [option.args] 
     * @param {Array} [option.rows] 
     * @param {Boolean} [option.once] 
     * @param {Array|Object|Function} [option.pre] 
     * @param {String|symbol} [option.event] 
     * @returns {Emitter} self
     */
    set(subscriber, event = 'default', option = null) {
        option = option || {};
        if (!subscriber) {
            return this;
        }
        if (Array.isArray(subscriber)) {
            for (let listener of subscriber) {
                this.set(listener, event, option);
            }
        } else {
            // decorate the listener
            let listener = this.#getListener(subscriber, event, option);
            if (!listener) {
                return this;
            }
            // define the mode 
            if (option?.once) {
                this.once(event, listener);
            } else {
                this.on(event, listener);
            }
            // prepend Listener
            if (option?.pre) {
                if (Array.isArray(option.pre)) {
                    for (let pre of option.pre) {
                        let preListener = this.#getListener(pre, event, option);
                        preListener && this.prependListener(event, preListener);
                    }
                } else {
                    let preListener = this.#getListener(option.pre, event, option);
                    preListener && this.prependListener(event, preListener);
                }
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
     * @param {Array|Object|Function} subscriber 
     * @param {String|symbol} [event] 
     * @param {Object} [option] 
     * @param {Array} [option.args] 
     * @param {Array} [option.rows] 
     * @param {Boolean} [option.once] 
     * @param {String|symbol} [option.event] 
     * @param {Array|Object|Function} [option.pre] 
     * @returns {Emitter} self
     */
    add(subscriber, event = 'default', option = null) {
        return this.set(subscriber, event, option);
    }

    /**
     * @description alias for subscribe a listener to an event
     * @param {Array|Object|Function} subscriber 
     * @param {String|symbol} [event] 
     * @param {Object} [option] 
     * @param {Array} [option.args] 
     * @param {Array} [option.rows] 
     * @param {Boolean} [option.once] 
     * @param {String|symbol} [option.event] 
     * @param {Array|Object|Function} [option.pre] 
     * @returns {Emitter} self
     */
    subscribe(subscriber, event = 'default', option = null) {
        return this.set(subscriber, event, option);
    }

    /**
     * @description alias for subscribe a listener to an event
     * @param {String|symbol} [event] 
     * @param {Array|Object|Function} subscriber 
     * @param {Object} [option] 
     * @param {Array} [option.rows] 
     * @param {String|symbol} [option.event] 
     * @param {Number} [option.index] 
     * @param {Number} [option.amount] 
     * @returns {Emitter} self
     */
    unsubscribe(event = 'default', subscriber = null, option = null) {
        return this.del(event, subscriber, option);
    }

    /**
     * @description remove a subscriber from an event or clean an event
     * @param {String|symbol} [event] 
     * @param {Array|Object|Function} subscriber 
     * @param {Object} [option] 
     * @param {Array} [option.rows] 
     * @param {String|symbol} [option.event] 
     * @param {Number} [option.index] 
     * @param {Number} [option.amount] 
     * @returns {Emitter} self
     */
    del(event = 'default', subscriber = null, option = null) {
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
            let listener = subscriber;
            if (!listener) {
                let listeners = this.rawListeners(event);
                let index = option.index || 0;
                let amount = index + (option.amount || 0);
                amount = amount >= listeners.length ? listeners.length - 1 : amount;
                for (let i = index; i <= amount; i++) {
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
     * @override
     * @param {String|symbol} event
     * @param {...any} [args] 
     * @returns {Boolean} res
     */
    emit(event, ...args) {
        this.#data[event] = args;
        return super.emit(event, this, ...args);
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
