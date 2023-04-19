const Strategy = require('./src/behavioral/Strategy');
const Observer = require('./src/behavioral/Observer');
const Command = require('./src/behavioral/Command');
const Factory = require('./src/creational/Factory');
const IoC = require('./src/integration/IoC/IoC');
const Dip = require('./src/integration/Dip');
const KsProxy = require('./src/structural/Proxy');
const inherit = require('./src/inherit');


module.exports = {
    inherit,
    creational: { Factory },
    behavioral: { Strategy, Observer, Command },
    integration: { IoC, Dip },
    structural: { Proxy: KsProxy }
}