//import {MyService} from '../scripts/services/MyService'

describe("MyService", () => {
  it("add_2and3_return13", () => {
    //var myService: MyService = new MyService(2, 3);
    var myService = new Services.MyService(2, 3);
    var result = myService.add();
    expect(result).toBe(13);
  });
});
