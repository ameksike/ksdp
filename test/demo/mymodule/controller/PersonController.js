class PersonController {
    init() {
        this.id = '12345';
    }

    getInfo() {
        return "PersonController";
    }

    getName() {
        return this.srvPerson.getName();
    }
}
module.exports = PersonController;