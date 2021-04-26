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
