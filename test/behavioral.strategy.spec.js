let target = null;

describe('Strategy', () => {
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
        class Tux {
            encode(data) {
                return data + '...Tux';
            }
        }
        const obj = new target();
        expect(obj).toBeInstanceOf(Object);
        expect(obj.encode("I-I", "Hex")).toBe(undefined);

        obj.strategy.set({ name: "Hex", target: { cls: new Hex() } });
        obj.strategy.set(new Hex(), "Hex_OBJ");
        obj.strategy.set(Hex, "Hex_CLS");
        obj.strategy.set(Tux);
        obj.strategy.set(new Hex());

        expect(obj.encode("I-I", "Hex")).toBe("I-I...Hex");
        expect(obj.encode("I-I", "Hex_OBJ")).toBe("I-I...Hex");
        expect(obj.encode("I-I", "Hex_CLS")).toBe("I-I...Hex");
        expect(obj.encode("I-I", "Tux")).toBe("I-I...Tux");
        expect(obj.encode("I-I")).toBe("I-I...Hex");
        done();
    });
});