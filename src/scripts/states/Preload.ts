module OPENSets.State {
  export class Preload extends Phaser.State {
    private gameState: Helpers.GameState;
    private itemPrefix: string = 'assets/pairs/';
    private itemSuffix: string = '.png';

    constructor() {
      super();
      this.gameState = Helpers.GameState.getInstance();
    }

    preload(): void {
      let preloadBar: Phaser.Sprite = this.add.sprite(this.game.world.centerX - 110, this.game.world.centerY, 'loader');
      this.load.setPreloadSprite(preloadBar);

      let pairs: Array<Models.Pair> = JSON.parse(this.game.cache.getText('pairs'));


      for (let pair of pairs) {
        this.load.image(
          pair.itemOne,
          this.gameState.pairsImagesPrefix + pair.itemOne + this.gameState.imageSuffix);

        this.load.image(
          pair.itemTwo,
          this.gameState.pairsImagesPrefix + pair.itemTwo + this.gameState.imageSuffix);

        this.gameState.pairs.push(pair);
      }

      this.gameState.pairs = Helpers.Helpers.shuffleArray(this.gameState.pairs);
    }

    create(): void {
      this.game.state.start('start');
    }
  }
}
