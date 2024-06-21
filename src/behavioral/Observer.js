/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        07/10/2019
 * @description Observer pattern
 * @copyright   Copyright (c) 2019-2050
 * @license     GPL
 * @version     1.0
 **/

/**
 * @typedef {({[name:String]:Object} | Array<any>)} List 
 **/
/**
 * @typedef {Object} THelper
 * @property {Function} get
 */
class Observer {

    constructor() {
        /** @type {any} **/
        this.sts = {};
        /** @type {any} **/
        this.evs = {
            "default": {}
        };
        /** @type {THelper|null} */
        this.helper = null;
    }

    /**
     * @description configure lib
     * @param {Object} [opt] 
     * @param {Object} [opt.sts]
     * @param {Object} [opt.evs] 
     * @returns {Observer} self-reference
     */
    configure(opt) {
        this.sts = opt?.sts || this.sts;
        this.evs = opt?.evs || this.evs;
        return this;
    }

    /**
     * @description Getting the Number of Subscriptions for an Event
     * @param {String} event
     * @param {String} scope
     * @returns {Number} count
     */
    count(event = 'default', scope = 'default') {
        let listeners = this.listeners(event, scope);
        return listeners?.length || 0;
    }

    /**
     * @description Getting the Subscriptions for an Event
     * @param {String} event
     * @param {String} scope
     * @returns {Array<any>} list
     */
    listeners(event = 'default', scope = 'default') {
        this.evs[scope] = this.evs[scope] || {};
        return this.evs[scope][event];
    }

    /**
     * @description add an event on scope
     * @param {Array<any>|Object|Function} subscriber 
     * @param {String} [event] 
     * @param {String} [scope='default'] 
     * @param {Object} [option] 
     * @param {String} [option.event] 
     * @param {String} [option.scope] 
     * @param {Number} [option.index]
     * @param {Array<any>} [option.rows]
     * @return {Observer} self-reference
     */
    add(subscriber, event, scope = 'default', option = {}) {
        option = option || {};
        option.event = event;
        option.scope = scope;
        if (Array.isArray(subscriber)) {
            for (let listener of subscriber) {
                delete option['index'];
                this.add(listener, event, scope, option);
            }
        } else {
            if (!event) return this;
            if (!this.evs[scope]) this.evs[scope] = {};
            if (!this.evs[scope][event]) this.evs[scope][event] = [];
            if (option?.index !== undefined && option?.index !== null) {
                this.evs[scope][event][option.index] = subscriber;
            } else {
                this.evs[scope][event].push(subscriber);
                option.index = this.evs[scope][event].length;
            }
            option.rows = option.rows || [];
            option.rows.push(subscriber);
        }
        return this;
    }

    /**
     * @description alias for add an event on scope
     * @param {Array<any>|Object|Function} subscriber 
     * @param {String} [event] 
     * @param {String} [scope='default'] 
     * @param {Object} [option] 
     * @param {String} [option.event] 
     * @param {String} [option.scope] 
     * @param {Number} [option.index]
     * @param {Array<any>} [option.rows]
     * @return {Observer} self-reference
     */
    subscribe(subscriber, event, scope = 'default', option = {}) {
        return this.add(subscriber, event, scope, option);
    }

    /**
     * @description alias for delete an event from scope
     * @param {String} event 
     * @param {String} [scope='default'] 
     * @param {Object} [option] 
     * @param {Number} [option.index] 
     * @param {String} [option.event] 
     * @param {String} [option.scope] 
     * @param {Number} [option.count] 
     * @param {Array<any>} [option.rows] 
     * @return {Observer} self-reference
     */
    unsubscribe(event, scope = 'default', option = {}) {
        return this.del(event, scope, option);
    }

    /**
     * @description delete an event from scope
     * @param {String} event 
     * @param {String} [scope='default'] 
     * @param {Object} [option] 
     * @param {Number} [option.index] 
     * @param {String} [option.event] 
     * @param {String} [option.scope] 
     * @param {Number} [option.count] 
     * @param {Array<any>} [option.rows] 
     * @return {Observer} self-reference
     */
    del(event, scope = 'default', option = {}) {
        option = option || { event, scope };
        option.event = event;
        option.scope = scope;
        if (!this.evs[scope]) return this;
        if (!this.evs[scope][event]) return this;
        if (option.index === null || option.index === undefined) {
            option.rows = this.evs[scope][event];
            delete this.evs[scope][event];
            return this;
        }
        option.rows = this.evs[scope][event].splice(option.index, option.count ?? 1);
        return this;
    }

    /**
     * @description emit an event on a scope with a params list
     * @param {String} event 
     * @param {String} scope 
     * @param {Array<any>} params 
     * @return {Observer} self-reference
     */
    emit(event, scope = "default", params = []) {
        if (!this.evs[scope] || !this.evs[scope][event]) {
            return this;
        }
        for (let i in this.evs[scope][event]) {
            let handler = this.evs[scope][event][i];
            handler && this.process(handler, event, params);
        }
        return this;
    }

    /**
     * @description process an event on a scope
     * @param {*} subscriber 
     * @param {String} event 
     * @param {Array<any>} params 
     * @returns {*} target
     */
    process(subscriber, event, params = []) {
        const target = this.helper ? this.helper.get(subscriber) : subscriber;
        const action = ((target instanceof Function) && target) || (target && target[event]) || target?.on;
        const scope = (target instanceof Function) ? {} : target;
        if (target && action && typeof (action) === 'function') {
            return action.apply(scope, params);
        }
        return target;
    }
}

module.exports = Observer;