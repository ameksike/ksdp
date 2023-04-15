const Strategy = require('./src/behavioral/Strategy');
const Observer = require('./src/behavioral/Observer');
const Factory = require('./src/creational/Factory');
const IoC = require('./src/integration/IoC/IoC');
const Dip = require('./src/integration/Dip');
const KsProxy = require('./src/structural/Proxy');
const imitate = require('./src/inherit/imitate');

module.exports = {
    inherit: { imitate },
    creational: { Factory },
    behavioral: { Strategy, Observer },
    integration: { IoC, Dip },
    structural: { Proxy: KsProxy }
}