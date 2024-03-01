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

class Event extends EventEmitter {

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
     * @returns {*} listener
     */
    #getListener(subscriber, event = 'default', option = null) {
        let args = option?.arg;
        let listener = subscriber instanceof Function ? (...arg) => subscriber(...arg, ...args) : null;
        !listener && subscriber[event] instanceof Function && (listener = (...arg) => subscriber[event](...arg, ...args));
        !listener && subscriber.on instanceof Function && (listener = (...arg) => subscriber.on(...arg, ...args));
        return listener;
    }

    /**
     * @description subscribe a listener to an event
     * @param {*} subscriber 
     * @param {String|symbol} [event] 
     * @param {Object} [option] 
     * @returns {Event} self
     */
    set(subscriber, event = 'default', option = null) {
        if (!subscriber) {
            return this;
        }
        let listener = this.#getListener(subscriber, event, option);
        if (!listener) {
            return this;
        }
        if (option.once) {
            this.once(event, listener);
        } else {
            this.on(event, listener);
        }
        if (option.pre) {
            let preListener = this.#getListener(option.pre, event, option);
            preListener && this.prependListener(event, preListener);
        }
        return this;
    }

    /**
     * @description 
     * @param {String|symbol} [event] 
     * @param {*} subscriber 
     * @param {Object} [option] 
     * @returns {Event} self
     */
    del(event = 'default', subscriber = null, option = null) {
        if (!subscriber) {
            this.removeAllListeners(event);
            return this;
        }
        let listener = this.#getListener(subscriber, event, option);
        listener && this.removeListener(event, listener);
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
}

module.exports = Event;
