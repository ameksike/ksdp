/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		07/10/2019
 * @description Observer pattern
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
class Command {

    constructor() { }

    configure(opt = false) { }

    /**
     * @description run action with params on scope
     * @param {String} action 
     * @param {Any} params 
     * @param {Object} scope 
     * @return {Any}
     */
    run(action, params, scope) {
        scope = scope || this;
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
}

module.exports = Command;
