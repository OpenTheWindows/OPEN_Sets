module OPENSets.Helpers {
  export class GameState {
    public randomizedPairs : Array<Models.Pair>;
    private static _instance: GameState = new GameState();

    constructor() {
      if (GameState._instance) {
        throw new Error("Error: Instantiation failed: Use GameState.getInstance() instead of new.");
      }
      GameState._instance = this;
      this.randomizedPairs = new Array<Models.Pair>();
    }

    public static getInstance(): GameState {
      return GameState._instance;
    }
  }
}
