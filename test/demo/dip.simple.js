
const KsDp = require('../..');

class General extends KsDp.integration.Dip {
    encode(data) {
        this.checkDependencies(["driver"]);
        return this.driver.encode(data);
    }
}
module.exports = General;