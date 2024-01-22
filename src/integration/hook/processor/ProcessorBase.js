/**
 * @typedef {import('../types').TList} TList 
 */
class ProcessorBase {
    /**
     * @description Evaluate an expression
     * @param {String} expression 
     * @param {TList} [data=null] 
     * @param {Object} [metadata=null] 
     * @param {Error} [metadata.error] 
     * @param {String} [metadata.expression] 
     * @param {TList} [metadata.data] 
     * @returns {Number|String|Boolean} result
     */
    run(expression, data = null, metadata = null) {
        return expression;
    }
}
module.exports = ProcessorBase;