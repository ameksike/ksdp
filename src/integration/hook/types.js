/**
 * @template [T=object]
 * @typedef {{[name:String]:T}} TList 
 **/

/**
 * @typedef {Object} TSubscription
 * @property {*} [data]
 * @property {*} [value]
 * @property {String} event
 * @property {String} [param]
 * @property {String} [notifier]
 * @property {String|String[]} [subscriber]
 * @property {String} [expression]
 * @property {String} [processor]
 * @property {String} [group]
 * @property {Number} [owner]
 * @property {Number} [status]
 * @property {Number|String} [id]
 * @property {Date} [date]
 * @property {Function} [onPreTrigger] - formater action to run before process the event but after the subscriber format action
 * @property {Function} [onPosTrigger] - formater action to run after process the event action
 **/

/**
 * @typedef {Object} TEvent
 * @property {String|Number} [id]
 * @property {String} event
 * @property {String} [description]
 * @property {String} [payload]
 * @property {String} [group]
 * @property {String} [status]
 */

/**
 * @typedef {Object} TEmission
 * @property {String} [subscriber]
 * @property {String} [event]
 * @property {Object} [data]
 * @property {Number|Date} [date]
 * @property {TSubscription} [target]
 */

/**
 * @typedef {import('./index')} THook 
 */

module.exports = {};