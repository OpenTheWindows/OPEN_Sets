module OPENSets.Services {
  export class MainGameManagementService {

    private triesCounter: Services.TriesCounterService;
    private gameModelGenerationService: Services.GameModelGenerationService;
    private gameState: Helpers.GameState;

    constructor() {
      this.gameState = Helpers.GameState.getInstance();
      this.gameModelGenerationService = new Services.GameModelGenerationService();
      this.triesCounter = new Services.TriesCounterService();
    }

    isThresholdPassed(): boolean {
      return this.triesCounter.isThresholdPassed(this.gameState.getWrongTriesTreshold());
    }

    getTries(): number {
      return this.triesCounter.getTries();
    }

    getRandomGameModel(): Models.GameModel {
      this.triesCounter.reset();
      return this.gameModelGenerationService.generateGameModelForPair(
        this.gameState.getPair(),
        this.gameState.getPairs());
    }

    isGameFinished(): boolean {
      return this.gameState.isGameFinished();
    }

    isLastPair(): boolean {
      return this.gameState.isLastPair();
    }

    getRandomAnimation(): Models.Animation {
      return this.gameState.getAnimation();
    }

      getFinalAnimation(): Models.FinalAnimation[] {
      return this.gameState.getFinalAnimation();
    }
  }
}
