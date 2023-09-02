/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/10/2019
 * @description Observer pattern
 * @copyright  	Copyright (c) 2019-2050
 * @license    	GPL
 * @version    	1.0
 **/
const inherit = require("../inherit");
class Command {

    constructor(opt) {
        this.configure(opt);
    }

    configure(opt = false) {
        this.factory = (opt?.factory instanceof Function) ? opt.factory : null;
    }

    /**
     * @description run action with params on scope
     * @param {String} action 
     * @param {Any} params 
     * @param {Object} scope 
     * @return {Any}
     */
    run(action, params, scope) {
        try {
            if (!action) {
                return {
                    result: action
                };
            }
            scope = this.getScope(scope);
            if (typeof (action) === "string") {
                action = scope[action] instanceof Function ? scope[action] : inherit.ns(scope, action);
            }
            if (action instanceof Function) {
                return { result: action.apply(scope, this.asList(params)) };
            }
            return { error: new Error(`"${action}" does not exist`) };
        }
        catch (error) {
            return { error };
        }
    }

    /**
     * @description Get as array
     * @param {Any} payload value 
     * @return {Array} 
     */
    asList(payload) {
        return (payload instanceof Array ? payload : [payload]);
    }

    /**
     * @description resolve scope
     * @param {Any} scope 
     */
    getScope(scope) {
        return this.factory ? this.factory(scope) : (scope || this);
    }
}

module.exports = Command;
