
const KsDp = require('../');
const factory = new KsDp.creational.Factory();

describe('Factory from creational group', () => {
    it("valid build", () => {
        expect(factory).toBeInstanceOf(Object);
    });
});