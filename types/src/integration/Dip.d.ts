export = DIP;
/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		09/11/2019
 * @copyright  	Copyright (c) 2019-2050
 * @description Implement a Dependency Injection Pattern based on inheritance to abstract the Setter Injection type
 * @license    	GPL
 * @version    	1.0
 **/
declare class DIP {
    /**
     * @description Allow setting a list of dependencies where index is the dependency name
     * @param {Object} options
     * @returns {Object} self
     */
    setDependencies(options: any): any;
    /**
     * @description Allow setting a list of dependencies where index is the dependency name. Alias from setDependencies.
     * @param {Object} options
     * @returns {Object} self
     */
    inject(options: any): any;
    /**
     * @description Get the missing dependencies based on a list of dependencies name
     * @param {Array|String} list
     */
    getMissingDependencies(list: any[] | string): any[];
    /**
     * @description Check all requided dependencies and throw an error
     * @param {Array|String} list
     * @param {Function} ErrorType
     */
    checkDependencies(list: any[] | string, ErrorType?: Function): this;
}
