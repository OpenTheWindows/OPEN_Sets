module OPENSets.Models {
  export class FinalAnimation {
    constructor(
      public x: number,
      public y: number,
      public name: string,
      public frames: Array<number>,
      public frameRate: number) { }
  }
}
