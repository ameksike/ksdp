let target = null;

describe('Proxy simple', () => {

    beforeAll(async () => {
        target = require("./demo/proxy.simple");
    });

    it("valid values", (done) => {
        const obj = new target();
        obj.type = "a";
        obj.mode = (name, mode) => `${name} - ${mode}`.toUpperCase();

        expect(obj).toBeInstanceOf(Object);
        expect(obj.mode("a", "b")).toBe("A - B");
        expect(obj.type).toBe("A");
        done();
    });
});


describe('Proxy with Strategy', () => {

    beforeAll(async () => {
        target = require("./demo/proxy.strategy");
    });

    it("valid base64 encode", () => {
        const objBase64 = new target({ type: "Base64", scheme: "encode" });
        const res = objBase64.encode("I-I");
        expect(objBase64).toBeInstanceOf(Object);
        expect(res).toBe("I-I...BASE64");
    });

    it("valid md5 encode", () => {
        const objBase64 = new target({ type: "Md5", scheme: "encode" });
        const res = objBase64.encode("I-I");
        expect(objBase64).toBeInstanceOf(Object);
        expect(res).toBe("I-I...MD5");
    });

    it("valid multiple coding", () => {
        const objCryp = new target({ type: "Md5", scheme: "encode" });

        console.log("objCryp 1", objCryp);

        expect(objCryp).toBeInstanceOf(Object);

        objCryp.type = "Md5";
        const res1 = objCryp.encode("I-I");
        expect(res1).toBe("I-I...MD5");

        objCryp.type = "BASE64";
        const res2 = objCryp.encode("I-I");
        expect(res2).toBe("I-I...BASE64");
    });

    it("valid implicit múltiple coding", (done) => {
        target = require("./demo/proxy.strategy");
        const objCryp = new target({ type: "Md5", scheme: "encode" });

        console.log("objCryp 2", objCryp);

        expect(objCryp).toBeInstanceOf(Object);

        objCryp.type = "Md5";
        const res1 = objCryp.encode("I-I");
        expect(res1).toBe("I-I...MD5");

        objCryp.type = "BASE64";
        const res2 = objCryp.encode("I-I");
        expect(res2).toBe("I-I...BASE64");

        done();
    });
});