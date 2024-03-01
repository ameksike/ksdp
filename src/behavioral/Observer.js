/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/10/2019
 * @description Observer pattern
 * @copyright  	Copyright (c) 2019-2050
 * @license    	GPL
 * @version    	1.0
 **/

/**
 * @typedef {({[name:String]:Object} | Array)} List 
 **/
class Observer {

    constructor() {
        this.sts = {};
        this.evs = {
            "default": {}
        };
        this.helper = null;
    }

    /**
     * @description configure lib
     * @param {Object} [opt] 
     * @param {Object} [opt.sts]
     * @param {Object} [opt.evs] 
     * @returns {Observer} self-reference
     */
    configure(opt = null) {
        this.sts = opt?.sts || this.sts;
        this.evs = opt?.evs || this.evs;
        return this;
    }

    /**
     * @description add an event on scope
     * @param {String} subscriber 
     * @param {String} [event] 
     * @param {String} [scope='default'] 
     * @param {Object} [option] 
     * @param {String} [option.event] 
     * @param {String} [option.scope] 
     * @param {Number} [option.index]
     * @param {Array} [option.rows]
     * @return {Observer} self-reference
     */
    add(subscriber, event, scope = 'default', option = null) {
        option = option || { event, scope };
        option.event = event;
        option.scope = scope;
        if (!event) return this;
        if (!this.evs[scope]) this.evs[scope] = {};
        if (!this.evs[scope][event]) this.evs[scope][event] = [];
        if (option?.index !== undefined && option?.index !== null) {
            this.evs[scope][event][option.index] = subscriber;
        } else {
            this.evs[scope][event].push(subscriber);
            option.index = this.evs[scope][event].length;
        }
        option.rows = [subscriber];
        return this;
    }

    /**
     * @description delete an event from scope
     * @param {String} event 
     * @param {String} [scope='default'] 
     * @param {Object} [option] 
     * @param {Number} [option.index] 
     * @param {String} [option.event] 
     * @param {String} [option.scope] 
     * @param {Number} [option.amount] 
     * @param {Array} [option.rows] 
     * @return {Observer} self-reference
     */
    del(event, scope = 'default', option = null) {
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
        option.rows = this.evs[scope][event].splice(option.index, option.amount ?? 1);
        return this;
    }

    /**
     * @description emit an event on a scope with a params list
     * @param {String} event 
     * @param {String} scope 
     * @param {Array} params 
     * @return {Observer} self-reference
     */
    emit(event, scope = "default", params = []) {
        if (!this.evs[scope] || !this.evs[scope][event]) {
            return this;
        }
        for (let i in this.evs[scope][event]) {
            this.process(this.evs[scope][event][i], event, params);
        }
        return this;
    }

    /**
     * @description process an event on a scope
     * @param {*} subscriber 
     * @param {String} event 
     * @param {Array} params 
     * @returns {*} target
     */
    process(subscriber, event, params = []) {
        const target = this.helper ? this.helper.get(subscriber) : subscriber;
        const action = (target instanceof Function) ? target : target[event];
        const scope = (target instanceof Function) ? {} : target;
        if (target && typeof (action) === 'function') {
            return action.apply(scope, params);
        }
        return target;
    }
}

module.exports = Observer;