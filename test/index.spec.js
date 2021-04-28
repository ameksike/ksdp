
const KsDp = require('../');

describe('Load KsDp Lib', () => {

    beforeAll(async () => { });

    afterAll(async () => { });

    it("should a valid instance", (done) => {
        expect(KsDp).toBeInstanceOf(Object);
        expect(KsDp.behavioral).toBeInstanceOf(Object);
        expect(KsDp.integration).toBeInstanceOf(Object);
        expect(KsDp.integration.IoC).toBeInstanceOf(Function);
        expect(KsDp.creational.Factory).toBeInstanceOf(Function);
        expect(KsDp.behavioral.Observer).toBeInstanceOf(Function);
        expect(KsDp.behavioral.Strategy).toBeInstanceOf(Function);
        done();
    });
});