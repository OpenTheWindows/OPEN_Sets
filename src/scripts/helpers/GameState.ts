module OPENSets.Helpers {
  export class GameState {
    private static _instance: GameState = new GameState();

    public pairs: Array<Models.Pair>;
    public animations: Array<Models.AnimationModel>;
    public wrongTriesTreshold: number;
    public pairsImagesPrefix: string = 'assets/pairs/';
    public animationsPrefix: string = 'assets/animations/';
    public imageSuffix: string = '.png';
    public jsonSuffix: string = '.json';

    public static getInstance(): GameState {
      return GameState._instance;
    }

    constructor() {
      if (GameState._instance) {
        throw new Error('Error: Instantiation failed: Use GameState.getInstance() instead of new.');
      }

      GameState._instance = this;
      this.pairs = new Array<Models.Pair>();
      this.animations = new Array<Models.AnimationModel>();
      this.wrongTriesTreshold = 6;
    }
  }
}
