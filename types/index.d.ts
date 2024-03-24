export namespace common {
    let Loader: typeof import("./src/common/loader");
}
export let inherit: {
    imitate: typeof import("./src/inherit/imitate");
    namespace: typeof import("./src/inherit/namespace");
    ns: typeof import("./src/inherit/namespace");
};
export namespace creational {
    let Factory: typeof import("./src/creational/Factory");
    let FactoryAsync: typeof import("./src/creational/FactoryAsync");
}
export namespace behavioral {
    let StrategyAsync: typeof import("./src/behavioral/StrategyAsync");
    let Strategy: typeof import("./src/behavioral/Strategy");
    let Observer: typeof import("./src/behavioral/Observer");
    let Emitter: typeof import("./src/behavioral/Emitter");
    let Command: typeof import("./src/behavioral/Command");
}
export namespace structural {
    let Proxy: typeof import("./src/structural/Proxy");
}
export namespace integration {
    let IoC: typeof import("./src/integration/IoC");
    let Dip: typeof import("./src/integration/Dip");
    namespace hook {
        let Main: typeof import("./src/integration/hook");
        namespace processor {
            let ProcessorBase: typeof import("./src/integration/hook/processor/ProcessorBase");
        }
        namespace subscriber {
            let SubscriberBase: typeof import("./src/integration/hook/subscriber/SubscriberBase");
            let Memory: typeof import("./src/integration/hook/subscriber/Memory");
        }
        namespace notifier {
            export let NotifierBase: typeof import("./src/integration/hook/notifier/NotifierBase");
            let IoC_1: typeof import("./src/integration/hook/notifier/Ioc");
            export { IoC_1 as IoC };
        }
    }
}
