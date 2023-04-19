### Description
The command pattern is a behavioral design pattern in which an object is used to encapsulate all information needed to perform an action or trigger an event at a later time. This information includes the method name, the object that owns the method and values for the method parameters.

### Load example
```Js
const KsDp = require('ksdp');
const cmd = new KsDp.behavioral.Command();
```

### Run function
```Js
function fun(a, b) {
    return a && (a + (this.sep || "-") + b);
}

const res = cmd.run(fun, ["HO", "LA"], { sep: "_" });

console.log(
    res.result === "HO_LA",
    res.error === undefined
)
```

### Error handler  
```Js
function fun(a, b) {
    throw new Error("faild");
}

const res = cmd.run(fun, ["HO", "LA"], { sep: "_" });

console.log(
    res.result === undefined,
    res.error instanceof Error
)
```

### Namespace resolution 
```Js
const obj = {
    con: {
        den: {
            get: function (elm) {
                return elm + "_3";
            }
        }
    }
};

const res = cmd.run("con.den.get", ["HOLA"], obj);

console.log(
    res.result === "HOLA_3"
);
```