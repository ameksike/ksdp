## Hook from Integration Group 
The Hooks pattern is a design pattern that facilitates event-driven programming within a software architecture. It allows you to define events and configure them with subscribers and notifiers. Subscribers listen to specific events and define which notifier should handle them when the event is triggered. This pattern enhances modularity and extensibility in event-driven systems.


### Hook library intanciation
```Js
const KsDp = require('ksdp');

const hook = new KsDp.integration.hook.Main({     
    path: __dirname + "/demo/"
});
```

### Add a simple subscription to a Memory subscriber 
```Js
hook.subscribe({
    subscriber: "Memory",
    notifier: "Ioc",
    value: "Web",
    event: "onLoad",
    owner: 5
});
```

### Add a multiple subscriptions to a Memory subscriber 
```Js
hook.subscribe([{
    subscriber: "Memory",
    notifier: "Ioc",
    value: "Web",
    event: "onInit",
    owner: 5
},{
    subscriber: "Memory",
    notifier: "Ioc",
    value: "Web",
    event: "onLoad",
    owner: 3
}]);
```

### Trigger an event from Memory subscriber
```Js
const result = hook.trigger({
	subscriber: "Memory",
	event: "onTest",
	data: {
		den: 111,
		des: 222
	}
});
```

### Trigger an event from different subscribers and handling the parameters
```Js
const result = hook.trigger({
	subscriber: ["Memory", "MySubs"],
	event: "onTest",
	data: {
		den: 111,
		des: 222
	},
	onPreTrigger: (payload) => {
		payload = payload || {};
		payload.pre = 1;
		return payload;
	},
	onPosTrigger: (payload) => {
		payload = payload || {};
		payload.pos = 1;
		return payload;
	},
	scope: null
});
```

## Custom subscribers

### Obtion 1: Defining a subscriber in the directory ```demo/subscriber``` : 
```Js
class MySubs {
    constructor() {
        this.type = "MySubs";
        this.list = {};
    }
    subscribe(payload) {
        this.list[payload.owner] = this.list[payload.owner] || [];
        this.list[payload.owner].push(payload);
    }
    subscriptions(payload) {
        return this.list[payload.owner];
    }
}

module.exports = MySubs;
```

### Obtion 2: Setting the subscriber handler by hand into the hook lib

```Js
hook.subscriber.set({
	name: "MySubs",
	target: {
		cls: MySubs
	}
});
```


## Custom notifiers

### Obtion 1: Defining a notifier in the directory ```demo/notifier``` : 
```Js
class MyNotifier {
	constructor(type, type2) {
		this.type = type;
		this.type2 = type2;
	}
	run(payload) {
		return {
			from: "MyNotifier",
			payload
		};
	}
}
```

### Obtion 2: Setting the notify handler by hand into the hook lib

```Js
hook.notifier.set({
	name: "MyNotifier",
	target: {
		cls: MyNotifier,
		params: ["external-param1", "external-param2"]
	}
});
```

### Obtion 3: Setting the notify handler as an Object list by hand into the hook lib

```Js
hook.notifier.set([
	{
		name: "MyNotifier",
		target: {
			run: function (payload) {
				console.log("params >>>", arguments);
				console.log("hook lib ref>>>", this.hook);
			}
		}
	},{
		name: "MyNotifier2",
		target: {
			run: function (payload) {
				console.log("params >>>", arguments);
				console.log("hook lib ref>>>", this.hook);
			}
		}
	}
]);
```


