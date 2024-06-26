
const KsDp = require('../');

describe('Emitter', () => {

    it('set default', () => {
        const target = new KsDp.behavioral.Emitter();
        target.emit("default", { value: 1 });

        let data = target.get("default");

        target.set({
            default(data, drv) {
                expect(drv.constructor.name).toBe("Emitter");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
            }
        });

        target.subscribe({
            on(data, drv) {
                expect(drv.constructor.name).toBe("Emitter");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
            }
        });

        target.add((data, drv) => {
            expect(drv.constructor.name).toBe("Emitter");
            expect(data).toBeInstanceOf(Object);
            expect(data.value !== undefined).toBe(true);
        });

        target.emit("default", { value: 5 });

        expect(target.count()).toBe(3);
        expect(data[0].value).toBe(1);
    });


    it('multiple subscription', () => {
        let counter = 0;
        const target = new KsDp.behavioral.Emitter();
        target.emit("onread", { value: 1 });

        let data = target.get("onread");

        target.subscribe([
            {
                default(data, drv) {
                    counter++;
                    expect(drv.constructor.name).toBe("Emitter");
                    expect(data).toBeInstanceOf(Object);
                    expect(data.value !== undefined).toBe(true);
                }
            },
            {
                on(data, drv) {
                    counter++;
                    expect(drv.constructor.name).toBe("Emitter");
                    expect(data).toBeInstanceOf(Object);
                    expect(data.value !== undefined).toBe(true);
                }
            },
            (data, drv) => {
                counter++;
                expect(drv.constructor.name).toBe("Emitter");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
            }
        ]);

        target.emit("default", { value: 5 });

        expect(data[0].value).toBe(1);
        expect(target.count()).toBe(3);
        expect(counter).toBe(3);
    });


    it('set event', () => {
        const target = new KsDp.behavioral.Emitter();
        target.emit("onread", { value: 1 });

        let data = target.get("onread");
        let counter = 0;

        target.set(
            [{
                onread(data, drv) {
                    expect(drv.constructor.name).toBe("Emitter");
                    expect(data).toBeInstanceOf(Object);
                    expect(data.value !== undefined).toBe(true);
                    counter++;
                }
            },
            {
                on(data, drv) {
                    expect(drv.constructor.name).toBe("Emitter");
                    expect(data).toBeInstanceOf(Object);
                    expect(data.value !== undefined).toBe(true);
                    counter++;
                }
            },
            (data, drv) => {
                expect(drv.constructor.name).toBe("Emitter");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
                counter++;
            }], "onread");

        target.emit("onread", { value: 5 });

        expect(data[0].value).toBe(1);
        expect(target.count("onread")).toBe(3);
        expect(counter).toBe(3);
    });

    it('unsubscritions', () => {
        const target = new KsDp.behavioral.Emitter();
        target.emit("onread", { value: 1 });
        let data = target.get("onread");
        let counter = 0;
        let optSub = {};
        let optUns = {};
        const list1 = {
            onread(data, drv) {
                expect(drv.constructor.name).toBe("Emitter");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
                counter++;
            }
        };
        const list2 = {
            on(data, drv) {
                expect(drv.constructor.name).toBe("Emitter");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
                counter++;
                data.value = 2;
            }
        }
        const list3 = (data, drv) => {
            expect(drv.constructor.name).toBe("Emitter");
            expect(data).toBeInstanceOf(Object);
            expect(data.value !== undefined).toBe(true);
            counter++;
        };

        target.subscribe([list1, list2, list3], "onread", optSub);
        target.unsubscribe("onread", [optSub.rows[0], optSub.rows[2]], optUns);
        target.emit("onread", { value: 5 });

        expect(optSub.event).toBe("onread");
        expect(optSub.rows.length).toBe(3);
        expect(optUns.event).toBe("onread");
        expect(optUns.rows.length).toBe(2);
        expect(data[0].value).toBe(1);
        expect(target.get("onread")[0].value).toBe(2);
        expect(counter).toBe(1);
        expect(target.count("onread")).toBe(counter);
    });

    it('unsubscritions by index', () => {
        const target = new KsDp.behavioral.Emitter();
        target.emit("onread", { value: 1 });
        let data = target.get("onread");
        let counter = 0;
        let optSub = {};
        let optUns = { index: 1, count: 2 };
        let listeners = [
            {
                onread(data, drv) {
                    expect(drv.constructor.name).toBe("Emitter");
                    expect(data).toBeInstanceOf(Object);
                    expect(data.value !== undefined).toBe(true);
                    data.value = 11;
                    counter++;
                }
            },
            {
                on(data, drv) {
                    expect(drv.constructor.name).toBe("Emitter");
                    expect(data).toBeInstanceOf(Object);
                    expect(data.value !== undefined).toBe(true);
                    counter++;
                    data.value = 2;
                }
            },
            (data, drv) => {
                expect(drv.constructor.name).toBe("Emitter");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
                counter++;
                data.value = 3;
            }
        ];

        target.subscribe(listeners, "onread", optSub);
        target.unsubscribe("onread", null, optUns);
        target.emit("onread", { value: 5 });

        expect(optSub.event).toBe("onread");
        expect(optSub.rows.length).toBe(3);
        expect(optUns.event).toBe("onread");
        expect(optUns.rows.length).toBe(2);

        expect(data[0].value).toBe(1);
        expect(target.get("onread")[0].value).toBe(11);
        expect(counter).toBe(1);
        expect(target.count("onread")).toBe(counter);
    });

    it('clean subscritions', () => {
        const target = new KsDp.behavioral.Emitter();
        target.emit("onread", { value: 1 });
        let data = target.get("onread");
        let counter = 0;

        target.subscribe([
            {
                onread(data, drv) {
                    expect(drv.constructor.name).toBe("Emitter");
                    expect(data).toBeInstanceOf(Object);
                    expect(data.value !== undefined).toBe(true);
                    counter++;
                }
            },
            {
                on(data, drv) {
                    expect(drv.constructor.name).toBe("Emitter");
                    expect(data).toBeInstanceOf(Object);
                    expect(data.value !== undefined).toBe(true);
                    counter++;
                    data.value = 2;
                }
            },
            (data, drv) => {
                expect(drv.constructor.name).toBe("Emitter");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
                counter++;
            }
        ], "onread");

        expect(target.count("onread")).toBe(3);
        target.unsubscribe("onread");
        target.emit("onread", { value: 5 });
        expect(data[0].value).toBe(1);
        expect(counter).toBe(0);
        expect(target.count("onread")).toBe(counter);
    });

    it('prepend listener mode', () => {
        const target = new KsDp.behavioral.Emitter();
        let counter = 0;

        target.subscribe([
            {
                onread(data, drv) {
                    expect(drv.constructor.name).toBe("Emitter");
                    expect(data).toBeInstanceOf(Object);
                    expect(data.value !== undefined).toBe(true);
                    data.value = 1;
                    counter++;
                }
            },
            {
                on(data, drv) {
                    expect(drv.constructor.name).toBe("Emitter");
                    expect(data).toBeInstanceOf(Object);
                    expect(data.value !== undefined).toBe(true);
                    data.value = 2;
                    counter++;
                }
            },
            (data, drv) => {
                expect(drv.constructor.name).toBe("Emitter");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
                data.value = 3;
                counter++;
            }
        ], "onread");

        target.subscribe((data, drv) => {
            expect(drv.constructor.name).toBe("Emitter");
            expect(data).toBeInstanceOf(Object);
            expect(data.value !== undefined).toBe(true);
            data.value = 4;
            counter++;
        }, "onread", { mode: "prepend" });

        target.emit("onread", { value: 5 });

        expect(target.get("onread")[0].value).toBe(3);
        expect(target.count("onread")).toBe(counter);
        expect(counter).toBe(4);
    });
    
    it('once listener mode', () => {
        const target = new KsDp.behavioral.Emitter();
        let counterOnce = 0;
        let counterPre = 0;

        target.subscribe((data, drv) => {
            expect(drv.constructor.name).toBe("Emitter");
            expect(data).toBeInstanceOf(Object);
            expect(data.value !== undefined).toBe(true);
            data.value += 1;
            counterOnce++;
        }, "onread", { mode: "once" });

        target.subscribe((data, drv) => {
            expect(drv.constructor.name).toBe("Emitter");
            expect(data).toBeInstanceOf(Object);
            expect(data.value !== undefined).toBe(true);
            data.value += 2;
            counterPre++;
        }, "onread", { mode: "prepend" });

        target.emit("onread", { value: 5 });
        target.emit("onread", { value: 5 });
        target.emit("onread", { value: 5 });

        expect(target.get("onread")[0].value).toBe(7);
        expect(target.count("onread")).toBe(1);
        expect(counterOnce).toBe(1);
        expect(counterPre).toBe(3);
    });
});