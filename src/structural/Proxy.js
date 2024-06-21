/**
 * @description Extendable Proxy class implementation 
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        11/05/2020
 * @copyright   Copyright (c) 2020-2050
 * @license     GPL
 * @version     1.0
 **/
class KsProxy {

    constructor() {
        return this.build();
    }

    /**
     * @description Proxy builder
     * @returns {KsProxy}
     */
    build() {
        return new Proxy(this, {
            /**
             * @description Must be overridden in the child class to define how properties of the controlled class are set
             * @virtual
             * @param {any} target 
             * @param {string | number | symbol} key 
             * @param {*} value 
             * @param {Object} receiver 
             * @returns {boolean}
             */
            set: (target, key, value, receiver) => {
                if (typeof (key) === "symbol") {
                    return !!null;
                }
                if (this.#skip(target, key)) {
                    target[key] = value;
                } else {
                    this.set(target, key, value, receiver)
                }
                return true;
            },
            /**
             * @description Must be overridden in the child class to define how methods or properties of the controlled class are read
             * @virtual
             * @param {Object} target 
             * @param {string | number | symbol} key 
             * @param {Object} receiver 
             * @returns {*} value
             */
            get: (target, key, receiver) => {
                if (typeof (key) === "symbol") {
                    return null;
                }
                if (this.#skip(target, key)) {
                    const res = Reflect.get(target, key, receiver);
                    return typeof res === 'function' ? res.bind(target) : res;
                } else {
                    return this.get(target, key, receiver);
                }
            },
        });
    }

    /**
     * @description Define if it is possible to skip some properties and method from the target
     * @param {any} target 
     * @param {String|Number} key 
     * @returns {Boolean}
     */
    #skip(target, key) {
        return !!target[key];
    }

    /**
     * @description Must be overridden in the child class to define how methods or properties of the controlled class are read
     * @virtual
     * @param {Object} target 
     * @param {string | number | symbol} key 
     * @param {Object} receiver 
     * @returns {*} value
     */
    get(target, key, receiver) {
        return Reflect.get(target, key, receiver);
    }

    /**
     * @description Must be overridden in the child class to define how properties of the controlled class are set
     * @virtual
     * @param {any} target 
     * @param {string | number | symbol} key 
     * @param {*} value 
     * @param {Object} receiver 
     */
    set(target, key, value, receiver) {
        if (key in target) {
            return false;
        }
        return target[key] = value;
    }
}

module.exports = KsProxy;