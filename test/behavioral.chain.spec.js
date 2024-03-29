const KsDp = require('..');

describe('Chain of Responsibility Async', () => {

    it("Simple with operation counting", async (done) => {
        let params = [{ name: "demo" }, 123];
        let chain = new KsDp.behavioral.ChainAsync();
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
        expect(res.ops).toBe(3);
        done();
    });


    it("simple with stop option", async (done) => {
        let params = [{ name: "demo" }, 123];
        let chain = new KsDp.behavioral.ChainAsync();
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
        done();
    });
});