class LocalController {
    init() {
        this.id = '12345';
    }

    getInfo() {
        return "LocalController2";
    }
}
module.exports = new LocalController();