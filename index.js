const Strategy = require('./src/behavioral/Strategy');
const Observer = require('./src/behavioral/Observer');
const IoC = require('./src/integration/IoC');

module.exports = {
    creational: {},
    behavioral: { Strategy, Observer },
    integration: { IoC }
}