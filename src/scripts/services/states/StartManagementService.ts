module OPENSets.Services {
  export class StartManagementService {

    private gameState: Helpers.GameState;

    constructor() {
      this.gameState = Helpers.GameState.getInstance();
    }

    prepareNewGame(): void {
      this.gameState.prepareNewGame();
    }
  }
}
