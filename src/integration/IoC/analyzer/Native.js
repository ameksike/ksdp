/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		09/11/2019
 * @copyright  	Copyright (c) 2019-2050
 * @description Native Analizer 
 * @dependency  Factory
 * @license    	GPL
 * @version    	1.0
 **/

/**
 * @typedef {import('../../../types').TOptionIoC} TOptionIoC
 * @typedef {import('../IoC')} TIoC
 */
class Native {
    /**
     * @type {TIoC}
     */
    #ioc;

    /**
     * @param {TIoC|null} [ioc] 
     */
    constructor(ioc) {
        this.#ioc = ioc;
    }

    /**
     * @description Fill payload
     * @param {TOptionIoC|String} opt The input data.  
     * @returns {Object}
     */
    run(opt) {
        const cfg = opt instanceof Object ? opt : (this.#ioc?.opt?.src[opt] || {
            name: opt
        });
        cfg.name = cfg.name || (typeof (opt) === 'string' ? opt : 'DefaultService');
        cfg.type = cfg.type || 'instance';
        cfg.source = cfg.source || 'default';
        cfg.namespace = cfg.namespace || '';
        switch (cfg.type) {
            case 'module':
                cfg.module = cfg.module || cfg.name;
                cfg.id = cfg.id || cfg.name;
                break;

            case 'package':
            case 'lib':
                cfg.id = cfg.id || (cfg.type + ':' + cfg.name + (cfg.namespace ? '.' + cfg.namespace : ''));
                cfg.params = cfg.options || cfg.params;
                break;

            case 'dependency':
                cfg.id = cfg.id || (cfg.module + ':' + cfg.path + ':' + cfg.name);
                break;

            default:
                cfg.module = cfg.module || 'app';
                cfg.path = cfg.path || 'service';
                cfg.id = cfg.id || (cfg.module + ':' + cfg.path + ':' + cfg.name);
                break;
        }
        return cfg;
    }

}

module.exports = Native;