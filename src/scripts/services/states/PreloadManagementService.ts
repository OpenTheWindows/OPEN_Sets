module OPENSets.Services {
  export class PreloadManagementService {

    private gameState: Helpers.GameState;

    constructor() {
      this.gameState = Helpers.GameState.getInstance();
    }

    setWrongTriesTreshold(treshold: number): void {
      this.gameState.setWrongTriesTreshold(treshold);
    }

    setPairs(pairs: Array<Models.Pair>): void {
      this.gameState.setPairs(pairs);
    }

    setAnimations(animations: Array<Models.Animation>): void {
      this.gameState.setAnimations(animations);
    }
  }
}
