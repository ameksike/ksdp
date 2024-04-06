const KsDp = require('..');
const ioc = new KsDp.integration.IoC({
    path: __dirname + "/demo/"
});

describe('CRUD', () => {

    it("simple set/get", () => {
        const han = { get(key) { return key + 1 }, name: 111 };
        const res2 = ioc.set(han, "custom").get("custom");
        expect(han.name).toBe(res2.name);
    });

    it("multiple set/get", () => {
        let opt = {};
        ioc.register([
            { value: { get(key) { return key + 1 }, name: 111 }, option: "custom" },
            { value: { get(key) { return key + 2 }, name: 222 }, option: "demo" },
        ], opt);
        let custom = ioc.get("custom");
        let demo = ioc.get("demo");
        expect(custom.name).toBe(111);
        expect(demo.name).toBe(222);
        expect(custom.get(3)).toBe(4);
        expect(demo.get(3)).toBe(5);
    });

    it("unregister", () => {
        ioc.register([
            { value: { get(key) { return key + 1 }, name: 100 }, option: "custom" },
            { value: { get(key) { return key + 2 }, name: 111 }, option: "demo1" },
            { value: { get(key) { return key + 2 }, name: 222 }, option: "demo2" },
        ]);
        ioc.unregister("custom");

        const custom = ioc.get("custom");
        const demo1 = ioc.get("demo1");
        const demo2 = ioc.get("demo2");

        expect(custom).toBe(null);
        expect(demo1.name).toBe(111);
        expect(demo2.name).toBe(222);
    });

    it("multi unregister", () => {
        ioc.register([
            { value: { get(key) { return key + 1 }, name: 100 }, option: "custom" },
            { value: { get(key) { return key + 2 }, name: 111 }, option: "demo1" },
            { value: { get(key) { return key + 2 }, name: 222 }, option: "demo2" },
        ]);
        ioc.unregister(["custom", "demo1"]);

        const custom = ioc.get("custom");
        const demo1 = ioc.get("demo1");
        const demo2 = ioc.get("demo2");

        expect(custom).toBe(null);
        expect(demo1).toBe(null);
        expect(demo2.name).toBe(222);
    });

    it("update registration", () => {
        ioc.register([
            { value: { get(key) { return key + 1 }, name: 100 }, option: "custom" },
            { value: { get(key) { return key + 2 }, name: 111 }, option: "demo1" },
            { value: { get(key) { return key + 3 }, name: 222 }, option: "demo2" },
        ]);

        ioc.register({ get(key) { return key + 5 }, name: 555 }, "custom");

        const custom = ioc.get("custom");
        const demo1 = ioc.get("demo1");

        expect(custom.name).toBe(555);
        expect(custom.get(3)).toBe(8);
        expect(demo1.name).toBe(111);
        expect(demo1.get(3)).toBe(5);
    });

});

describe('LIB', () => {
    ioc.add([
        {
            "name": "strategy.lib",
            "file": "./strategy.class.js",
            "type": "lib"
        },
        {
            "name": "strategy.obj",
            "file": "./myobject.js",
            "type": "lib",
            "dependency": {
                "service": "strategy.lib"
            }
        }
    ]);

    it("local class", () => {
        const res = ioc.get("strategy.lib");
        expect(res).toBeInstanceOf(Object);
        expect(res.name).toBe("Strategy.Algorism");
        expect(res.encode).toBeInstanceOf(Function);
    });

    it("local object", () => {
        const res = ioc.get("strategy.obj");
        expect(res).toBeInstanceOf(Object);
        expect(res.name).toBe("demo");
        expect(res.getName).toBeInstanceOf(Function);
        expect(res.getName()).toBe("demo-*");
        expect(res.service).toBeInstanceOf(Object);
        expect(res.service.name).toBe("Strategy.Algorism");
        expect(res.service.encode).toBeInstanceOf(Function);
    });
});

describe('Dependency', () => {

    it("invalid key", (done) => {
        const res = ioc.get("my.lib");
        expect(res).toBe(null);
        done();
    });

    it("valid funtion", (done) => {
        const myFn = ioc.get({
            name: "myfunction",
            type: "dependency"
        });
        expect(myFn).toBeInstanceOf(Function);
        const res = myFn("p1", "p2");
        expect(res).toBe("data-from-funtion-p1-p2");
        done();
    });

    it("valid object", (done) => {
        const myObj = ioc.get({
            name: "myobject",
            type: "dependency"
        });
        expect(myObj).toBeInstanceOf(Object);
        expect(myObj.name).toBe("demo");
        expect(myObj.count).toBe(1);
        expect(myObj.getName()).toBe("demo-*");
        done();
    });

    it("valid object with namespace", (done) => {
        const myObj = ioc.get({
            name: "nsobj",
            namespace: "imp",
            type: "dependency"
        });
        expect(myObj).toBeInstanceOf(Object);
        expect(myObj.name).toBe("imp");
        expect(myObj.count).toBe(5);
        expect(myObj.getName()).toBe("imp-*");
        done();
    });
});

describe('Raw', () => {
    it("valid raw data", (done) => {
        const rawopt = ioc.get({
            data: {
                name: "raw",
                age: 3,
                lst: [1, 3, 4]
            },
            type: "raw"
        });
        expect(rawopt).toBeInstanceOf(Object);
        expect(rawopt.age).toBe(3);
        expect(rawopt.lst).toBeInstanceOf(Array);
        done();
    });

    it("valid raw data", (done) => {
        ioc.configure({
            src: {
                "cfg.data": {
                    data: {
                        name: "raw",
                        age: 3,
                        lst: [1, 3, 4]
                    },
                    type: "raw"
                }
            }
        });
        const rawopt = ioc.get("cfg.data");
        expect(rawopt).toBeInstanceOf(Object);
        expect(rawopt.age).toBe(3);
        expect(rawopt.lst).toBeInstanceOf(Array);
        done();
    });
});

describe('Module', () => {
    it("valid module", (done) => {
        const controller = ioc.get({
            name: "mymodule",
            type: "module"
        });
        expect(controller).toBeInstanceOf(Object);
        expect(controller.getInfo()).toBe('MymoduleModule');
        done();
    });

    it("valid module as object", (done) => {
        const controller = ioc.get({
            name: "mymodule2",
            type: "module"
        });
        expect(controller).toBeInstanceOf(Object);
        expect(controller.getInfo()).toBe('MymoduleModule2');
        done();
    });

    it("valid controller with no dependencies", (done) => {
        const controller = ioc.get({
            name: "LocalController",
            module: "mymodule",
            path: 'controller'
        });
        expect(controller).toBeInstanceOf(Object);
        expect(controller.getInfo()).toBe('LocalController');
        done();
    });

    it("valid controller as object", (done) => {
        const controller = ioc.get({
            name: "LocalController2",
            module: "mymodule",
            path: 'controller'
        });
        expect(controller).toBeInstanceOf(Object);
        expect(controller.getInfo()).toBe('LocalController2');
        done();
    });

    it("valid service with params", (done) => {
        const service = ioc.get({
            name: "PersonService",
            module: "mymodule",
            path: 'service',
            params: ["demo", 55]
        });
        expect(service).toBeInstanceOf(Object);
        expect(service.getName()).toBe('demo');
        done();
    });

    it("valid controller with dependencies", (done) => {
        const controller = ioc.get({
            name: "PersonController",
            module: "mymodule",
            path: 'controller',
            dependency: {
                "srvPerson": {
                    name: "PersonService",
                    module: "mymodule",
                    path: 'service',
                    params: ["demo", 55]
                }
            }
        });
        expect(controller).toBeInstanceOf(Object);
        expect(controller.getInfo()).toBe('PersonController');
        expect(controller.getName()).toBe('demo');
        done();
    });
});

describe('Compiler/Analyzer', () => {
    class MyAnalyzer extends KsDp.integration.IoC.cls.analyzer.Native {
        run(opt) {
            return super.run({
                name: "PersonController",
                module: "mymodule",
                path: 'controller',
                dependency: {
                    "srvPerson": {
                        name: "PersonService",
                        module: "mymodule",
                        path: 'service',
                        params: ["demo", 55]
                    }
                }
            });
        }
    }

    class MyCompiler extends KsDp.integration.IoC.cls.compiler.Native {
        run(opt) {
            return this.ioc?.get({
                name: "PersonController",
                module: "mymodule",
                path: 'controller',
                dependency: {
                    "srvPerson": {
                        name: "PersonService",
                        module: "mymodule",
                        path: 'service',
                        params: ["demo", 55]
                    }
                }
            });
        }
    }

    it("check the correct interfaces", () => {
        expect(KsDp.integration.IoC).toBeInstanceOf(Function);
        expect(KsDp.integration.IoC.cls.Default).toBeInstanceOf(Function);
        expect(KsDp.integration.IoC.cls.Async).toBeInstanceOf(Function);
        expect(KsDp.integration.IoC.cls.Sync).toBeInstanceOf(Function);
        expect(KsDp.integration.IoC.cls.compiler.Native).toBeInstanceOf(Function);
        expect(KsDp.integration.IoC.cls.analyzer.Native).toBeInstanceOf(Function);
    });

    it("set new Compiler", () => {
        const controller0 = ioc.get({ type: "myc" });
        ioc.compiler.set(MyCompiler, "myc");
        ioc.compiler.set(new MyCompiler(ioc), "mycObj");
        const controller1 = ioc.get({ type: "myc" });
        const controller2 = ioc.get({ type: "mycObj" });

        expect(controller0).toBe(null);
        expect(controller1).toBeInstanceOf(Object);
        expect(controller1.getInfo()).toBe('PersonController');
        expect(controller1.getName()).toBe('demo');
        expect(controller2.getName()).toBe('demo');
    });

    it("set new Analyzer", () => {
        const controller0 = ioc.get({ type: "mya" });
        ioc.analyzer.set(MyAnalyzer, "mya");
        const controller1 = ioc.get({ type: "mya" });

        expect(controller0).toBe(null);
        expect(controller1).toBeInstanceOf(Object);
        expect(controller1.getInfo()).toBe('PersonController');
        expect(controller1.getName()).toBe('demo');
    });
});