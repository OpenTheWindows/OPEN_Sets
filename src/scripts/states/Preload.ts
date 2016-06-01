module OPENSets.State {
  export class Preload extends Phaser.State {
    private gameState: Helpers.GameState;

    constructor() {
      super();
      this.gameState = Helpers.GameState.getInstance();
    }

    preload(): void {
      let preloadBar: Phaser.Sprite = this.add.sprite(290, 290, 'preload-bar');
      this.load.setPreloadSprite(preloadBar);

      let globalConfiguration = JSON.parse(this.game.cache.getText('globalConfiguration'));
      let newPair: Models.Pair;

      this.gameState.wrongTriesTreshold = globalConfiguration.wrongTriesTreshold;

      for (var item of globalConfiguration.pairs) {
        this.load.image(item.itemOne, item.pathOne);
        this.load.image(item.itemTwo, item.pathTwo);

        newPair = new Models.Pair(item.id);
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
