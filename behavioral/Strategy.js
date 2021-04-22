/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @description Factory Strategy Patters
 * @date		07/10/2019
 * @copyright  	Copyright (c) 2020-2030
 * @license    	CPL
 * @version    	1.0
 * */
class Strategy {

    constructor(payload) {
        this.ctrl = {};
        this.configure(payload);
    }

    /**
     * @description Get strategy
     * @param default String {Strategy Key Path}
     * @param path String {Strategy Path}
     * @return this
     */
    configure(payload = {}) {
        this.default = payload.default || 'default';
        this.path = payload.path || '.';
        this.param = payload.param || {};
        return this;
    }

    /**
     * @description Get strategy
     * @param type String {Strategy Key Path}
     * @param name String {Strategy Key Name}
     * @return Object {Strategy Instance}
     */
    get(payload = {}) {
        try {
            const type = payload.type || this.default;
            const path = payload.path || this.path;
            const name = payload.name || 'Default';
            const param = payload.param || this.param;
            this.ctrl[type] = this.ctrl[type] || {};

            if (!this.ctrl[type][name]) {
                const Stg = type.charAt(0).toUpperCase() + type.slice(1);
                const Cls = require(path + '/' + type + '/' + Stg + name.toUpperCase());
                this.ctrl[type][name] = new Cls(param);
            }
            return this.ctrl[type][name];
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = Strategy;