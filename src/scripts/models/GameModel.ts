module OPENSets.Models {
  export class GameModel {
    public quest : Models.Pair;
    public question : string;
    public rightAnswer = new Models.Option("", true);
    public wrongAnswer1 = new Models.Option("", false);
    public wrongAnswer2 = new Models.Option("", false);

    constructor(quest : Models.Pair) {
      this.quest = quest;
    }

    public getRandomOptions() : Models.Option[] {
      return Helpers.Helpers.shuffleArray([this.rightAnswer, this.wrongAnswer1, this.wrongAnswer2]);
    }
  }
}
