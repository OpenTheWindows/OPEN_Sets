/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../scripts/services/MyService.ts" />

describe("MyService", () => {
  it("add_2and3_return13", () => {
    var myService = new Services.MyService(2, 3);
    var result = myService.add();
    expect(result).toBe(13);
  });
});
