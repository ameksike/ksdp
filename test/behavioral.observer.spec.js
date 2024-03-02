
const KsDp = require('../');

describe('Observer', () => {

    it('configure', () => {
        const target = new KsDp.behavioral.Observer();
        target
            .configure({
                evs: {
                    "default": {
                        "onread": [
                            {
                                "name": "itm-6"
                            }
                        ]
                    },
                    "local": {
                        "onread": [
                            {
                                "name": "itm-1"
                            },
                            {
                                "name": "itm-3"
                            },
                            {
                                "name": "itm-4"
                            }
                        ],
                        "onwrite": [
                            {
                                "name": "itm-2"
                            }
                        ]
                    },
                    "global": {
                        "onread": [
                            {
                                "name": "itm-5"
                            }
                        ]
                    }
                }
            });

        target.add({ name: "itm-7" }, "onread", "local")
        expect(target.count("onread", "local")).toBe(4);
        expect(target.listeners("onread", "local")).toBeInstanceOf(Array);
        expect(target.evs.default.onread.length).toBe(1);
        expect(target.evs.default.onread[0].name).toBe("itm-6");
        expect(target.evs.global.onread.length).toBe(1);
        expect(target.evs.global.onread[0].name).toBe("itm-5");
        expect(target.evs.local.onread.length).toBe(4);
        expect(target.evs.local.onwrite.length).toBe(1);
        expect(target.evs.local.onwrite[0].name).toBe("itm-2");
        expect(target.evs.local.onread[0].name).toBe("itm-1");
        expect(target.evs.local.onread[1].name).toBe("itm-3");
        expect(target.evs.local.onread[2].name).toBe("itm-4");
        expect(target.evs.local.onread[3].name).toBe("itm-7");
    });

    it('multiple subscriptions', () => {
        const target = new KsDp.behavioral.Observer();
        target
            .subscribe([
                { name: "itm-1" },
                { name: "itm-3" },
                { name: "itm-4" },
            ], "onread", "local")
            .add({ name: "itm-2" }, "onwrite", "local")
            .add({ name: "itm-5" }, "onread", "global")
            .add({ name: "itm-6" }, "onread")
            .add({ name: "itm-7" });

        expect(target.evs.default.onread.length).toBe(1);
        expect(target.evs.default.onread[0].name).toBe("itm-6");
        expect(target.evs.global.onread.length).toBe(1);
        expect(target.evs.global.onread[0].name).toBe("itm-5");
        expect(target.evs.local.onread.length).toBe(3);
        expect(target.evs.local.onwrite.length).toBe(1);
        expect(target.evs.local.onwrite[0].name).toBe("itm-2");
        expect(target.evs.local.onread[0].name).toBe("itm-1");
        expect(target.evs.local.onread[1].name).toBe("itm-3");
        expect(target.evs.local.onread[2].name).toBe("itm-4");
    });

    it('add', () => {
        const target = new KsDp.behavioral.Observer();
        target
            .add({ name: "itm-1" }, "onread", "local")
            .add({ name: "itm-2" }, "onwrite", "local")
            .add({ name: "itm-3" }, "onread", "local")
            .add({ name: "itm-4" }, "onread", "local")
            .add({ name: "itm-5" }, "onread", "global")
            .add({ name: "itm-6" }, "onread")
            .add({ name: "itm-7" });

        expect(target.evs.default.onread.length).toBe(1);
        expect(target.evs.default.onread[0].name).toBe("itm-6");
        expect(target.evs.global.onread.length).toBe(1);
        expect(target.evs.global.onread[0].name).toBe("itm-5");
        expect(target.evs.local.onread.length).toBe(3);
        expect(target.evs.local.onwrite.length).toBe(1);
        expect(target.evs.local.onwrite[0].name).toBe("itm-2");
        expect(target.evs.local.onread[0].name).toBe("itm-1");
        expect(target.evs.local.onread[1].name).toBe("itm-3");
        expect(target.evs.local.onread[2].name).toBe("itm-4");
    });

    it('set', () => {
        const target = new KsDp.behavioral.Observer();
        target
            .add({ name: "itm-1" }, "onread", "local")
            .add({ name: "itm-2" }, "onwrite", "local")
            .add({ name: "itm-3" }, "onread", "local")
            .add({ name: "itm-4" }, "onread", "local")
            .add({ name: "itm-5" }, "onread", "global")
            .add({ name: "itm-6" }, "onread")
            .add({ name: "itm-7" });

        expect(target.evs.default.onread.length).toBe(1);
        expect(target.evs.default.onread[0].name).toBe("itm-6");
        expect(target.evs.global.onread.length).toBe(1);
        expect(target.evs.global.onread[0].name).toBe("itm-5");
        expect(target.evs.local.onread.length).toBe(3);
        expect(target.evs.local.onwrite.length).toBe(1);
        expect(target.evs.local.onwrite[0].name).toBe("itm-2");
        expect(target.evs.local.onread[0].name).toBe("itm-1");
        expect(target.evs.local.onread[1].name).toBe("itm-3");
        expect(target.evs.local.onread[2].name).toBe("itm-4");

        let out2 = { index: 1 };
        target.add({ name: "itm-1-1-1", extra: 111 }, "onread", "local", out2);
        expect(out2.scope).toBe("local");
        expect(out2.event).toBe("onread");
        expect(target.evs.local.onread[1].name).toBe("itm-1-1-1");
        expect(target.evs.local.onread[1].extra).toBe(111);

    });

    it('del', () => {
        const target = new KsDp.behavioral.Observer();
        target
            .add({ name: "itm-1" }, "onread", "local")
            .add({ name: "itm-2" }, "onwrite", "local")
            .add({ name: "itm-7" }, "onwrite", "local")
            .add({ name: "itm-3" }, "onread", "local")
            .add({ name: "itm-4" }, "onread", "local")
            .add({ name: "itm-8" }, "onread", "local")
            .add({ name: "itm-5" }, "onread", "global")
            .add({ name: "itm-6" }, "onread", "global");

        let out1 = {};
        target.del("onread", "global", out1);
        expect(out1.rows.length).toBe(2);
        expect(out1.rows[0].name).toBe("itm-5");
        expect(out1.rows[1].name).toBe("itm-6");
        expect(out1.event).toBe("onread");
        expect(out1.scope).toBe("global");
        expect(target.evs.global.onread).toBe(undefined);

        let out2 = { index: 0 };
        target.del("onwrite", "local", out2);
        expect(out2.rows.length).toBe(1);
        expect(out2.rows[0].name).toBe("itm-2");
        expect(target.evs.local.onwrite.length).toBe(1);
        expect(target.evs.local.onwrite[0].name).toBe("itm-7");

        let out3 = { index: 1, count: 2 };
        target.del("onread", "local", out3);
        expect(out3.rows.length).toBe(2);
        expect(out3.rows[0].name).toBe("itm-3");
        expect(out3.rows[1].name).toBe("itm-4");
        expect(target.evs.local.onread.length).toBe(2);
        expect(target.evs.local.onread[0].name).toBe("itm-1");
        expect(target.evs.local.onread[1].name).toBe("itm-8");
    });

    it('emit', () => {
        const target = new KsDp.behavioral.Observer();
        const state = { value1: 0, value2: 10, value3: 0 };

        target.add({
            onread: (val) => {
                state.value1 += val;
            }
        }, "onread");
        target.add({
            onread: (val) => {
                state.value1 -= val - 1;
            }
        }, "onread");
        target.add({
            on(val) {
                state.value3 = val;
            }
        }, "onread");
        target.add((val) => {
            state.value2 -= val;
        }, "onwrite");

        target.emit("onread", "default", [3]);
        expect(state.value1).toBe(1);
        expect(state.value2).toBe(10);
        expect(state.value3).toBe(3);
        target.emit("onwrite", "default", [5]);
        expect(state.value2).toBe(5);
    });


    it('emit with multi subscriptions', () => {
        let counter = 0;
        const target = new KsDp.behavioral.Observer();
        const state = { value1: 0, value2: 10, value3: 0 };
        target.add([
            (val) => {
                counter++;
                state.value1 += val;
            },
            {
                onread: (val) => {
                    counter++;
                    state.value1 -= val - 1;
                }
            },
            {
                on(val) {
                    counter++;
                    state.value3 = val;
                }
            }
        ], "onread");

        target.add((val) => {
            state.value2 -= val;
        }, "onwrite");

        target.emit("onread", "default", [3]);
        expect(state.value1).toBe(1);
        expect(state.value2).toBe(10);
        expect(state.value3).toBe(3);
        expect(counter).toBe(3);
        target.emit("onwrite", "default", [5]);
        expect(state.value2).toBe(5);
    });
});