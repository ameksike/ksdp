## Hook from Integration Group 
The Hooks pattern is a design pattern that facilitates event-driven programming within a software architecture. It allows you to define events and configure them with subscribers and notifiers. Subscribers listen to specific events and define which notifier should handle them when the event is triggered. This pattern enhances modularity and extensibility in event-driven systems.

The library comprises four key components: Hooks, Subscriber, Notifier, and Processor. These components work in tandem to provide a modular and customizable solution for managing events and executing actions based on event triggers.

### Hooks
- Represents the core interface responsible for dynamically loading instances of controller classes for Subscribers, Notifiers, and Processors.
- Implements patterns such as service locator, inversion of control, strategy, dependency injection, and observers.

### Subscriber
- Manages all data associated with events, defining the type of database to use and the required fields for each subscriber record.
- Interacts with different data storage sources (memory, databases, files, MySQL, MongoDB, Redis, etc.).
- Defines the data type and handles interactions with various data storage solutions.

### Notifier:
- Implements actions based on parameters received, including the event name, subscriber content, and specified parameters at the time of event triggering.
- Executes actions based on event data and subscriber information.

### Processor:
- Optional class defining how a logical expression is evaluated to determine whether the specified Notifier should be executed.
- Evaluates logical expressions and determines whether to proceed with Notifier execution.
- Provides flexibility to conditionally execute actions based on configurable logic.

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
Manages all data associated with events, defining the type of database to use and the required fields for each subscriber record.

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

The notifiers are handlers or delegates for each subscription or target from subscribers which match with the triggered event. 

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
The **run** method is the one that will be executed after the **trigger** method. The **run** method will receive an object or **payload** as a parameter with the following prototype:   

```js
{
	event: String,
	subscriber: String,
	date: Number,
	target: Object,
	data: Object, 
}
```
For example:

```js
{
	subscriber: "Memory",
	event: "onTest",
	date: 1704536131119,
	target: {
		id: 1,
		event: "onTest",
		value: "newrelic.service:onEvent1",
		notifier: "locator",
		owner: 5,
		processor: "Native",
		expression: "den LESS THAN EQUAL 111 AND des EQUAL 222"
	},
	data: {
		den: 111,
		des: 222
	}
}
```
The content of the payload will always depend on the **subscriber**, which define the data structure to save by each subscription or target. The **data** is the information sent in the **trigger** method. 

### Processors
The processors are strongly related to the payload received at the notifier. These are optional and allow defining a **conditional** or **logic expression** to evaluate in order to decide if the selected **target** must be executed or not. For further information about **processors**, check the followings:
- [Ksike Expression Evaluator](https://github.com/ameksike/kseval)  
- [Ksike Hooks](https://github.com/ameksike/kshook)


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

### Trigger events from a notifier itself 

```Js
class MyNotifier2 {
	run(payload) {
		if(payload.data === "complete") {
			return this.hook.trigger({
				subscriber: "Memory",
				event: "onTest",
				data: {
					den: 111,
					des: 222
				}
			});
		}
	}
}
```
Notifiers have a reference to the main hook library in other to be able to trigger another events. 



You might be interested in the following topics:
- [Emitter](./behavioral.emitter.md) extension of the Node.Js EventEmitter.
- [Observer](./behavioral.observer.md) implements the Observer design pattern.
- [IoC](./integration.ioc.md) Inversion of Control inverts the flow of control as compared to traditional control flow.
