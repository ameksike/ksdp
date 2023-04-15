### Description

The singleton pattern is a software design pattern that restricts the instantiation of a class to a singular instance. One of the well-known ["Gang of Four" design patterns](https://en.wikipedia.org/wiki/Design_Patterns), which describe how to solve recurring problems in [object-oriented software](https://en.wikipedia.org/wiki/Object-oriented_programming), the pattern is useful when exactly one object is needed to coordinate actions across a system.

More specifically, the singleton pattern allows objects to:

- Ensure they only have one instance
- Provide easy access to that instance
- Control their instantiation (for example, hiding the constructors of a class)

```Js
class MyHandler {
   //.........................................PATTERN
    static obj = null;
    static instance() {
        if (!MyHandler.obj) {
            MyHandler.obj = new MyHandler(...arguments);
        }
        return MyHandler.obj;
    }
    //................................PRIVATE MODIFIER
    #name;
    #mode;
    //...............................GETTERS & SETTERS
    get name() {
        return this.#name;
    }
    set mode(value) {
        this.#mode = ["-", "+", "@"].includes(value) ? value : this.#mode;
        if(value === "+") {
            this.#name = this.#name.toUpperCase();
        }
        if(value === "-") {
            this.#name = this.#name.toLowerCase();
        }
    }
    //.....................................CONSTRUCTOR
    constructor(name, mode) {
        this.#name = name ?? "A";
        this.#mode = mode ?? "+";
    }
    //................................................
}

const obj1 = MyHandler.instance();
const objn = MyHandler.instance("ASD", "@");
console.log(objn.name === obj1.name); 
```

Some consider the singleton to be an anti-pattern that introduces global state into an application, often unnecessarily. This introduces a potential dependency on the singleton by other objects, requiring analysis of implementation details to determine whether a dependency actually exists