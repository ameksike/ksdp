## Observer

The KsDp library implements the Observer design pattern, allowing you to manage multiple subscribers for each event. Events are grouped by scope, which enables you to manage multiple events within the desired context.

### Observer Design Pattern:

The library follows the Observer design pattern, where objects (observers or subscribers) register interest in and receive notifications when changes occur to another object (the subject or publisher).

### Multiple Subscribers per Event:

With KsDp, you can have multiple subscribers for each event. This means that multiple entities can listen for and react to the same event independently.

### Event Grouping by Scope:

Events are organized and managed by scope. This allows you to group related events together based on the context in which they occur. Each scope can have its own set of events and subscribers.

### Flexibility and Customization:

The library offers flexibility in managing events and subscribers. You can define custom scopes, register/unregister subscribers dynamically, and trigger events as needed.

### Clear and Intuitive API:

KsDp provides a clear and intuitive API for registering subscribers, triggering events, and managing scopes. The API is designed to be easy to use and understand, facilitating integration into your projects.

```Js
const KsDp = require('ksdp');
const emitter = new KsDp.behavioral.Observer();
```

### Subscriber or Listener

In the KsDp library, a subscriber or listener can be defined as either an anonymous function, an object with a method named after the event to be captured, or an object with a method named "on". In all three cases, the event is captured, and the function is executed when the event occurs. The function receives the data emitted by the emit function as parameters.

**Anonymous Function:** You can define a subscriber as an anonymous function that directly captures the event. When the event is emitted, the anonymous function is executed, receiving the emitted data as parameters.

```Js
emitter.add((val1, val2) => { /* ... */ }, "onread");

emitter.add(function(val1, val2){ /* ... */ }, "my_event", "my_scope");
```

**Object with a method named as event name:** You can define a subscriber as an object with a method as event name to be captured. When the event is emitted, the event name is used to determine the appropriate action and the corresponding method is executed, receiving the emitted data as parameters.

```Js
const listener = {
    onread(val) {
        /* ... */
    }
}
emitter.add(listener, "onread", "my_scope");
```

**Object with a Method Named "on":** Alternatively, you can define a subscriber as an object with a method named **"on"**. This method serves as a generic event handler for multiple events. When the event is emitted, the "on" method is executed, receiving the emitted data as parameters.

```Js
const listener = {
    on(val) {
        /* ... */
    }
}
emitter.add(listener, "onread", "my_scope");
```

### Subscriptions

```Js
emitter.add({ onread(val){ } }, "onread", "local");
emitter.add({ on(val){ } }, "onread", "local");
emitter.add((val) => { }, "onread");
```

### Subscriptions by configuration

It is also possible to define at the beginning or at the instantiation of the library a list of listeners or subscribers for each event on each event scope.

```Js
emitter.configure({
    evs: {
        "default": {
            "onread": [
                (val1, val2) => {
                    //...
                }
            ]
        },
        "local": {
            "onread": [
                (val1, val2) => {
                    //...
                },
                (val1, val2) => {
                    //...
                }
            ],
            "onwrite": [
                {
                    onwrite(val1, val2, val3){
                        //...
                    }
                },
                {
                    on(val1, val2, val3){
                        //...
                    }
                }
            ]
        }
    }
});
```

### Multiples subscriptions

```js
emitter.subscribe([
  {
    default(data) {
      console.log(data.value === 5);
    },
  },
  {
    on(data) {
      console.log(data.value === 5);
    },
  },
  (data) => {
      console.log(data.value === 5);
  },
]);

emitter.emit("default", { value: 5 });
```

### Triggering events

```Js
emitter.emit("onread", "default", [param1, param2]);

```

### Unsubscriptions 
The unsubscribe method in the KsDp library allows removing listeners from event registrations. This method accepts parameters such as the event name, the scope name to which the event belongs, and an options object to specify the index and the number of registrations to remove. Additionally, the method overloads the options parameter by passing the affected values by reference. As a result of the operation, the method inserts properties into the options object, including rows (a list of removed registrations), event (the name of the event where the operation was performed), and scope (the name of the scope to which the event belongs).

Here's an explanation of the parameters and the behavior of the unsubscribe method:
Parameters:
- eventName: The name of the event from which listeners will be unsubscribed.
- scopeName: The name of the scope to which the event belongs.
- options: An object containing additional options for the operation, such as the index and the number of registrations to remove.

Behavior:
- The unsubscribe method removes listeners from event registrations based on the provided event name and scope name.
- The options parameter is overloaded, meaning that it is modified by reference during the operation.
- After removing listeners, the method inserts properties into the options object:
    - rows: A list of removed registrations.
    - event: The name of the event where the operation was performed.
    - scope: The name of the scope to which the event belongs.

```Js
// Define event name and scope name
const eventName = 'exampleEvent';
const scopeName = 'exampleScope';

// Define options object
let options = {
    index: 0,   // Starting index for removal
    count: 2    // Number of registrations to remove
};

// Call unsubscribe method
emitter.unsubscribe(eventName, scopeName, options);

// Access affected values from the options object
console.log('Rows removed:', options.rows);
console.log('Event:', options.event);
console.log('Scope:', options.scope);
```
In this example, the unsubscribe method is called to remove listeners from the 'exampleEvent' in the 'exampleScope'. The options object is passed by reference, and after the operation, it contains information about the removed registrations, the event name, and the scope name.

Overall, the KsDp library provides a robust solution for implementing the Observer pattern in JavaScript applications. It offers powerful features for managing events and subscribers within different scopes, allowing for flexible and efficient event-driven communication between components.

You might be interested in the following topics:

- [Hook](./integration.hook.md) is a publish/subscribe pattern, which allows a number of observer objects to see an event.
- [Emitter](./behavioral.emitter.md) extension of the Node.Js EventEmitter.
