module OPENSets.Models {
  export class GameModel {
    public givenPairItem: string;
    public rightOption: Models.Option = new Models.Option('', true);
    public wrongOption1: Models.Option = new Models.Option('', false);
    public wrongOption2: Models.Option = new Models.Option('', false);

    constructor(public pair: Models.Pair) { }

    public getShuffledOptions(): Array<Models.Option> {
      return Helpers.Helpers.shuffleArray([this.rightOption, this.wrongOption1, this.wrongOption2]);
    }
  }
}
