module OPENSets.State {
  export class Preload extends Phaser.State {
    private gameState: Helpers.GameState;

    constructor() {
      super();
      this.gameState = Helpers.GameState.getInstance();
    }

    preload(): void {
      let preloadBar: Phaser.Sprite = this.add.sprite(this.game.world.centerX - 110, this.game.world.centerY, 'loader');
      this.load.setPreloadSprite(preloadBar);

      let pairs: Array<Models.Pair> = JSON.parse(this.game.cache.getText('globalConfiguration'));
      let newPair: Models.Pair;

      for (let item of pairs) {
        this.load.image(item.itemOne, item.pathOne);
        this.load.image(item.itemTwo, item.pathTwo);

        newPair = new Models.Pair();
        newPair.name = item.name;
        newPair.itemOne = item.itemOne;
        newPair.itemTwo = item.itemTwo;
        this.gameState.randomizedPairs.push(newPair);
      }

      this.gameState.randomizedPairs = Helpers.Helpers.shuffleArray(this.gameState.randomizedPairs);
    }

    create(): void {
      this.game.state.start('start');
    }
  }
}
