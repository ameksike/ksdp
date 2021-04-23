# KsDp library 
Design Patterns Library: contains a group elements of reusable Object Oriented Software. It is an attempt to combine implementations of: Gang of Four (GoF), GRASP, IoC. 

# Install from [npm package](https://www.npmjs.com/package/ksdp)
```
npm install ksdp
```

### This library is divided into four main categories, which are described below 

### **Creational:** Creational patterns are ones that create objects, rather than having to instantiate objects directly. This gives the program more flexibility in deciding which objects need to be created for a given case.

* Abstract factory groups object factories that have a common theme.
* Builder constructs complex objects by separating construction and representation.
* Factory method creates objects without specifying the exact class to create.
* Prototype creates objects by cloning an existing object.
* Singleton restricts object creation for a class to only one instance.

### **Structural:** These concern class and object composition. They use inheritance to compose interfaces and define ways to compose objects to obtain new functionality.

* Adapter allows classes with incompatible interfaces to work together by wrapping its own interface around that of an already existing class.
* Bridge decouples an abstraction from its implementation so that the two can vary independently.
* Composite composes zero-or-more similar objects so that they can be manipulated as one object.
* Decorator dynamically adds/overrides behaviour in an existing method of an object.
* Facade provides a simplified interface to a large body of code.
* Flyweight reduces the cost of creating and manipulating a large number of similar objects.
* Proxy provides a placeholder for another object to control access, reduce cost, and reduce complexity.

### **Behavioral:** Most of these design patterns are specifically concerned with communication between objects.

* Chain of responsibility delegates commands to a chain of processing objects.
* Command creates objects that encapsulate actions and parameters.
* Interpreter implements a specialized language.
* Iterator accesses the elements of an object sequentially without exposing its underlying representation.
* Mediator allows loose coupling between classes by being the only class that has detailed knowledge of their methods.
* Memento provides the ability to restore an object to its previous state (undo).
* Observer is a publish/subscribe pattern, which allows a number of observer objects to see an event.
* State allows an object to alter its behavior when its internal state changes.
* Strategy allows one of a family of algorithms to be selected on-the-fly at runtime.
* Template method defines the skeleton of an algorithm as an abstract class, allowing its subclasses to provide concrete behavior.
* Visitor separates an algorithm from an object structure by moving the hierarchy of methods into one object.

### **Integration:** 
* IoC: Inversion of Control
* DI: Dependency Injection is a technique in which an object receives other objects that it depends on.
* LS: Service Locator pattern is a design pattern used in software development to encapsulate the processes involved in obtaining a service with a strong abstraction layer.

## IoC from Integration Group 
In software engineering, inversion of control (IoC) is a programming principle. IoC inverts the flow of control as compared to traditional control flow. In IoC, custom-written portions of a computer program receive the flow of control from a generic framework. A software architecture with this design inverts control as compared to traditional procedural programming: in traditional programming, the custom code that expresses the purpose of the program calls into reusable libraries to take care of generic tasks, but with inversion of control, it is the framework that calls into the custom, or task-specific, code.

### IoC library intanciation
```Js
const KsDp = require('ksdp');

const helper = new KsDp.integration.IoC({ 
    name: 'helper',
    path: '../../', 
    src: {
        "Crypto": {
            "module": "app",
            "path": "service"
        }
    }
});
```

### Each element within the configuration must have a prototype with the following attributes: 
* name {string} [OPTIONAL] DEFAULT['DefaultService']  
* type {string} [OPTIONAL] DEFAULT['instance'] VALUES['module', 'type', 'instance', 'action', 'raw', 'alias', 'lib']
* module {string} [OPTIONAL] DEFAULT['app']  
* dependency {string} [OPTIONAL] DEFAULT[null]  
* options {any} [OPTIONAL] DEFAULT[null] only for type ['instance', 'action', 'raw']    
* source {string} [OPTIONAL] DEFAULT['default'] only for type 'alias'   
* params {any} [OPTIONAL] DEFAULT[null] only for type 'action'  
* path {string} [OPTIONAL] DEFAULT[@type]    
* file {string} [OPTIONAL]    
* id {string} [OPTIONAL]   

### It is possible to configure from new data once the library has been initialized: 
```Js
helper.configure({ 
    name: 'helper',
    path: '../../', 
    src: {
        "Crypto": {
            "module": "app",
            "path": "service"
        },
        "Security": {
            "type": "alias",
            "source": "Crypto"
        }
        "Demo": {
            "type": "raw",
            "options": "service"
        }
    }
});
```

### It is also possible to add resources to the cache in case they are loaded in memory: 
```Js
helper.set(new Logger(), { 
    name: 'logger', 
    type: 'instance', 
    path: 'app/libs' 
});
```

### Common use that allow loading targets by id from config:
```Js
const cripto = helper.get('Crypto');
const data = cripto.encode("this is a demo");
```

### Common use that allow loading targets by alias:
```Js
const cripto = helper.get('Security');
const data = cripto.encode("this is a demo");
```

### It is possible to define the dependencies that must be specified to a specific service:
```Js
// .............................. FILE DefaultController .....
class DefaultController extends Controller {
    constructor(opt) {
        this.path = opt.path;
    }
    getPath(){
        return this.sec.encode( this.path );
    }
}
// .............................. FILE MAIN ..................
const service = this.helper.get({
    "DefaultController",
    type: 'instance',
    path: 'controllers',
    options: {
        path: __dirname + "/../../"
    },
    dependency: { 'sec': 'Crypto' }
});

const data = service.getPath();
```

### The IoC can be specified as a dependency also from the name or alias defined in its configuration: 
```Js
// .............................. FILE DefaultController .....
class DefaultController extends Controller {
    constructor(opt) {
        this.path = opt.path;
    }

    getPath(){
        const srvLocal = this.ioc.get({ name: 'LocalController' });
        const data = this.sec.encode( this.path );
        return srvLocal.show(data);
    }
}
// .............................. FILE LocalController ........
class LocalController extends Controller {
    show(data){
        return data + '-->';
    }
}
// .............................. FILE MAIN ..................

const KsDp = require('ksdp');
const loader = new KsDp.integration.IoC({ name: 'loader' });
const service = this.helper.get({
    name: 'DefaultController',
    type: 'instance',
    path: 'controllers',
    options: {
        path: __dirname + "/../../"
    },
    dependency: { 'ioc': 'loader', 'sec': 'Crypto' }
});

const data = service.getPath();
```

