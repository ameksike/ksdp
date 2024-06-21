/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        07/10/2019
 * @description Observer pattern
 * @copyright   Copyright (c) 2019-2050
 * @license     GPL
 * @version     1.0
 **/
const inherit = require("../inherit");

/**
 * @typedef {({[name:String]:Object} | Array<any>)} List 
 **/
class Command {

    /**
     * @param {Object} [opt]
     */
    constructor(opt) {
        this.configure(opt);
    }

    /**
     * @description configure the Command lib
     * @param {Object} [opt]
     * @param {Function} [opt.factory] 
     */
    configure(opt) {
        this.factory = (opt?.factory instanceof Function) ? opt?.factory : null;
    }

    /**
     * @description run action with params on scope
     * @param {String|Function|null|undefined} action 
     * @param {List} [params] 
     * @param {Object} [scope] 
     * @return {Object} result
     */
    run(action, params, scope) {
        try {
            if (!action) {
                return {
                    result: action
                };
            }
            let _scope = this.getScope(scope);
            if (typeof (action) === "string") {
                action = _scope[action] instanceof Function ? _scope[action] : inherit.ns(_scope, action);
            }
            if (action instanceof Function) {
                return { result: action.apply(_scope, this.asList(params)) };
            }
            return { error: new Error(`"${action}" does not exist`) };
        }
        catch (error) {
            return { error };
        }
    }

    /**
     * @description Get as array
     * @param {List} [payload] value 
     * @return {Array<*>} list
     */
    asList(payload) {
        return (payload instanceof Array ? payload : [payload]);
    }

    /**
     * @description resolve scope
     * @param {Object} [scope] 
     */
    getScope(scope) {
        return this.factory ? this.factory(scope) : (scope || this);
    }
}

module.exports = Command;
