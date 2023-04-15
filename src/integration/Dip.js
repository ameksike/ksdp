/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		09/11/2019
 * @copyright  	Copyright (c) 2019-2050
 * @description Implement a Dependency Injection Pattern based on inheritance to abstract the Setter Injection type 
 * @license    	GPL
 * @version    	1.0
 * */
class DIP {

    /**
     * @description Allow setting a list of dependencies where index is the dependency name
     * @param {Object} options 
     */
    setDependencies(options) {
        if (options) {
            Object.assign(this, options);
        }
        return this;
    }

    /**
     * @description Get the missing dependencies based on a list of dependencies name
     * @param {Array|String} list 
     */
    getMissingDependencies(list) {
        list = typeof (list) === "string" ? [list] : list;
        const missing = [];
        for (let dependency of list) {
            !this[dependency] && missing.push(dependency);
        }
        return missing;
    }

    /**
     * @description Check all requided dependencies and throw an error 
     * @param {Array|String} list 
     * @param {Class} ErrorType 
     */
    checkDependencies(list, ErrorType = null) {
        const missing = this.getMissingDependencies(list);
        if (missing?.length > 0) {
            ErrorType = ErrorType || Error;
            throw new ErrorType("Missing dependencies: " + missing.join(","));
        }
        return this;
    }
}

module.exports = DIP;