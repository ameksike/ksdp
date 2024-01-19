/**
 * @typedef {({[name:String]:Object} | Array)} List 
 **/

class ProcessorBase {
    /**
     * @description Evaluate an expression
     * @param {String} expression 
     * @param {List} [data=null] 
     * @param {List} [metadata=null] 
     * @returns {Number|String|Boolean} result
     */
    run(expression, data = null, metadata = null) {
        return expression;
    }
}
module.exports = ProcessorBase;