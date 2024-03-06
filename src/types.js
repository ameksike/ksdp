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

module.exports = {};
