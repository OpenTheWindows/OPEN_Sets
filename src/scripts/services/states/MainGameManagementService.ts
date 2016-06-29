module OPENSets.Services {
  export class MainGameManagementService {

    private triesCounter: Services.TriesCounterService;
    private gameModelGenerationService: Services.GameModelGenerationService;
    private gameState: Helpers.GameState;

    constructor() {
      this.gameState = Helpers.GameState.getInstance();
      this.gameModelGenerationService = new Services.GameModelGenerationService();
      this.triesCounter = new Services.TriesCounterService(this.gameState.getWrongTriesTreshold());
    }

    isThresholdPassed(): boolean {
      return this.triesCounter.isThresholdPassed();
    }

    getGameModelForThisIteration(): Models.GameModel {
      this.triesCounter.reset();
      return this.gameModelGenerationService.generateGameModelForPair(
        this.gameState.getCurrentPair(),
        this.gameState.getAllPairs());
    }

    isGameFinished(): boolean {
      return this.gameState.isGameFinished();
    }

    getAnimation(): Models.Animation {
      return this.gameState.getAnimation();
    }
  }
}
