### Description

Inheritance in JavaScript is based on the concept of prototype chaining, where objects inherit properties and methods from their prototype objects.

When two different classes in JavaScript share the same prototype object, they can inherit properties and methods from each other through prototype imitation.

Prototype imitation is a process where an object is created to imitate another object's prototype. This allows the new object to inherit properties and methods from the original object's prototype, effectively creating a chain of prototype objects.

In the context of class inheritance, if a Class A imitates the prototype of Class B, it will inherit all the properties and methods defined on Class B's prototype. This means that instances of Class A will have access to all the properties and methods defined on Class B's prototype, as if they were defined directly on Class A.

KsDp support fourth types of inheritance by imitation:  

- Class to Class
- Class to Object
- Object to Class
- Onject to Object

For example, consider the following code sections.

### Load lib example
```Js
const KsDp = require('ksdp');
```

### Class to Class imitation 
```Js
class ClsA {
    constructor(value) {
        this.value = value + "_ClsA";
    }
    method() {
        return "ClsA:method";
    }
    method1() {
        return "ClsA:method1";
    }
}

class ClsB {
    method() {
        return "ClsB:method";
    }
    method2() {
        return "ClsB:method2";
    }
}

KsDp.inherit.imitate(ClsA, ClsB);
        
const obj = new ClsA("obj")

console.log( 
    obj.method()  === "ClsA:method",
    obj.method1() === "ClsA:method1",
    obj.method2() === "ClsB:method2"
);
```
Note how the shared method the shared method is not overridden by the outer class.

### Class to Object imitation 
```Js
class ClsA {
    method() {
        return "ClsA:method";
    }
    method1() {
        return "ClsA:method1";
    }
}

const objB = {
    method() {
        return "ClsB:method";
    },
    method2() {
        return "ClsB:method2";
    }
}

KsDp.inherit.imitate(ClsA, objB);
const obj = new ClsA("obj");

console.log( 
    obj.method()  === "ClsB:method",
    obj.method1() === "ClsA:method1",
    obj.method2() === "ClsB:method2"
);
```
Note that there is a difference here because the shared method is overridden by the outer class.

### Object to Class imitation 
```Js
class ClsA {
    constructor() {
        KsDp.inherit.imitate(this, ClsB);
    }
    method() {
        return "ClsA:method";
    }
    method1() {
        return "ClsA:method1";
    }
}

class ClsB {
    method() {
        return "ClsB:method";
    }
    method2() {
        return "ClsB:method2";
    }
}

const obj = new ClsA("obj");

console.log( 
    obj.method()  === "ClsB:method",
    obj.method1() === "ClsA:method1",
    obj.method2() === "ClsB:method2"
);
```
In this case, the imitation is applied inside the constructor method. Another solutions could be using it outside a class construction and apply it on a certain instance.

### Object to Object imitation 

```Js
const objA = {
    method() {
        return "ClsA:method";
    },
    method1() {
        return "ClsA:method1";
    }
}

const objB = {
    method() {
        return "ClsB:method";
    },
    method2() {
        return "ClsB:method2";
    }
}

KsDp.inherit.imitate(objA, objB);

console.log( 
    objA.method()  === "ClsB:method",
    objA.method1() === "ClsA:method1",
    objA.method2() === "ClsB:method2"
);
```
In this case it is like copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.