module.exports = {
    con: {
        dea: "tst",
        des: [1, 2, 3],
        den: {
            ses: {
                l1: 1,
                l2: 2,
                l3: 3
            },
            seo: [1, 2, 3],
            get: function (elm) {
                return elm + "_3";
            }
        }
    },
    get: function (elm) {
        return elm + "_1";
    }
}