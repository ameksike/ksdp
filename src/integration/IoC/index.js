class ifaceIoC extends require('./IoC') {
    static cls = {
        default: require('./IoC'),
        analyzer: {
            Native: require('./analyzer/Native')
        },
        compiler: {
            Native: require('./compiler/Native')
        }
    }
}
module.exports = ifaceIoC;