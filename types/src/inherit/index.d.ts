import imitate = require("./imitate");
import namespace = require("./namespace");
/**
 * @description Identify if target is a Function or a Class definition
 * @param {Object|Function} target
 * @returns {Boolean}
 */
export function isClass(target: any | Function): boolean;
/**
 * @description Get class name from target
 * @param {Object|Function} target
 * @returns {String} name
 */
export function className(target: any | Function): string;
export { imitate, namespace, namespace as ns };
