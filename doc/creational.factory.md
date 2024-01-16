### Description

The Factory Method design pattern is one of the "Gang of Four" design patterns that describe how to solve recurring design problems to design flexible and reusable object-oriented software, that is, objects that are easier to implement, change, test, and reuse.

The Factory Method design pattern is used instead of the regular class constructor for keeping within the SOLID principles of programming, decoupling the construction of objects from the objects themselves. This has the following advantages and is useful for the following cases, among others


### Usage example
```Js
const KsDp = require('ksdp');
const factory = new KsDp.creational.Factory();

const obj = factory.get({
    name: 'Crypto',
    file: [
        path + opt.name + '.js',
        path + opt.name + '/' + opt.name + '.js',
        path + opt.name + '/index.js'
    ],
    params: ['111', '333']
});

const out = obj.encode('this is a test');
```

Note that, the parameter of the 'Factory::get' function is composed of 3 essential attributes:
* Type {String}, payload.name it is taget Name
* Type {String}, payload.file it is taget File Path
* Type {Object}, payload.params it is params for taget constructor


### In case only loading the class is required

```Js
const KsDp = require('ksdp');
const factory = new KsDp.creational.Factory();

const Ctls = factory.load({
    name: 'Crypto',
    file: [
        path + opt.name + '.js',
        path + opt.name + '/' + opt.name + '.js',
        path + opt.name + '/index.js'
    ]
});

const obj = new Ctls();
const out = obj.encode('this is a test');
```
