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
            processor: {
                ProcessorBase: require('ksdp/src/integration/hook/processor/ProcessorBase'),
            },
            subscriber: {
                SubscriberBase: require('ksdp/src/integration/hook/subscriber/SubscriberBase'),
                Memory: require('./src/integration/hook/subscriber/Memory')
            },
            notifier: {
                NotifierBase: require('ksdp/src/integration/hook/notifier/NotifierBase'),
                IoC: require('./src/integration/hook/notifier/Ioc')
            }
        }
    }
}