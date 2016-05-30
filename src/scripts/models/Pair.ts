module OPENSets.Models {
  export class Pair {
    public id : string;
    public name : string;
    public itemOne : string;
    public itemTwo : string;

    constructor(id : string) {
      this.id = id;
    }
  }
}