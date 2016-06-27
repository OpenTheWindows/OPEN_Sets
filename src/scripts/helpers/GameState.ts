module OPENSets.Helpers {
  export class GameState {
    private static _instance: GameState = new GameState();

    public wrongTriesTreshold: number;

    public pairs: Array<Models.Pair>;
    public animations: Array<Models.Animation>;
    public shuffledAnimations: Array<Models.Animation>;

    public static getInstance(): GameState {
      return GameState._instance;
    }

    constructor() {
      if (GameState._instance) {
        throw new Error('Error: Instantiation failed: Use GameState.getInstance() instead of new.');
      }

      GameState._instance = this;
      this.pairs = new Array<Models.Pair>();
      this.animations = new Array<Models.Animation>();
      this.shuffledAnimations = new Array<Models.Animation>();
    }

    newGame(): void {
      this.pairs = Helpers.shuffleArray(this.pairs);
      this.shuffledAnimations = Helpers.shuffleArray(this.animations);

      let animationsLenght: number = this.shuffledAnimations.length;
      let pairsLenght: number = this.pairs.length;

      while (animationsLenght < pairsLenght) {
        animationsLenght += animationsLenght;
        this.shuffledAnimations = this.animations.concat(this.shuffledAnimations);
      }
    }

    getAnimations(): Array<Models.Animation> {
      return this.shuffledAnimations;
    }
  }
}
