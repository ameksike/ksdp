export let inherit: {
    imitate: typeof import("./src/inherit/imitate");
    namespace: typeof import("./src/inherit/namespace");
    ns: typeof import("./src/inherit/namespace");
};
export namespace creational {
    let Factory: typeof import("./src/creational/Factory");
}
export namespace behavioral {
    let Strategy: typeof import("./src/behavioral/Strategy");
    let Observer: typeof import("./src/behavioral/Observer");
    let Command: typeof import("./src/behavioral/Command");
}
export namespace structural {
    let Proxy: typeof import("./src/structural/Proxy");
}
export namespace integration {
    let IoC: typeof import("./src/integration/IoC/IoC");
    let Dip: typeof import("./src/integration/Dip");
    namespace hook {
        let Main: typeof import("./src/integration/hook");
        namespace subscriber {
            let Memory: typeof import("./src/integration/hook/subscriber/Memory");
        }
        namespace notifier {
            let IoC_1: typeof import("./src/integration/hook/notifier/Ioc");
            export { IoC_1 as IoC };
        }
    }
}
