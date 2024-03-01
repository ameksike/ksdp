
const KsDp = require('../');
const target = new KsDp.behavioral.Event();

describe('Event class', () => {

    it('set default', () => {
        target.emit("onread", { value: 1 });
        
        let data = target.get("onread");

        target.set({
            onread(drv, data) {
                expect(drv.constructor.name).toBe("Event");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
            }
        });

        target.set({
            on(drv, data) {
                expect(drv.constructor.name).toBe("Event");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
            }
        });
        
        target.set((drv, data) => {
            expect(drv.constructor.name).toBe("Event");
            expect(data).toBeInstanceOf(Object);
            expect(data.value !== undefined).toBe(true);
        });

        target.emit("default", { value: 5 });

        expect(data[0].value).toBe(1);
    });

    it('set event', () => {
        target.emit("onread", { value: 1 });

        let data = target.get("onread");

        target.set({
            onread(drv, data) {
                expect(drv.constructor.name).toBe("Event");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
            }
        }, "onread");

        target.set({
            on(drv, data) {
                expect(drv.constructor.name).toBe("Event");
                expect(data).toBeInstanceOf(Object);
                expect(data.value !== undefined).toBe(true);
            }
        }, "onread");

        target.set((drv, data) => {
            expect(drv.constructor.name).toBe("Event");
            expect(data).toBeInstanceOf(Object);
            expect(data.value !== undefined).toBe(true);
        }, "onread");

        target.emit("onread", { value: 5 });

        expect(data[0].value).toBe(1);
    });

});