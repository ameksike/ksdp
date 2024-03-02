
const KsDp = require('../');

describe('Emitter', () => {

    it('set default', () => {
        const target = new KsDp.behavioral.Emitter();
        target.emit("default", { value: 1 });

        let data = target.get("default");

        target.set({
            onread(drv, data) {
                expect(drv.constructor.name).toBe("Emitter");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
            }
        });

        target.subscribe({
            on(drv, data) {
                expect(drv.constructor.name).toBe("Emitter");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
            }
        });

        target.add((drv, data) => {
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
                default(drv, data) {
                    counter++;
                    expect(drv.constructor.name).toBe("Emitter");
                    expect(data).toBeInstanceOf(Object);
                    expect(data.value !== undefined).toBe(true);
                }
            },
            {
                on(drv, data) {
                    counter++;
                    expect(drv.constructor.name).toBe("Emitter");
                    expect(data).toBeInstanceOf(Object);
                    expect(data.value !== undefined).toBe(true);
                }
            },
            (drv, data) => {
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
                onread(drv, data) {
                    expect(drv.constructor.name).toBe("Emitter");
                    expect(data).toBeInstanceOf(Object);
                    expect(data.value !== undefined).toBe(true);
                    counter++;
                }
            },
            {
                on(drv, data) {
                    expect(drv.constructor.name).toBe("Emitter");
                    expect(data).toBeInstanceOf(Object);
                    expect(data.value !== undefined).toBe(true);
                    counter++;
                }
            },
            (drv, data) => {
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
        const list1 = {
            onread(drv, data) {
                expect(drv.constructor.name).toBe("Emitter");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
                counter++;
            }
        };
        const list2 = {
            on(drv, data) {
                expect(drv.constructor.name).toBe("Emitter");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
                counter++;
                data.value = 2;
            }
        }
        const list3 = (drv, data) => {
            expect(drv.constructor.name).toBe("Emitter");
            expect(data).toBeInstanceOf(Object);
            expect(data.value !== undefined).toBe(true);
            counter++;
        };
        target.subscribe([list1, list2, list3], "onread");
        target.unsubscribe([list1, list3], "onread");

        target.emit("onread", { value: 5 });

        expect(data[0].value).toBe(1);
        expect(target.get("onread")[0].value).toBe(2);
        expect(counter).toBe(1);
        expect(target.count("onread")).toBe(1);
        
    });

});