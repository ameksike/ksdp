module.exports = {
    common: {
        Loader: require('./src/common/loader')
    },
    inherit: require('./src/inherit'),
    creational: {
        Factory: require('./src/creational/Factory'),
        FactoryAsync: require('./src/creational/FactoryAsync'),
    },
    behavioral: {
        Strategy: require('./src/behavioral/Strategy'),
        Observer: require('./src/behavioral/Observer'),
        Emitter: require('./src/behavioral/Emitter'),
        Command: require('./src/behavioral/Command')
    },
    structural: {
        Proxy: require('./src/structural/Proxy')
    },
    integration: {
        IoC: require('./src/integration/IoC'),
        Dip: require('./src/integration/Dip'),
        hook: {
            Main: require('./src/integration/hook'),
            processor: {
                ProcessorBase: require('./src/integration/hook/processor/ProcessorBase'),
            },
            subscriber: {
                SubscriberBase: require('./src/integration/hook/subscriber/SubscriberBase'),
                Memory: require('./src/integration/hook/subscriber/Memory')
            },
            notifier: {
                NotifierBase: require('./src/integration/hook/notifier/NotifierBase'),
                IoC: require('./src/integration/hook/notifier/Ioc')
            }
        }
    }
}