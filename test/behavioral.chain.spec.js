const KsDp = require('..');
const chain = new KsDp.behavioral.ChainAsync();

describe('Chain of Responsibility Async', () => {

    it("Simple with operation counting", async (done) => {
        let params = [{ name: "demo" }, 123];
        await chain.add([
            {
                action(obj, age, next) {
                    expect(obj.name).toBe(params[0].name);
                    expect(age).toBe(params[1]);
                    obj.name += "-";
                    next();
                }
            },
            {
                action(obj, age, next) {
                    expect(obj.name).toBe("demo-");
                    expect(age).toBe(params[1]);
                    next();
                }
            }
        ])
        let res = await chain.run(params);
        expect(res).toBeInstanceOf(Object);
        expect(res.ops).toBe(2);
    });


    it("simple ", async (done) => {
        let params = [{ name: "demo" }, 123];
        await chain.add([
            {
                action(obj, age, next) {
                    expect(obj.name).toBe(params[0].name);
                    expect(age).toBe(params[1]);
                    obj.name += "-";
                    next({ stop: true, data: obj });
                }
            },
            {
                action(obj, age, next) {
                    expect(obj.name).toBe("demo-");
                    expect(age).toBe(params[1]);
                    next();
                }
            }
        ])
        let res = await chain.run(params);
        expect(res).toBeInstanceOf(Object);
        expect(res.ops).toBe(1);
        expect(res.stop).toBe(true);
        expect(res.data.name).toBe(params[0].name);
    });
});