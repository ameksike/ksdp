The **KsDp.Event** class is a specialized version of the native Node EventEmitter, designed to provide a familiar API similar to the Observer implementation included in KsDp. This class enhances the EventEmitter functionality by overloading some methods to simplify event subscription and handling.

```Js
const KsDp = require('ksdp');
const emitter = new KsDp.behavioral.Event();
```

### Flexible Event Subscription: 
The KsDp.Event class allows listeners to subscribe to events using various approaches. Listeners can be an anonymous function, an object with a method named after the event, or an object with a generic method named "on".


**Anonymous Function:** You can define a subscriber as an anonymous function that directly captures the event. When the event is emitted, the anonymous function is executed, receiving the emitted data as parameters.

```Js
emitter.add((emitter, val1, val2) => { /* ... */ }, "onread");

emitter.add(function(emitter, val1, val2){ /* ... */ }, "my_event");
```

**Object with a method named as event name:** You can define a subscriber as an object with a method as event name to be captured. When the event is emitted, the event name is used to determine the appropriate action and the corresponding method is executed, receiving the emitted data as parameters.

```Js
const listener = {
    onread(emitter, val) {
        /* ... */
    }
}
emitter.add(listener, "onread");
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

### Event Emission from Listeners: 
Additionally, listeners can emit events directly from within their own event handlers by passing an instance of the KsDp.Event class as the first parameter. This feature enables listeners to trigger other events seamlessly.

```Js
const listener = {
    on(emitter, val) {
        /* ... */
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

console.log(
    data.value === 1
)
```

You might be interested in the following topics:

- [Hook](./integration.hook.md) is a publish/subscribe pattern, which allows a number of observer objects to see an event.
- [Event](./behavioral.observer.md) implements the Observer design pattern.
