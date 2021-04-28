### Description

The strategy pattern (also known as the policy pattern) is a behavioral software design pattern that enables selecting an algorithm at runtime. Instead of implementing a single algorithm directly, code receives run-time instructions as to which in a family of algorithms to use.

According to the strategy pattern, the behaviors of a class should not be inherited. Instead, they should be encapsulated using interfaces. This is compatible with the open/closed principle (OCP), which proposes that classes should be open for extension but closed for modification.

### Load example
```Js
const KsDp = require('ksdp');
const strategy = new KsDp.behavioral.Strategy();
```

The idea is to load an target or strategy that is inside a folder, for example:

```Js Simple Usage example 
// .............................. FILE project/encode/Md5.js .....
class Md5  {
    get(data){
        return data + '... Md5';
    }
}
// .............................. FILE project/encode/Base64.js .....
class Base64  {
    get(data){
        return data + '... Base64';
    }
}
// .............................. FILE project/decode/Base64.js .....
class Base64  {
    get(data){
        return data + '... Base64';
    }
}
// .............................. FILE project/main.js .....
const KsDp = require('ksdp');
const strategy = new KsDp.behavioral.Strategy({ path: __dirname });
const obj = strategy.get({ name: 'Md5', type: 'encode' });
const out = obj.get('this is a test');
```

Note that, the parameter of the 'Strategy::get' function is composed of 3 essential attributes:
* Type {String}, payload.type it is taget path name or id for a group of tagets
* Type {String}, payload.name it is taget name
* Type {Any}, payload.params it is params for taget constructor

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