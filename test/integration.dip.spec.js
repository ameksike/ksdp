
const KsDp = require('..');
const Md5 = require('./demo/encode/Md5');
let target = null;

describe('DI Simple', () => {

    beforeAll(async () => {
        target = require("./demo/dip.simple");
    });

    it("should a valid coding", (done) => {
        const obj = new target();
        const driver = new Md5();
        obj.setDependencies({ driver });

        expect(obj).toBeInstanceOf(Object);
        expect(obj.encode("I-I")).toBe("I-I...MD5");
        done();
    });
});