module OPENSets.Services {
  export class TriesCounterService {
    public counter: number;
    private gameState: Helpers.GameState;

    constructor() {
      this.gameState = Helpers.GameState.getInstance();
      this.counter = 0;
    }

    isThresholdPassed(): boolean {
      this.counter++;
      return this.counter >= this.gameState.wrongTriesTreshold;
    }
  }
}
