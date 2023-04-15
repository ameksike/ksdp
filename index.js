const Strategy = require('./src/behavioral/Strategy');
const Observer = require('./src/behavioral/Observer');
const Factory = require('./src/creational/Factory');
const IoC = require('./src/integration/IoC/IoC');
const KsProxy = require('./src/structural/Proxy');

module.exports = {
    creational: { Factory },
    behavioral: { Strategy, Observer },
    integration: { IoC },
    structural: { Proxy: KsProxy }
}