module OPENSets.Helpers {
  export class GameState {
    private static _instance: GameState = new GameState();
    public randomizedPairs: Array<Models.Pair>;
    public wrongTriesTreshold: number;

    public static getInstance(): GameState {
      return GameState._instance;
    }

    constructor() {
      if (GameState._instance) {
        throw new Error('Error: Instantiation failed: Use GameState.getInstance() instead of new.');
      }
      GameState._instance = this;
      this.randomizedPairs = new Array<Models.Pair>();
      this.wrongTriesTreshold = 6;
    }
  }
}
