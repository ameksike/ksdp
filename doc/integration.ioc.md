The KsDp library, part of the Ksike ecosystem, serves as a comprehensive base library containing a group of reusable Object-Oriented Design and functional programming elements. It aims to provide implementations of various design patterns, including those from the Gang of Four (GoF), General Responsibility Assignment Software Patterns (GRASP), Inversion of Control (IoC), Service Locator (SL), Dependency Injection (DI), SOLID principles, Don't Repeat Yourself (DRY), Keep It Simple, Stupid (KISS), Separation of Concerns (SoC), and more.

One of the key features of KsDp is its interface that facilitates the implementation of these design patterns seamlessly within software projects. Let's delve into some of these patterns and how KsDp's interface enables their implementation:

- **Inversion of Control (IoC):**
  In IoC, the flow of control is inverted, with custom-written portions of a program receiving control flow from a generic framework. KsDp's interface allows developers to define custom code for specific tasks while the framework manages the flow of control, thus inverting the traditional control flow paradigm. This enables a more modular and flexible architecture, where components are loosely coupled, and dependencies are managed efficiently.

- **Dependency Injection (DI):**
  Dependency Injection is a crucial aspect of IoC, where dependencies of a component are provided externally rather than created within the component itself. KsDp's interface supports DI by allowing developers to register dependencies and inject them into components as needed. This promotes better separation of concerns, testability, and reusability of components.

- **Service Locator (SL):**
  The Service Locator pattern involves centralizing the process of obtaining services or dependencies. KsDp's interface provides facilities for creating service locators, enabling easy access to various services or dependencies throughout the application. This promotes modularity and enhances the maintainability of the codebase.

Other Design Patterns:
Apart from IoC, DI, and SL, KsDp's interface supports the implementation of a wide range of other design patterns mentioned earlier. Developers can leverage these patterns to address specific design challenges and create robust, scalable, and maintainable software solutions.

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

- name {String} [OPTIONAL] DEFAULT['DefaultService']
- type {String} [OPTIONAL] DEFAULT['instance'] VALUES['module', 'type', 'instance', 'action', 'raw', 'alias', 'lib']
- module {String} [OPTIONAL] DEFAULT['app']
- dependency {String} [OPTIONAL] DEFAULT[null]
- options {Object} [OPTIONAL] DEFAULT[null] only for type ['instance', 'action', 'raw']
- source {String} [OPTIONAL] DEFAULT['default'] only for type 'alias'
- params {Object} [OPTIONAL] DEFAULT[null] only for type 'action'
- path {String} [OPTIONAL] DEFAULT[@type]
- file {String} [OPTIONAL]
- id {String} [OPTIONAL]

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
// .............................. FILE project/controllers/DefaultController.js .....
class DefaultController extends Controller {
    constructor(opt) {
        this.path = opt.path;
    }
    getPath(){
        return this.sec.encode( this.path );
    }
}
// .............................. FILE project/main.js ..................
const controller = this.helper.get({
    "DefaultController",
    type: 'instance',
    path: 'controllers',
    options: {
        path: __dirname + "/../../"
    },
    dependency: { 'sec': 'Crypto' }
});

const data = controller.getPath();
```

### The IoC can be specified as a dependency also from the name or alias defined in its configuration:

```Js
// .............................. FILE project/controllers/DefaultController.js .....
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
// .............................. FILE project/controllers/LocalController.js ........
class LocalController extends Controller {
    show(data){
        return data + '-->';
    }
}
// .............................. FILE project/main.js ..................
const KsDp = require('ksdp');
const loader = new KsDp.integration.IoC({ name: 'loader' });
const controller = loader.get({
    name: 'DefaultController',
    type: 'instance',
    path: 'controllers',
    options: {
        path: __dirname + "/../../"
    },
    dependency: { 'ioc': 'loader', 'sec': 'Crypto' }
});

const data = controller.getPath();
```

## Extending the library

In the KsDp library, the interface for Inversion of Control (IoC) is extended through the use of analysers and compilers, which allow for the extension of support in cases where there are unsupported types or configurations initially.

### Analyzers

Analyzers act as drivers responsible for taking the input request for a resource and structuring the necessary metadata for the compiler to execute the loading and instantiation processes as required. They analyze the input and extract relevant information needed for further processing. For example, an analyser might parse configuration files, extract dependency information, or analyze user input to determine the appropriate actions to take.

Create your custom Analyzer, in the following example we will extend from the native analyzer and defining a full payload that really works, this is just an example:

```Js
const Analizer = KsDp.integration.IoC.cls.analyzer.Native;
```
```Js
const Analizer = KsDp.integration.IoC.cls.analyzer.Native;
class MyAnalyzer extends Analizer {
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
```

The next step will be to register the custom analyzer:

```Js
helper.analyzer.set(MyAnalyzer, "custom_analyzer");
```

Finally it is possible to request a resource base on the new option:

```Js
const controller = helper.get({ type: "custom_analyzer" });
const name = controller.getName();
```

### Compilers

Compilers, on the other hand, are drivers responsible for taking the metadata previously managed by the analyser and performing the required action based on that metadata. They translate the structured metadata into executable actions, such as loading an npm library, loading a JavaScript file, loading a JSON file, instantiating a class, or executing a specific action. Compilers execute the logic necessary to fulfill the requested operations based on the analysed metadata.

Create your custom compiler. Similar to the analyzer case, we extend the native compiler to get access to the global IoC object. 

```Js
const Compiler = KsDp.integration.IoC.cls.compiler.Native;
```

```Js
class MyCompiler extends Compiler {
    run(opt) {
        return this.ioc#.get({
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
        })
    }
}
```

The next step will be to register the custom compiler:

```Js
helper.compiler.set(MyCompiler, "custom_compiler");
```

Finally it is possible to request a resource base on the new option:

```Js
const controller = helper.get({ type: "custom_compiler" });
const name = controller.getName();
```


By leveraging analysers and compilers, the IoC interface in the KsDp library becomes highly flexible and extensible. Developers can customize the behaviour of the IoC container by providing custom analysers and compilers tailored to their specific requirements. This approach allows for seamless integration with various types of resources, configurations, and actions, enhancing the overall versatility and usability of the IoC functionality provided by the KsDp library.

You might be interested in the following topics:

- [Hook](./integration.hook.md) is a publish/subscribe pattern, which allows a number of observer objects to see an event.
- [DI](./integration.di.md) Dependency Injection is a technique in which an object receives other objects that it depends on.
- [Strategy](./behavioral.strategy.md) allows one of a family of algorithms to be selected on-the-fly at runtime.
