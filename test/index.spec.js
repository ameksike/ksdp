
const KsDp = require('../');

describe('Load KsDp Lib', () => {

    beforeAll(async () => { });

    afterAll(async () => { });

    it("valid instance", (done) => {
        expect(KsDp).toBeInstanceOf(Object);
        expect(KsDp.behavioral).toBeInstanceOf(Object);
        expect(KsDp.integration).toBeInstanceOf(Object);
        expect(KsDp.integration.IoC).toBeInstanceOf(Function);
        expect(KsDp.integration.Dip).toBeInstanceOf(Function);
        expect(KsDp.creational.Factory).toBeInstanceOf(Function);
        expect(KsDp.behavioral.Observer).toBeInstanceOf(Function);
        expect(KsDp.behavioral.Command).toBeInstanceOf(Function);
        expect(KsDp.behavioral.Strategy).toBeInstanceOf(Function);
        expect(KsDp.structural.Proxy).toBeInstanceOf(Function);
        done();
    });
});