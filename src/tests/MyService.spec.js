/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../scripts/services/MyService.ts" />
describe("MyService", function () {
    it("add_2and3_return13", function () {
        var myService = new Services.MyService(2, 3);
        var result = myService.add();
        expect(result).toBe(13);
    });
});

//# sourceMappingURL=MyService.spec.js.map
