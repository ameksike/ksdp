const KsDp = require('../..');

class Algorism {
    constructor() {
        this.name = "Strategy.Algorism";
        this.strategy = new KsDp.behavioral.Strategy({ 
            path: __dirname, 
            default: 'encode' 
        });
    }

    encode(data, type) {
        const alg = this.strategy.get(type);
        return alg?.encode && alg.encode(data);
    }
}
module.exports = Algorism;