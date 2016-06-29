module OPENSets.Helpers {
  export class GameState {
    private static _instance: GameState = new GameState();

    private iteration: number;
    private wrongTriesTreshold: number;
    private pairs: Array<Models.Pair>;
    private animations: Array<Models.Animation>;
    private shuffledAnimations: Array<Models.Animation>;

    public static getInstance(): GameState {
      return GameState._instance;
    }

    constructor() {
      if (GameState._instance) {
        throw new Error('Error: Instantiation failed: Use GameState.getInstance() instead of new.');
      }
      GameState._instance = this;
    }

    prepareNewGame(): void {
      this.iteration = 0;
      this.pairs = Helpers.shuffleArray(this.pairs);
      this.shuffledAnimations = Helpers.shuffleArray(this.animations);

      let animationsLenght: number = this.shuffledAnimations.length;
      let pairsLenght: number = this.pairs.length;

      while (animationsLenght < pairsLenght) {
        animationsLenght += animationsLenght;
        this.shuffledAnimations = this.animations.concat(this.shuffledAnimations);
      }
    }

    setWrongTriesTreshold(treshold: number): void {
      this.wrongTriesTreshold = treshold;
    }

    getWrongTriesTreshold(): number {
      return this.wrongTriesTreshold;
    }

    setPairs(pairs: Array<Models.Pair>): void {
      this.pairs = pairs;
    }

    getAllPairs(): Array<Models.Pair> {
      return this.pairs;
    }

    getCurrentPair(): Models.Pair {
      return this.pairs[this.iteration++];
    }

    setAnimations(animations: Array<Models.Animation>): void {
      this.animations = animations;
    }

    getAnimation(): Models.Animation {
      return this.shuffledAnimations[this.iteration];
    }

    isGameFinished(): boolean {
      return this.iteration >= this.pairs.length;
    }
  }
}
