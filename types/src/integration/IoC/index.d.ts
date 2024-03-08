export = ifaceIoC;
declare const ifaceIoC_base: typeof import("./IoC");
declare class ifaceIoC extends ifaceIoC_base {
    static cls: {
        default: typeof import("./IoC");
        analyzer: {
            Native: typeof import("./analyzer/Native");
        };
        compiler: {
            Native: typeof import("./compiler/Native");
        };
    };
}
