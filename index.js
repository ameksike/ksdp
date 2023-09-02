module.exports = {
    inherit: require('./src/inherit'),
    creational: {
        Factory: require('./src/creational/Factory')
    },
    behavioral: {
        Strategy: require('./src/behavioral/Strategy'),
        Observer: require('./src/behavioral/Observer'),
        Command: require('./src/behavioral/Command')
    },
    structural: {
        Proxy: require('./src/structural/Proxy')
    },
    integration: {
        IoC: require('./src/integration/IoC/IoC'),
        Dip: require('./src/integration/Dip'),
        hook: {
            Main: require('./src/integration/hook'),
            subscriber: {
                Memory: require('./src/integration/hook/subscriber/Memory')
            },
            notifier: {
                IoC: require('./src/integration/hook/notifier/Ioc')
            }
        }
    }
}