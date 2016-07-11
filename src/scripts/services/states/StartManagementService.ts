module OPENSets.Services {
  export class StartManagementService {

    private statisticsService: Services.StatisticsService;
    private gameState: Helpers.GameState;

    constructor() {
      this.gameState = Helpers.GameState.getInstance();
      this.statisticsService = Services.StatisticsService.getInstance();
    }

    prepareNewGame(): void {
      this.gameState.prepareNewGame();
      this.statisticsService.startGame();
    }
  }
}
