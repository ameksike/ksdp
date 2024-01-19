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

    configure(opt = false) {
        if (opt) {
            this.sts = opt.sts ? opt.sts : this.sts;
            this.evs = opt.evs ? opt.evs : this.evs;
        }
        return this;
    }

    /**
     * @description add an event on scope
     * @param {String} subscriber 
     * @param {String} event 
     * @param {String} [scope=default] 
     * @return {Observer} self-reference
     */
    add(subscriber, event, scope = "default") {
        if (!event) return this;
        if (!this.evs[scope]) this.evs[scope] = {};
        if (!this.evs[scope][event]) this.evs[scope][event] = [];
        this.evs[scope][event].push(subscriber);
        return this;
    }

    /**
     * @description delete an event from scope
     * @param {String} event 
     * @param {String} [scope=default] 
     * @return {Observer} self-reference
     */
    del(event, scope = "default") {
        if (!this.evs[scope]) return this;
        delete this.evs[scope][event];
        return this;
    }

    /**
     * @description emit an event on a scope with a params list
     * @param {String} event 
     * @param {String} scope 
     * @param {List} params 
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
     * @param {List} params 
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