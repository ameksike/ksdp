
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

    it("add a new coding", (done) => {
        class Hex {
            encode(data) {
                return data + '...Hex';
            }
        }
        const obj = new target();
        expect(obj).toBeInstanceOf(Object);
        expect(obj.encode("I-I", "Hex")).toBe(undefined);

        obj.strategy.set({ name: "Hex", target: new Hex() });
        obj.strategy.set(new Hex(), "Hex2");
        obj.strategy.set(Hex, "Hex3");

        expect(obj.encode("I-I", "Hex")).toBe("I-I...Hex");
        expect(obj.encode("I-I", "Hex2")).toBe("I-I...Hex");
        expect(obj.encode("I-I", "Hex3")).toBe("I-I...Hex");
        done();
    });
});