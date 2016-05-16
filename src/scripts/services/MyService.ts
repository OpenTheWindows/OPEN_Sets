module OPENSets.Services {
  export class MyService {
    constructor(public a: number, public b: number) { }

    add(): number {
      if (this.a < 10) {
        this.a = 10;
      }
      return this.a + this.b;
    }

    multiply(): number {
      return this.a * this.b;
    }
  }
}
