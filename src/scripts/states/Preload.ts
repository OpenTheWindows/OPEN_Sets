module OPENSets.State {
  export class Preload extends Phaser.State {
    private gameState: Helpers.GameState;

    private pairsImagesPrefix: string;
    private animationsPrefix: string;
    private imageSuffix: string = '.png';
    private jsonSuffix: string = '.json';

    constructor() {
      super();
      this.gameState = Helpers.GameState.getInstance();
    }

    preload(): void {
      let preloadBar: Phaser.Sprite = this.add.sprite(this.game.world.centerX - 110, this.game.world.centerY, 'loader');
      this.load.setPreloadSprite(preloadBar);

      let config: any = JSON.parse(this.game.cache.getText('config'));

      this.gameState.wrongTriesTreshold = config.wrongTriesTreshold;
      this.pairsImagesPrefix = config.pairsPath;
      this.animationsPrefix = config.animationsPath;

      let pairs: Array<Models.Pair> = JSON.parse(this.game.cache.getText('pairs'));
      let animations: Array<Models.Animation> = JSON.parse(this.game.cache.getText('happy-animations'));

      for (let pair of pairs) {
        this.load.image(
          pair.itemOne,
          this.pairsImagesPrefix + pair.itemOne + this.imageSuffix);

        this.load.image(
          pair.itemTwo,
          this.pairsImagesPrefix + pair.itemTwo + this.imageSuffix);

        this.gameState.pairs.push(pair);
      }

      for (let animation of animations) {
        this.load.atlasJSONHash(
          animation.name,
          this.animationsPrefix + animation.name + this.imageSuffix,
          this.animationsPrefix + animation.name + this.jsonSuffix);

        this.gameState.animations.push(animation);
      }

      this.gameState.newGame();
    }

    create(): void {
      this.game.state.start('start');
    }
  }
}
