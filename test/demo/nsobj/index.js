const imp = {
    name: "imp",
    count: 5,
    getName: () => {
        return "imp-*";
    }
}

const src = {
    name: "src",
    count: 3,
    getName: () => {
        return "src-*";
    }
}

module.exports = {
    imp,
    src
}