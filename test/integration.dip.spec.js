
const KsDp = require('..');
const Md5 = require('./demo/encode/Md5');
let target = null;

describe('DI Simple', () => {

    beforeAll(async () => {
        target = require("./demo/dip.simple");
    });

    it("valid coding", (done) => {
        const obj = new target();
        const driver = new Md5();
        obj.setDependencies({ driver });

        expect(obj).toBeInstanceOf(Object);
        expect(obj.encode("I-I")).toBe("I-I...MD5");
        done();
    });

    it("valid coding without extends", (done) => {
        const { General } = require("./demo/dip.without.extends");
        KsDp.inherit.imitate(General, KsDp.integration.Dip);
        const obj = new General();
        const driver = new Md5();
        obj.setDependencies({ driver });

        expect(obj).toBeInstanceOf(Object);
        expect(obj.encode("I-I")).toBe("I-I...MD5");
        done();
    });

    it("valid coding with explicit imitations", (done) => {
        const { GeneralImitated } = require("./demo/dip.without.extends");
        const obj = new GeneralImitated();
        const driver = new Md5();
        obj.setDependencies({ driver });

        expect(obj).toBeInstanceOf(Object);
        expect(obj.encode("I-I")).toBe("I-I...MD5");
        done();
    });
});