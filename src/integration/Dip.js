/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        09/11/2019
 * @copyright   Copyright (c) 2019-2050
 * @description Implement a Dependency Injection Pattern based on inheritance to abstract the Setter Injection type 
 * @license     GPL
 * @version     1.0
 **/
class DIP {

    /**
     * @description Allow setting a list of dependencies where index is the dependency name
     * @param {Object} options 
     * @returns {Object} self
     */
    setDependencies(options) {
        if (options) {
            Object.assign(this, options);
        }
        return this;
    }

    /**
     * @description Allow setting a list of dependencies where index is the dependency name. Alias from setDependencies.
     * @param {Object} options 
     * @returns {Object} self
     */
    inject(options) {
        return this.setDependencies(options);
    }

    /**
     * @description Get the missing dependencies based on a list of dependencies name
     * @param {Array<String>|String} list 
     * @returns {Array<String>} missing dependencies
     */
    getMissingDependencies(list) {
        list = typeof (list) === "string" ? [list] : list;
        const missing = [];
        /** @type {any} */
        const _this = this;
        for (let dependency of list) {
            !_this[dependency] && missing.push(dependency);
        }
        return missing;
    }

    /**
     * @description Check all requided dependencies and throw an error 
     * @param {Array<String>|String} list 
     * @param {typeof Error} [ErrorType] 
     * @returns {DIP} self-reference
     */
    checkDependencies(list, ErrorType) {
        const missing = this.getMissingDependencies(list);
        if (missing?.length > 0) {
            ErrorType = ErrorType || Error;
            throw new ErrorType("Missing dependencies: " + missing.join(","));
        }
        return this;
    }
}

module.exports = DIP;