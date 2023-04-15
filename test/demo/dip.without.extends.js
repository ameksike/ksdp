const KsDp = require('../..');

class GeneralImitated {
    constructor() {
        KsDp.inherit.imitate(this, KsDp.integration.Dip);
    }

    encode(data) {
        this.checkDependencies(["driver"]);
        return this.driver.encode(data);
    }
}


class General {
    encode(data) {
        this.checkDependencies(["driver"]);
        return this.driver.encode(data);
    }
}

module.exports = {
    GeneralImitated,
    General
};