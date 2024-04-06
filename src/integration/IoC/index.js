class ifaceIoC extends require('./IoC') {
    static cls = {
        Default: require('./IoC'),
        Sync: require('./IoC'),
        Async: require('./IoCAsync'),
        analyzer: {
            Native: require('./analyzer/Native')
        },
        compiler: {
            Native: require('./compiler/Native'),
            NativeAsync: require('./compiler/NativeAsync'),
        }
    }
}
module.exports = ifaceIoC;