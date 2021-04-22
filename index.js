const Strategy = require('./behavioral/Strategy');
const IoC = require('./integration/IoC');

module.exports = {
    creational: {},
    behavioral: { Strategy },
    integration: { IoC }
}