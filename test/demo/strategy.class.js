const KsDp = require('../..');

class Algorism {
    constructor() {
        this.strategy = new KsDp.behavioral.Strategy({ 
            path: __dirname, 
            default: 'encode' 
        });
    }

    encode(data, type = 'Md5') {
        const alg = this.strategy.get(type);
        return alg?.encode(data);
    }
}
module.exports = Algorism;