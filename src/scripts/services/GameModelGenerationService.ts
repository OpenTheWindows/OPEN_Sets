module OPENSets.Services {
  export class GameModelGenerationService {
    private gameState: Helpers.GameState;

    constructor() {
      this.gameState = Helpers.GameState.getInstance();
    }

    public generateGameModelForPair(pair: Models.Pair): Models.GameModel {
      let gameModel: Models.GameModel = new Models.GameModel(pair);

      this.setRandomMainItemFromThePair(gameModel);
      this.setRandomWrongOptions(gameModel);

      return gameModel;
    }

    private setRandomMainItemFromThePair(gameModel: Models.GameModel): void {
      let randomNumber: number = Math.random();

      if (randomNumber > 0.5) {
        gameModel.givenPairItem = gameModel.pair.itemOne;
        gameModel.rightOption.name = gameModel.pair.itemTwo;
      }
      else {
        gameModel.givenPairItem = gameModel.pair.itemTwo;
        gameModel.rightOption.name = gameModel.pair.itemOne;
      }
    }

    private setRandomWrongOptions(gameModel: Models.GameModel): void {
      let pairs: Array<Models.Pair> = this.gameState.pairs;
      let wrongOptionPair1: Models.Pair = gameModel.pair;
      let wrongOptionPair2: Models.Pair = gameModel.pair;

      while (wrongOptionPair1.id === gameModel.pair.id || wrongOptionPair2.id === gameModel.pair.id ||
        wrongOptionPair1.id === wrongOptionPair2.id) {
        wrongOptionPair1 =
          pairs[Math.floor(Math.random() * pairs.length)];
        wrongOptionPair2 =
          pairs[Math.floor(Math.random() * pairs.length)];
      }

      gameModel.wrongOption1.name = wrongOptionPair1.itemOne;
      gameModel.wrongOption2.name = wrongOptionPair2.itemTwo;
    }
  }
}
