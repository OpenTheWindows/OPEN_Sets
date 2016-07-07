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
      this.statisticsService = new Services.StatisticsService();
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

    getRandomAnimation(): Models.Animation {
      return this.gameState.getAnimation();
    }

    gameFinished(): void {
      this.statisticsService.endGame();
    }

    iterationFinished(misses: number): void {
      this.statisticsService.updateGame(misses);
    }
  }
}
