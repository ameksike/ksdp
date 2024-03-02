The **KsDp.behavioral.Emitter** class is a specialized version of the native Node EventEmitter, designed to provide a familiar API similar to the Observer implementation included in KsDp. This class enhances the EventEmitter functionality by overloading some methods to simplify event subscription and handling.

```Js
const KsDp = require('ksdp');
const emitter = new KsDp.behavioral.Emitter();
```

### Flexible Event Subscription:

The KsDp.behavioral.Emitter class allows listeners to subscribe to events using various approaches. Listeners can be an anonymous function, an object with a method named after the event, or an object with a generic method named "on".

**Anonymous Function:** You can define a subscriber as an anonymous function that directly captures the event. When the event is emitted, the anonymous function is executed, receiving the emitted data as parameters.

```Js
emitter.add((emitter, val1, val2) => { /* ... */ }, "onread");

emitter.add(function(emitter, val1, val2){ /* ... */ }, "my_event");

emitter.subscribe(function(emitter, val1, val2){ /* ... */ }, "my_event");
```

**Object with a method named as event name:** You can define a subscriber as an object with a method as event name to be captured. When the event is emitted, the event name is used to determine the appropriate action and the corresponding method is executed, receiving the emitted data as parameters.

```Js
const listener = {
    onread(emitter, val) {
        /* ... */
    }
}

emitter.add(listener, "onread");

emitter.subscribe(listener, "onread");
```

**Object with a Method Named "on":** Alternatively, you can define a subscriber as an object with a method named **"on"**. This method serves as a generic event handler for multiple events. When the event is emitted, the "on" method is executed, receiving the emitted data as parameters.

```Js
const listener = {
    on(emitter, val) {
        /* ... */
    }
}
emitter.add(listener, "onread");
```

### Multiples subscriptions

```js
emitter.subscribe([
  {
    default(emitter, data) {
      console.log(data.value === 5);
    },
  },
  {
    on(emitter, data) {
      console.log(data.value === 5);
    },
  },
  (emitter, data) => {
    console.log(data.value === 5);
  },
]);

emitter.emit("default", { value: 5 });
```

### Event Emission from Listeners:

Additionally, listeners can emit events directly from within their own event handlers by passing an instance of the KsDp.behavioral.Emitter class as the first parameter. This feature enables listeners to trigger other events seamlessly.

```Js
const listener = {
    on(_emitter, val) {
        /* ... */
        _emitter.add((_emitter_, val) => {/* ... */}, "onread");
    }
}
emitter.add(listener, "onread");
```

### Automatic Error Handling:

The class automatically handles errors that occur during event emission, ensuring that any errors thrown by event handlers are captured and handled gracefully, preventing them from crashing the application.

### Data Storage for Transferred Data:

It provides an option to store the data transferred or emitted during events. This feature allows easy access to the emitted data for further processing or analysis, enhancing the debugging and analysis capabilities of the application.

```js
emitter.emit("onread", { value: 1 });

let data = emitter.get("onread");

console.log(data.value === 1);
```

### Unsubscriptions

The unsubscribe method in the KsDp library allows removing listeners from event registrations. This method accepts parameters such as the event name, subscribers to be removed, and an options object to specify the index and the number of registrations to remove. Additionally, the method overloads the options parameter by passing the affected values by reference. As a result of the operation, the method inserts properties into the options object, including rows (a list of removed registrations), event (the name of the event where the operation was performed), and scope (the name of the scope to which the event belongs).

Here's an explanation of the parameters and the behavior of the unsubscribe method:
Parameters:

- eventName: The name of the event from which listeners will be unsubscribed.
- subscribers: The decorated subscriber instance or array of them to be removed. 
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
emitter.unsubscribe(eventName, null, options);

// Access affected values from the options object
console.log('Rows removed:', options.rows);
console.log('Event:', options.event);
console.log('Scope:', options.scope);
console.log('Count:', emitter.count(eventName));
```

In this example, the unsubscribe method is called to remove listeners from the 'exampleEvent' in the 'exampleScope'. The options object is passed by reference, and after the operation, it contains information about the removed registrations, the event name, and the scope name.

### Mode 
The options parameter in this context has a property called mode, which is a string that determines how the listener should be treated. Here's an explanation of each mode:

- **"once":** If the mode is set to "once", the listener will execute only once. After the listener is invoked for the first time, it will automatically be removed from the event's listener list.

- **"prepend":** If the mode is set to "prepend", the listener will be added to the beginning of the listener list for the specified event. This means that when the event is emitted, the listener with this mode will be executed before any other listeners associated with the same event.

- **Default Behavior:** If the mode is not specified or if it's set to any other value, the listener will behave in the ordinary way. It will be appended to the end of the listener list for the event, and it will execute every time the event is emitted until explicitly removed.

```Js
// Import the EventEmitter module
const KsDp = require('ksdp');

// Create an instance of Emitter
const emitter = new KsDp.behavioral.Emitter();

// Define event handler function
const eventHandler = () => {
    console.log('Event handler executed');
};

// Subscribe to the 'eventName' event with mode 'once'
emitter.subscribe('eventName', eventHandler, { mode: 'once' });

// Subscribe to the 'eventName' event with mode 'prepend'
emitter.subscribe('eventName', eventHandler, { mode: 'prepend' });

// Subscribe to the 'eventName' event with no mode specified (default behavior)
emitter.subscribe('eventName', eventHandler);

// Emit the 'eventName' event
emitter.emit('eventName');

```
In this example, the eventHandler function is subscribed to the 'eventName' event multiple times with different modes. The behavior of each subscription will be determined by the specified mode: "once", "prepend", or the default behavior.


You might be interested in the following topics:

- [Hook](./integration.hook.md) is a publish/subscribe pattern, which allows a number of observer objects to see an event.
- [Observer](./behavioral.observer.md) implements the Observer design pattern.
