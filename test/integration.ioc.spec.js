const KsDp = require('..');
const ioc = new KsDp.integration.IoC({
    path: __dirname + "/demo/"
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