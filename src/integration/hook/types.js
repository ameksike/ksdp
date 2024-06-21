/**
 * @template [T=object]
 * @typedef {{[name:String]:T}} TList 
 **/

/**
 * @typedef {Object} TSubscriber
 * @property {Object} [hook] 
 * @property {Function} [format] 
 */

/**
 * @typedef {Object} TTarget
 * @property {String|Number} [id] - A unique identifier for each hook.
 * @property {String} event - The name of the event that triggers the hook.
 * @property {String} [target] - alias for the notifier field
 * @property {String} [notifier] -  A handler that processes the event data specified in the value field. Common notifiers include "Locator" for local services, web hooks for external services, and email senders.
 * @property {String} [value] - The data used by the notifier.
 * @property {String} [param] - Defines a mapping expression to transform event parameters into those expected by the processing service, ensuring compatibility.
 * @property {String} [notifier_alt] - Provides alternative notifier if the expression fails. It is required if it is necessary to take an alternative path of action.
 * @property {String} [value_alt] - Provides alternative notifier value if the expression fails. In case it is not specified, it will take the value of the value field.
 * @property {String} [param_alt] - Provides alternative mappings if the expression fails. In case it is not specified, it will take the value of the param field.
 * @property {String} [processor] - Determines if the notifier should be executed based on the expression field. The "Native" processor evaluates JavaScript expressions.
 * @property {String} [expression] - A logical expression evaluated by the processor.
 * @property {String} [group] - A tag for grouping related hooks.
 * @property {String|Number} [status] - Indicates whether the hook is active (1) or inactive (0).
 * @property {String} [note] - Provides semantic annotations without impacting logic.
 */

/**
 * @typedef {Object} TSubscription
 * @property {*} [data]
 * @property {*} [value]
 * @property {Number|String|null} [scope] 
 * @property {Number} [mode] 
 * @property {String} [event]
 * @property {String} [param]
 * @property {String} [notifier]
 * @property {String|String[]} [subscriber]
 * @property {String} [expression]
 * @property {String} [processor]
 * @property {String} [group]
 * @property {Number} [owner]
 * @property {Number} [status]
 * @property {Number|String} [id]
 * @property {Date|Number} [date]
 * @property {TTarget} [target]
 * @property {*} [hook]
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
 * @typedef {Object} TProcessor
 * @property {String} [subscriber]
 * @property {Function} run
 */

/**
 * @typedef {Object} TResult
 * @property {Object} [error]
 * @property {String} [error.message]
 * @property {String} [error.code]
 * @property {any} [result]
 */

/**
 * @typedef {import('./index')} THook 
 */

module.exports = {};