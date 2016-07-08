module OPENSets.Services {
  export class MainGameManagementService {

    private triesCounter: Services.TriesCounterService;
    private gameModelGenerationService: Services.GameModelGenerationService;
    private statisticsService: Services.StatisticsService;
    private gameState: Helpers.GameState;

    constructor() {
      this.gameState = Helpers.GameState.getInstance();
      this.gameModelGenerationService = new Services.GameModelGenerationService();
      this.triesCounter = new Services.TriesCounterService();
      this.statisticsService = Services.StatisticsService.getInstance();
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

    getRandomAnimation(): Models.Animation {
      return this.gameState.getAnimation();
    }

    getFinalAnimation(): Array<Models.FinalAnimation> {
      return this.gameState.getFinalAnimation();
    }

    isGameFinished(): boolean {
      return this.gameState.isGameFinished();
    }

    iterationFinished(): void {
      this.statisticsService.updateGame(this.getTries());

      if (this.isGameFinished()) {
        this.statisticsService.endGame();
      }
    }
  }
}
