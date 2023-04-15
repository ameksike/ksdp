
const KsDp = require('../');
const factory = new KsDp.creational.Factory();

describe('Factory from creational group', () => {
    it("valid namespace resolution", (done) => {
        const target0 = factory.namespace(KsDp);
        const target1 = factory.namespace(KsDp, 'behavioral');
        const target2 = factory.namespace(KsDp, 'behavioral.Observer');
        expect(target0).toBeInstanceOf(Object);
        expect(target1).toBeInstanceOf(Object);
        expect(target2).toBeInstanceOf(Function);
        done();
    });
});