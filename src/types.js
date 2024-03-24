/**
 * @typedef {Object} TOptionIoC
 * @property {String} [name] DEFAULT['DefaultService']  
 * @property {String} [namespace]   
 * @property {String} [type] DEFAULT['instance'] VALUES['module', 'type', 'instance', 'action', 'raw', 'alias', 'lib', 'package']
 * @property {String} [module] DEFAULT['app']  
 * @property {String} [dependency] DEFAULT[null]  
 * @property {Object} [options] DEFAULT[null] only for type ['instance', 'action', 'raw']    
 * @property {String} [source] DEFAULT['default'] only for type 'alias'   
 * @property {Object} [propertys] DEFAULT[null] only for type 'action'  
 * @property {String} [params] [OPTIONAL] DEFAULT[null] only for opt.type 'action'  
 * @property {String} [path] DEFAULT[type]   
 * @property {String} [file]    
 * @property {String} [id]   
 * @property {any} [data] 
 */

/**
 * @typedef {Object} TLoaderOption
 * @property {String} [type] - module type cjs|mjs
 * @property {Boolean} [auto] - export only the default 
 * @property {Boolean} [fill] - include the default property as the original definition
 * @property {Boolean} [force] - force to clean the cache before load the module
 * @property {Boolean} [strict] - additional validation to check empty object
 * @property {Number} [retry] - retry loading module on error
 * @property {Object} [default] - default value to return if there is an error
 * @property {Object} [error] - error description if there is an error 
 */

/**
 * @typedef {Object} TDelegate
 * @property {Object} action
 * @property {Array<any>} params
 * @property {Object} scope
 * @property {String|Number} index
 */
module.exports = {};
