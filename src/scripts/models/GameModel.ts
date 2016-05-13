module OPENSets.Models {
  export class GameModel {
    public givenItem: string;
    public options: Option[];

    constructor(givenItem: string, options: Option[]) {
      this.givenItem = givenItem;
      this.options = options;
    }

    getOptionName(index: number): string {
      return this.options[index].name;
    }

    isCorrectOption(index: number): boolean {
      return this.options[index].isCorrect;
    }
  }
}
