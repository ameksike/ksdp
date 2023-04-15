/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/10/2019
 * @description Observer pattern
 * @copyright  	Copyright (c) 2019-2050
 * @license    	GPL
 * @version    	1.0
 * */
class Command {

    constructor(opt) {
        this.configure(opt);
    }

    configure(opt = false) {
        this.factory = (opt && opt.factory instanceof Function) ? opt.factory : null;
    }

    /**
     * @description run action with params on scope
     * @param {String} action 
     * @param {Any} params 
     * @param {Object} scope 
     * @return {Any}
     */
    run(action, params, scope) {
        scope = this.getScope(scope);
        const behavior = scope[action];
        if (behavior instanceof Function) {
            return behavior.apply(scope, this.asList(params));
        }
        return false;
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
