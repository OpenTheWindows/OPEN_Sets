module OPENSets.Models {
  export class Option {
    public name: string;
    public isCorrect: boolean;

    constructor(name: string, isCorrect: boolean) {
      this.name = name;
      this.isCorrect = isCorrect;
    }
  }
}
