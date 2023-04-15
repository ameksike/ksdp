### Description

The strategy pattern (also known as the policy pattern) is a behavioral software design pattern that enables selecting an algorithm at runtime. Instead of implementing a single algorithm directly, code receives run-time instructions as to which in a family of algorithms to use.

According to the strategy pattern, the behaviors of a class should not be inherited. Instead, they should be encapsulated using interfaces. This is compatible with the open/closed principle (OCP), which proposes that classes should be open for extension but closed for modification.

### Load example
```Js
const KsDp = require('ksdp');
const strategy = new KsDp.behavioral.Strategy();
```

The idea is to load a target or strategy that is inside a folder, for example:

```Js Simple Usage example 
// .............................. FILE project/encode/Md5.js .....
class Md5  {
    encode(data){
        return data + '... Md5';
    }
}
module.exports = Md5;
// .............................. FILE project/decode/Base64.js .....
class Base64  {
    encode(data){
        return data + '... Base64';
    }
}
module.exports = Base64;
// .............................. FILE project/main.js .....
const KsDp = require('ksdp');
const strategy = new KsDp.behavioral.Strategy({ path: __dirname, default: 'encode' });

const obj = strategy.get({ name: 'Md5', type: 'encode' });
console.log(obj?.encode('this is a test'));

const objBase64 = strategy.get("Base64");
console.log(objBase64?.encode('this is a test'));
```

Note that, the parameter of the 'Strategy::get' function is composed of 3 essential attributes:
* Type {String}, payload.type it is target path name or ID for a group of targets
* Type {String}, payload.name it is target name
* Type {Any}, payload.params it is parameters for target constructor


### It is possible to define default values
```Js
strategy.configure({ 
    path: __dirname, 
    type: 'encode',
    default: 'Crypto', 
    params: { encode: 'md5' } 
});

const obj = strategy.get();
const out = obj.encode('this is a test');
```

Another common solution:
```js
// .............................. FILE project/Algorism.js .....
const KsDp = require('ksdp');

class Algorism {
    constructor(){
        this.strategy = new KsDp.behavioral.Strategy({ path: __dirname, default: 'encode' });
    }

    encode(data, type='Md5'){
        const alg = this.strategy.get(type);
        return alg?.encode(data);
    }
}
module.exports = Algorism;

// .............................. FILE project/main.js .....
const Algorism = require('./Algorism');
const myalg = new Algorism()
console.log(myalg.encode("KIII", "Base64"));
```

To dig into more complex solutions like this, see the [proxy section](structural.proxy.md) and check its integration with the Strategy pattern.