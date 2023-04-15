### Description

Dependency injection is a design pattern in which an object or function receives other objects or functions that it depends on. A form of [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control), dependency injection aims to [separate the concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) of constructing objects and using them, leading to [loosely coupled](https://en.wikipedia.org/wiki/Loose_coupling) programs.

he pattern ensures that an object or function which wants to use a given service should not have to know how to construct those [services](https://en.wikipedia.org/wiki/Service_(systems_architecture)). Instead, the receiving 'client' (object or function) is provided with its dependencies by external code (an 'injector'), which it is not aware of. Dependency injection helps by making implicit dependencies explicit and helps solve the following problems:

- How can a class be independent from the creation of the objects it depends on?
- How can an application, and the objects it uses support different configurations?
- How can the behavior of a piece of code be changed without editing it directly?

In addition, dependency injection is used for keeping code in-line with the dependency inversion principle.

### Types of dependency injection
There are three main ways in which a client can receive injected services:

- **Constructor injection**, where dependencies are provided through a client's class constructor.
- **Setter injection**, where the client exposes a setter method which accepts the dependency.
- **Interface injection**, where the dependency's interface provides an injector method that will inject the dependency into any client passed to it.

In some frameworks, clients do not need to actively accept dependency injection at all. In Java, for example, reflection can make private attributes public when testing and inject services directly.

### Load lib example
```Js
const KsDp = require('ksdp');
```

### Simple declaration 
```js
class General extends KsDp.integration.Dip {
    encode(data) {
        this.checkDependencies(["driver"]);
        return this.driver.encode(data);
    }
}
module.exports = General;
```

### Simple use 
```js

const obj = new General();
const driver = new Md5();

obj.setDependencies({ driver });

let res = obj.encode("I-I");
console.log(res === "I-I...MD5");
```

It is also possible to use this pattern without an explicit extension. For example, consider the following code.

```js
class General {
    encode(data) {
        this.checkDependencies(["driver"]);
        return this.driver.encode(data);
    }
}

KsDp.inherit.imitate(General, KsDp.integration.Dip);

module.exports = General;
```

For more comprehension of this topic, see the section [inheritance by imitation](inherit.imitate.md), and the test seccion [Imitation Test](test/inherit.imitate.spec.js), [DI Test](test/integration.dip.spec.js). 