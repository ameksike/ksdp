
const KsDp = require('..');
const cmd = new KsDp.behavioral.Command();
const obj = require("./demo/command.obj");

describe('Strategy', () => {

    it('correct run action', () => {
        function fun(a, b) {
            return a && (a + (this.sep || "-") + b);
        }
        function fun2(a, b) {
            throw new Error("faild");
        }

        expect(cmd.run("con.den.get", ["HOLA"], obj).result).toBe("HOLA_3");
        expect(cmd.run("get", ["HOLA"], obj).result).toBe("HOLA_1");
        expect(cmd.run(fun, ["HO", "LA"], { sep: "_" }).result).toBe("HO_LA");
        expect(cmd.run(fun, ["HO", "LA"]).result).toBe("HO-LA");
        expect(cmd.run(fun)).toBeInstanceOf(Object);
        expect(cmd.run(fun).result).toBe(undefined);
        expect(cmd.run(fun2).result).toBe(undefined);
        expect(cmd.run(fun2).error).toBeInstanceOf(Object);
        expect(cmd.run(() => "HOLA").result).toBe("HOLA");
    });

    it('wrong run action', () => {
        expect(cmd.run("con.den2.get", ["HOLA"], obj).result).toBe(undefined);
        expect(cmd.run("con.den2.get", ["HOLA"], obj).error).toBeInstanceOf(Object);
        expect(cmd.run("get", ["HOLA"]).result).toBe(undefined);
        expect(cmd.run(undefined, ["HO", "LA"], {}).result).toBe(undefined);
        expect(cmd.run().result).toBe(undefined);
    });
});