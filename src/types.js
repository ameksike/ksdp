/**
 * @template [T=object]
 * @typedef {{[name:String]:T}} TList 
 **/

/**
 * @typedef {Object} TOptionIoC
 * @property {String} [name] DEFAULT['DefaultService'] Alias for it lib 
 * @property {String} [namespace]   
 * @property {String} [type] DEFAULT['instance'] VALUES['module', 'type', 'instance', 'action', 'raw', 'alias', 'lib', 'package']
 * @property {String} [module] DEFAULT['app']  
 * @property {String} [dependency] DEFAULT[null]  
 * @property {Object} [options] DEFAULT[null] only for type ['instance', 'action', 'raw']    
 * @property {String} [source] DEFAULT['default'] only for type 'alias'   
 * @property {Object} [propertys] DEFAULT[null] only for type 'action'  
 * @property {String} [params] [OPTIONAL] DEFAULT[null] only for opt.type 'action'  
 * @property {String} [mode] DEFAULT[singleton] 
 * @property {String} [path] DEFAULT[type] Search path
 * @property {String} [file]    
 * @property {String} [id] Data source 
 * @property {TList} [src]   
 * @property {Error} [error]   
 * @property {any} [data] 
 */


/**
 * @typedef {Object} TLoaderOption
 * @property {String} [type] module type cjs|mjs
 * @property {Boolean} [auto] export only the default 
 * @property {Boolean} [fill] include the default property as the original definition
 * @property {Boolean} [force] force to clean the cache before load the module
 * @property {Boolean} [strict] additional validation to check empty object
 * @property {Number} [retry] retry loading module on error
 * @property {Object} [default] default value to return if there is an error
 * @property {Object} [error] error description if there is an error 
 * @property {Object} [mode] factory mode
 */

/**
 * @typedef {Object} TDelegate
 * @property {String|Function} action
 * @property {Array<any>} params
 * @property {any} scope
 * @property {String|Number} index
 */
module.exports = {};
