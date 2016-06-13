module OPENSets.Models {
  export class GameModel {
    public quest: Models.Pair;
    public question: string;
    public rightAnswer: Models.Option = new Models.Option('', true);
    public wrongAnswer1: Models.Option = new Models.Option('', false);
    public wrongAnswer2: Models.Option = new Models.Option('', false);

    constructor(quest: Models.Pair) {
      this.quest = quest;
    }

    public getRandomOptions(): Models.Option[] {
      return Helpers.Helpers.shuffleArray([this.rightAnswer, this.wrongAnswer1, this.wrongAnswer2]);
    }
  }
}
