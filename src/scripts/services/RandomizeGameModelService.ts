module OPENSets.Services {
  export class RandomizeGameModelService {
    private gameState : Helpers.GameState;

    constructor() {
      this.gameState = Helpers.GameState.getInstance();
    }

    public randomize(gameModel: Models.GameModel): Models.GameModel {

      let randomNumber = Math.random();
      var wrongAnswerPair1: Models.Pair;
      var wrongAnswerPair2: Models.Pair;

      if (randomNumber > 0.5) {
        gameModel.question = gameModel.quest.itemOne;
        gameModel.rightAnswer.name = gameModel.quest.itemTwo;
      }
      else {
        gameModel.question = gameModel.quest.itemTwo;
        gameModel.rightAnswer.name = gameModel.quest.itemOne;
      }

      wrongAnswerPair1 = gameModel.quest;
      wrongAnswerPair2 = gameModel.quest;
      while (wrongAnswerPair1.name == gameModel.quest.name || wrongAnswerPair2.name == gameModel.quest.name || wrongAnswerPair1.name == wrongAnswerPair2.name) {
        wrongAnswerPair1 = this.gameState.randomizedPairs[Math.floor(Math.random() * this.gameState.randomizedPairs.length)];
        wrongAnswerPair2 = this.gameState.randomizedPairs[Math.floor(Math.random() * this.gameState.randomizedPairs.length)];
      }
      gameModel.wrongAnswer1.name = wrongAnswerPair1.itemOne;
      gameModel.wrongAnswer2.name = wrongAnswerPair2.itemTwo;

      return gameModel;
    }
  }
}
