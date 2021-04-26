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
        this.params = [];
        this.path = '.';
        this.default = 'default';
        this.configure(payload);
    }

    /**
     * @description Get strategy
     * @param {String} type Strategy Key Path
     * @param {String} name Strategy Key Name
     * @param {Any} params  
     * @return {Object} This
     */
    configure(payload = {}) {
        this.default = payload.default || this.default;
        this.path = payload.path || this.path;
        this.params = !payload.params ? this.params : this.asArray(payload.params);
        return this;
    }

    /**
     * @description Get as array
     * @param {Any} payload value 
     * @return {Array} 
     */
    asArray(payload) {
        return (payload instanceof Array ? payload : [payload]);
    }

    /**
     * @description Get strategy
     * @param {String} type Strategy Key Path
     * @param {String} name Strategy Key Name
     * @param {Any} params Single param for Strategy constructor
     * @return {Object} Strategy Instance
     */
    get(payload = {}) {
        try {
            payload = typeof (payload) === 'string' ? { name: payload } : payload;
            const type = payload.type || this.default;
            const path = payload.path || this.path;
            const name = payload.name || 'Default';
            const params = !payload.params ? this.params : this.asArray(payload.params);
            this.ctrl[type] = this.ctrl[type] || {};

            if (!this.ctrl[type][name]) {
                const Stg = name.charAt(0).toUpperCase() + name.slice(1);
                const Imp = require(path + '/' + type + '/' + Stg);
                const Cls = Imp[Stg] || Imp;

                this.ctrl[type][name] = new Cls(...params);
                //this.ctrl[type][name] = new (Function.prototype.bind.apply(Cls, params));
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