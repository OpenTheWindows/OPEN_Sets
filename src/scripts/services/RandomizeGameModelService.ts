module OPENSets.Services {
  export class RandomizeGameModelService {
    private gameState: Helpers.GameState;

    constructor() {
      this.gameState = Helpers.GameState.getInstance();
    }

    public randomize(gameModel: Models.GameModel): Models.GameModel {

      let randomNumber: number = Math.random();
      let wrongOptionPair1: Models.Pair;
      let wrongOptionPair2: Models.Pair;

      if (randomNumber > 0.5) {
        gameModel.givenPairItem = gameModel.pair.itemOne;
        gameModel.rightOption.name = gameModel.pair.itemTwo;
      }
      else {
        gameModel.givenPairItem = gameModel.pair.itemTwo;
        gameModel.rightOption.name = gameModel.pair.itemOne;
      }

      wrongOptionPair1 = gameModel.pair;
      wrongOptionPair2 = gameModel.pair;
      while (wrongOptionPair1.id === gameModel.pair.id || wrongOptionPair2.id === gameModel.pair.id ||
        wrongOptionPair1.id === wrongOptionPair2.id) {
        wrongOptionPair1 =
          this.gameState.pairs[Math.floor(Math.random() * this.gameState.pairs.length)];
        wrongOptionPair2 =
          this.gameState.pairs[Math.floor(Math.random() * this.gameState.pairs.length)];
      }
      gameModel.wrongOption1.name = wrongOptionPair1.itemOne;
      gameModel.wrongOption2.name = wrongOptionPair2.itemTwo;

      return gameModel;
    }
  }
}
