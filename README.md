# KsDp library 
Design Patterns Library or core base library containing elements group of reusable Object-Oriented Design and functional programming. It is an attempt to combine implementations of: GoF, GRASP, IoC, SL, DI, SOLID, DRY, KISS, SoC, etc. 

This library belong to the Ksike ecosystem:
- [KsMf](https://www.npmjs.com/package/ksmf) - Microframework (WEB, REST API, CLI, Proxy, etc)
- [Ksdp](https://www.npmjs.com/package/ksdp) - Design Patterns Library (GoF, GRASP, IoC, DI, etc)
- [KsCryp](https://www.npmjs.com/package/kscryp) - Cryptographic Library (RSA, JWT, x509, HEX, Base64, Hash, etc) 
- [KsHook](https://www.npmjs.com/package/kshook) - Event Driven Library
- [KsEval](https://www.npmjs.com/package/kseval) - Expression Evaluator Library 
- [KsWC](https://www.npmjs.com/package/kswc) - Web API deployment Library
- [KsTpl](https://www.npmjs.com/package/kstpl) - Template Engine


### Install from [npm package](https://www.npmjs.com/package/ksdp)
```
npm install ksdp
```

### This library is divided into four main categories, which are described below 

### **Integration:** 
* [IoC](doc/integration.ioc.md) Inversion of Control inverts the flow of control as compared to traditional control flow.
* [DI](doc/integration.di.md) Dependency Injection is a technique in which an object receives other objects that it depends on.
* [LS](doc/integration.ioc.md) Service Locator pattern is a design pattern used in software development to encapsulate the processes involved in obtaining a service with a strong abstraction layer.
* [Hook](doc/integration.hook.md) The Hooks pattern is a design pattern that facilitates event-driven programming within a software architecture.

### **Creational:** Creational patterns are ones that create objects, rather than having to instantiate objects directly. This gives the program more flexibility in deciding which objects need to be created for a given case.

* Abstract factory groups object factories that have a common theme.
* Builder constructs complex objects by separating construction and representation.
* [Factory](doc/creational.factory.md)  method creates objects without specifying the exact class to create.
* Prototype creates objects by cloning an existing object.
* [Singleton](doc/creational.singleton.md) restricts object creation for a class to only one instance.

### **Structural:** These concern class and object composition. They use inheritance to compose interfaces and define ways to compose objects to obtain new functionality.

* Adapter allows classes with incompatible interfaces to work together by wrapping its own interface around that of an already existing class.
* Bridge decouples an abstraction from its implementation so that the two can vary independently.
* Composite composes zero-or-more similar objects so that they can be manipulated as one object.
* Decorator dynamically adds/overrides behaviour in an existing method of an object.
* Facade provides a simplified interface to a large body of code.
* Flyweight reduces the cost of creating and manipulating a large number of similar objects.
* [Proxy](doc/structural.proxy.md) provides a placeholder for another object to control access, reduce cost, and reduce complexity.

### **Behavioral:** Most of these design patterns are specifically concerned with communication between objects.

* Chain of responsibility delegates commands to a chain of processing objects.
* [Command](doc/behavioral.command.md) creates objects that encapsulate actions and parameters.
* Interpreter implements a specialized language.
* Iterator accesses the elements of an object sequentially without exposing its underlying representation.
* Mediator allows loose coupling between classes by being the only class that has detailed knowledge of their methods.
* Memento provides the ability to restore an object to its previous state (undo).
* [Observer](doc/behavioral.observer.md) is a publish/subscribe pattern, which allows a number of observer objects to see an event.
* State allows an object to alter its behavior when its internal state changes.
* [Strategy](doc/behavioral.strategy.md) allows one of a family of algorithms to be selected on-the-fly at runtime.
* Template method defines the skeleton of an algorithm as an abstract class, allowing its subclasses to provide concrete behavior.
* Visitor separates an algorithm from an object structure by moving the hierarchy of methods into one object.


