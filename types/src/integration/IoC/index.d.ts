export = ifaceIoC;
declare const ifaceIoC_base: typeof import("./IoC");
declare class ifaceIoC extends ifaceIoC_base {
    static cls: {
        Default: typeof import("./IoC");
        Sync: typeof import("./IoC");
        Async: typeof import("./IoCAsync");
        analyzer: {
            Native: typeof import("./analyzer/Native");
        };
        compiler: {
            Native: typeof import("./compiler/Native");
            NativeAsync: typeof import("./compiler/NativeAsync");
        };
    };
}
