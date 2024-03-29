/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        24/03/2024
 * @description Chain of Responsibility pattern 
 * @copyright   Copyright (c) 2019-2050
 * @license     GPL
 * @version     1.0
 **/

/**
 * @typedef {import("../types").TDelegate} TDelegate
 */

class ChainAsync {

    /**
     * @type {Object}
     */
    logger;

    /**
     * @type {Object}
     */
    store;

    /**
     * @param {Object} [option]
     * @param {Object} [option.logger] 
     * @param {Array<any>} [option.store] 
     */
    constructor(option) {
        this.logger = option?.logger;
        this.store = option?.store || [];
    }

    /**
     * @description exec a delegate
     * @param {TDelegate} delegate 
     */
    exec(delegate) {
        return new Promise((next) => {
            try {
                let { action, params, scope } = delegate;
                let method = action instanceof Function ? action : (scope && scope[action]);
                if (!(method instanceof Function)) {
                    return null;
                }
                return method.apply(scope || {}, [...params, next]);
            }
            catch (error) {
                this.logger?.error({ src: 'KsDp:Chain:run', error });
                next();
            }
        });
    }

    /**
     * @description insert a new delegate
     * @param {TDelegate} payload 
     * @returns {Promise<TDelegate>} delegate
     */
    #insert(payload) {
        const action = payload instanceof Function ? payload : payload.action;
        const params = payload?.params || [];
        const scope = payload?.scope || {};
        const index = payload?.index || Object.keys(this.store).length;
        const delegate = { action, params, scope, index };
        this.store[index] = delegate;
        return Promise.resolve(delegate);
    }

    /**
     * @description add a new delegate
     * @param {TDelegate|Array<TDelegate>} payload 
     * @returns {Promise<TDelegate|Array<TDelegate>>} delegate
     */
    async add(payload) {
        if (Array.isArray(payload)) {
            let list = [];
            for (let delegate of payload) {
                list.push(this.#insert(delegate));
            }
            return await Promise.all(list);
        } else {
            return this.#insert(payload);
        }
    }

    /**
     * @description remove a delegate
     * @param {String|Number} index 
     * @returns {Promise<TDelegate>} delegate
     */
    #delete(index) {
        const delegate = this.store[index];
        delete this.store[index];
        return Promise.resolve(delegate || null);
    }

    /**
     * @description remove a delegate
     * @param {String|Number|Array<String|Number>} index 
     * @returns {Promise<TDelegate|TDelegate[]>} delegate
     */
    async del(index) {
        if (Array.isArray(index)) {
            let list = [];
            for (let delegate of index) {
                list.push(this.#delete(delegate));
            }
            return Promise.all(list);
        }
        else {
            return this.#delete(index);
        }
    }

    /**
     * @description run the chain 
     * @param {Array<any>} params 
     * @param {Object} scope 
     * @returns {Promise<any>}
     */
    async run(params, scope) {
        let res = null;
        let ops = 0;
        for (let i in this.store) {
            let delegate = this.store[i];
            if (delegate) {
                ops++;
                params && (delegate.params = [...delegate.params, ...params]);
                scope && (delegate.scope = scope);
                res = await this.exec(delegate);
                if (res?.stop) {
                    break;
                }
            }
        }
        return { ...res, ops };
    }
}

module.exports = ChainAsync;
