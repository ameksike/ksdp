### Description

The proxy pattern is a software design pattern. A proxy, in its most general form, is a class functioning as an interface to something else. In short, a proxy is a wrapper or agent object that is being called by the client to access the real serving object behind the scenes. Use of the proxy can simply be forwarding to the real object, or can provide additional logic. In the proxy, extra functionality can be provided, for example caching when operations on the real object are resource intensive, or checking preconditions before operations on the real object are invoked. For the client, usage of a proxy object is similar to using the real object, because both implement the same interface.

The Proxy design pattern is one of the twenty-three well-known [GoF design patterns](https://en.wikipedia.org/wiki/Design_Patterns) that describe how to solve recurring design problems to design flexible and reusable object-oriented software, that is, objects that are easier to implement, change, test, and reuse.

### Load example
```Js
const KsDp = require('ksdp');
const KsProxy = new KsDp.structural.Proxy();
```

### Simple use example, isolating methods and properties
```Js
class MyEx extends KsProxy {

   constructor(options) {
        super();
        this.configure(options);
    }

    configure(options) {
        this.methods = {};
        this.attributes = {};
    }

    get(target, key) {
        if(key in target.attributes) {
            return Reflect.get(target.attributes, key);
        }
        if(key in target.methods) {
            return Reflect.get(target.methods, key).bind(target);
        }
        return null;
    }

    set(target, key, value) {
        if(typeof(value) !== "function" ) {
            this.attributes[key] = value.toUpperCase();
        }else{
            this.methods[key] = value;
        }
    }
}
```
```Js
const obj = new MyEx();

obj.type = "a";
obj.mode = (name, mode) => `${name} - ${mode}`.toUpperCase();

console.log(obj.mode("a", "b") === "A - B");
console.log(obj.type === "A");
```
For more information on these topics, you can also see: [Extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) and [Proxy](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Proxy). 

### Integrating Proxy pattern with Strategy pattern 
```Js
class Algorism extends KsProxy {

    constructor(options) {
        super();
        this.configure(options);
    }

    configure(options) {
        this.type = options?.type || this.type || "Base64";
        this.scheme = options?.scheme || this.scheme || "encode";

        this.stg = this.stg || new KsDp.behavioral.Strategy({
            path: __dirname,
            default: this.scheme
        });
    }

    get(target, key) {
        const obj = this.stg.get({ name: this.type });
        if(!obj) {
            return null;
        }
        const res = Reflect.get(obj, key);
        return typeof(res) === "function" ? res.bind(obj);
    }

    set(target, key, value) {
        const obj = this.stg.get({ name: this.type });
        if(obj) {
            obj[key] = value;
        }
    }
}

module.exports = Algorism;
```

For a better understanding of the strategy pattern, see the [next section](behavioral.strategy.md).