const Strategy = require('./src/behavioral/Strategy');
const Observer = require('./src/behavioral/Observer');
const Factory = require('./src/creational/Factory');
const IoC = require('./src/integration/IoC/IoC');

module.exports = {
    creational: { Factory },
    behavioral: { Strategy, Observer },
    integration: { IoC }
}