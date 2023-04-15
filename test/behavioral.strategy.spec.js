
const KsDp = require('..');
let target = null;

describe('Strategy class', () => {

    beforeAll(async () => {
        target = require("./demo/strategy.class");
    });

    it("valid multiple coding", (done) => {
        const obj = new target();

        expect(obj).toBeInstanceOf(Object);
        expect(obj.encode("I-I", "Base64")).toBe("I-I...BASE64");
        expect(obj.encode("I-I", "Md5")).toBe("I-I...MD5");
        done();
    });
});