
const KsDp = require('../');

describe('Inherit by Imitation', () => {

    it("Class to Class", (done) => {
        class ClsA {
            constructor(value) {
                this.value = value + "_ClsA";
            }
            method() {
                return "ClsA:method";
            }
            method1() {
                return "ClsA:method1";
            }
        }

        class ClsB {
            method() {
                return "ClsB:method";
            }
            method2() {
                return "ClsB:method2";
            }
        }

        KsDp.inherit.imitate(ClsA, ClsB);
        const obj = new ClsA("obj")

        expect(obj).toBeInstanceOf(Object);
        expect(obj.value).toBe("obj_ClsA");
        expect(obj.method()).toBe("ClsA:method");
        expect(obj.method1()).toBe("ClsA:method1");
        expect(obj.method2()).toBe("ClsB:method2");
        done();
    });

    
    it("Object to Class", (done) => {
        class ClsA {
            constructor() {
                KsDp.inherit.imitate(this, ClsB);
            }
            method() {
                return "ClsA:method";
            }
            method1() {
                return "ClsA:method1";
            }
        }

        class ClsB {
            method() {
                return "ClsB:method";
            }
            method2() {
                return "ClsB:method2";
            }
        }

        KsDp.inherit.imitate(ClsA, ClsB);
        const obj = new ClsA("obj")

        expect(obj).toBeInstanceOf(Object);
        expect(obj.method()).toBe("ClsB:method");
        expect(obj.method1()).toBe("ClsA:method1");
        expect(obj.method2()).toBe("ClsB:method2");
        done();
    });

    it("Class to Object", (done) => {
        class ClsA {
            method() {
                return "ClsA:method";
            }
            method1() {
                return "ClsA:method1";
            }
        }

        const objB = {
            method() {
                return "ClsB:method";
            },
            method2() {
                return "ClsB:method2";
            }
        }

        KsDp.inherit.imitate(ClsA, objB);
        const obj = new ClsA("obj")

        expect(obj).toBeInstanceOf(Object);
        expect(obj.method()).toBe("ClsB:method");
        expect(obj.method1()).toBe("ClsA:method1");
        expect(obj.method2()).toBe("ClsB:method2");
        done();
    });
});