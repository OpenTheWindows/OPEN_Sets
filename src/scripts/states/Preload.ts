module OPENSets.State {
  export class Preload extends Phaser.State {
    private gameState : Helpers.GameState;

    constructor() {
      super();
      this.gameState = Helpers.GameState.getInstance();
    }

    preload(): void {
      let preloadBar: Phaser.Sprite = this.add.sprite(290, 290, 'preload-bar');
      this.load.setPreloadSprite(preloadBar);

      let jsonObject = JSON.parse(this.game.cache.getText('pairs'));
      let newPair: Models.Pair;

      for (var item of jsonObject.pairs) {
        this.load.image(item.itemOne, item.pathOne);
        this.load.image(item.itemTwo, item.pathTwo);

        newPair = new Models.Pair(item.id);
        newPair.name = item.name;
        newPair.itemOne = item.itemOne;
        newPair.itemTwo = item.itemTwo;
        this.gameState.randomizedPairs.push(newPair);
      }

      this.gameState.randomizedPairs = Helpers.Helpers.shuffleArray(this.gameState.randomizedPairs);

      //Debug output
      //alert(Helpers.Helpers.arrayContainsDoubles(this.gameState.randomizedPairs));
    }

    create(): void {
      this.game.state.start('start');
    }
  }
}
