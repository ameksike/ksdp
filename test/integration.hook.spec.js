
const KsDp = require('..');
let target = null;

describe('Hooks', () => {

    beforeAll(async () => {
        target = new KsDp.integration.hook.Main({
            path: __dirname + "/demo/"
        });
    });

    it("subscriptions/subscribe", async done => {
        target.subscribe({
            subscriber: "Memory",
            notifier: "Ioc",
            value: "Web",
            event: "onLoad",
            owner: 5
        });
        target.subscribe({
            subscriber: "Memory",
            notifier: "Ioc",
            value: "MysRV",
            event: "onCompleted",
            owner: 2
        });
        target.subscribe({
            subscriber: "Memory",
            notifier: "Email",
            value: "MITO",
            event: "onCompleted",
            owner: 3
        });

        const result = await target.subscriptions({ event: "onCompleted" });
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(2);
        done();
    });

    it("subscription bulk", async done => {
        /*target.subscriber.set({
            name: "MySubs",
            target: (class extends KsDp.integration.hook.subscriber.Memory { })
        });*/
        await target.subscribe([{
            subscriber: "MySubs",
            notifier: "Web1",
            value: "Web1",
            event: "onInit",
            owner: 5
        }, {
            subscriber: "MySubs",
            notifier: "Web2",
            value: "Web2",
            event: "onInit",
            owner: 3
        }, {
            subscriber: "MySubs",
            notifier: "Web3",
            value: "Web3",
            event: "onInit",
            owner: 3
        }]);
        const result = await target.subscriptions({ event: "onInit", owner: 3, subscriber: "MySubs" });
        expect(result).toBeInstanceOf(Array);
        expect(result[0].notifier).toBe("Web2");
        expect(result[1].notifier).toBe("Web3");
        expect(result.length).toBe(2);
        done();
    });

    it("subscriber lost", async done => {
        target.subscribe({
            subscriber: "Tst",
            notifier: "Web1",
            value: "Web1",
            event: "onEnd",
            owner: 5
        });
        const result = await target.subscriptions({ event: "onEnd" });
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(0);
        done();
    });

    it("subscriber add", async done => {
        // define a subscriber handler 
        class Tst {
            constructor(type) {
                this.type = type;
            }
            subscribe(payload) {
                this.payload = payload;
            }
            subscriptions(payload) {
                return [this.payload];
            }
        }
        // add a subscriber handler 
        target.subscriber.set({
            name: "Tst",
            target: {
                cls: Tst,
                params: ["tmp"]
            }
        });
        // add a subscriber
        target.subscribe({
            subscriber: "Tst",
            notifier: "Ioc",
            value: "Web1",
            event: "onEnd",
            owner: 5
        });
        // get the subscription list
        const result = await target.subscriptions({ event: "onEnd", subscriber: "Tst" });
        // compare 
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(1);
        done();
    });

    it("notifier IoC", async done => {
        // add a subscriber
        target.subscribe({
            subscriber: "Memory",
            notifier: "Ioc",
            value: "test",
            event: "onTest",
            owner: 5
        });
        // trigger an event from subscribers
        const result = target.trigger({
            subscriber: ["Memory", "Tst"],
            event: "onTest",
            data: {
                den: 111,
                des: 222
            },
            onPreTrigger: (payload) => {
                payload = payload || {};
                payload.pre = 1;
                return payload;
            },
            onPosTrigger: (payload) => {
                payload = payload || {};
                payload.pos = 1;
                return payload;
            },
            scope: null
        });
        // compare 
        expect(result).toBeInstanceOf(Object);
        expect(Object.keys(result).length).toBe(2);
        done();
    });

    it("notifier add", async done => {
        // define a subscriber handler 
        class MyNotifier {
            constructor(type) {
                this.type = type;
            }
            run(payload) {
                return {
                    from: "MyNotifier",
                    payload
                };
            }
        }
        // add a subscriber handler 
        target.notifier.set({
            name: "MyNotifier",
            target: {
                cls: MyNotifier,
                params: ["tmp"]
            }
        });
        // add a subscriber
        target.subscribe({
            subscriber: "Memory",
            notifier: "MyNotifier",
            value: "test",
            event: "onTest",
            owner: 5
        });
        // trigger an event from subscribers
        const result = await target.trigger({
            subscriber: ["Memory", "Tst"],
            event: "onTest",
            data: {
                den: 333,
                des: 444
            },
            onPreTrigger: (payload) => {
                payload = payload || {};
                payload.pre = 1;
                return payload;
            },
            onPosTrigger: (payload) => {
                payload = payload || {};
                payload.pos = 1;
                return payload;
            },
            scope: null
        });
        // compare 
        const resMemory = await result.Memory;
        expect(result).toBeInstanceOf(Object);
        expect(Object.keys(result).length).toBe(2);
        expect(resMemory).toBeInstanceOf(Array);
        expect(resMemory.length).toBe(2);
        expect(resMemory[1].from).toBe("MyNotifier");
        done();
    });
});