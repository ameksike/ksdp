
const KsDp = require('..');
const obj = require('./demo/command.obj');

describe('Namespace', () => {

    it('correct namespace resolution', () => {
        const result1 = KsDp.inherit.ns(obj, "con.den.ses");
        expect(result1).toBeInstanceOf(Object);
        expect(result1.l1).toBe(1);
        expect(result1.l2).toBe(2);
        const result2 = KsDp.inherit.ns(obj, "con.dea");
        expect(result2).toBe("tst");
        const result3 = KsDp.inherit.ns(obj, "con.den");
        expect(result3.get("1")).toBe("1_3");
        const result4 = KsDp.inherit.ns(obj);
        expect(result4).toBeInstanceOf(Object);
        expect(result4.con.den.get("1")).toBe("1_3");
    });

    it('wrong namespace resolution', () => {
        expect(KsDp.inherit.ns(obj, "con.den2.ses")).toBe(null);
        expect(KsDp.inherit.ns(obj, "con.den.ses2")).toBe(null);
        expect(KsDp.inherit.ns(null, "con.den.ses2")).toBe(null);
        expect(KsDp.inherit.ns("TEST", "con.den.ses2")).toBe(null);
        expect(KsDp.inherit.ns("TEST")).toBe("TEST");
        expect(KsDp.inherit.ns(12345)).toBe(12345);
        expect(KsDp.inherit.ns()).toBe(undefined);
    });

    it("valid namespace resolution", (done) => {
        const target0 = KsDp.inherit.namespace(KsDp);
        const target1 = KsDp.inherit.namespace(KsDp, 'behavioral');
        const target2 = KsDp.inherit.namespace(KsDp, 'behavioral.Observer');
        expect(target0).toBeInstanceOf(Object);
        expect(target1).toBeInstanceOf(Object);
        expect(target2).toBeInstanceOf(Function);
        done();
    });
});