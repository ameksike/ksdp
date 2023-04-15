
const KsDp = require('../');
let target = null;

describe('Proxy simple', () => {

    beforeAll(async () => {
        target = require("./demo/simple.proxy");
    });

    it("should a valid values", (done) => {
        const obj = new target();
        obj.type = "a";
        obj.mode = (name, mode) => `${name} - ${mode}`.toUpperCase();

        expect(obj).toBeInstanceOf(Object);
        expect(obj.mode("a", "b")).toBe("A - B");
        expect(obj.type).toBe("A");
        done();
    });
});