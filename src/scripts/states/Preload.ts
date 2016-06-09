module OPENSets.State {
  export class Preload extends Phaser.State {

    preload(): void {
      let preloadBar: Phaser.Sprite = this.add.sprite(this.game.world.centerX - 110, this.game.world.centerY, 'loader');
      this.load.setPreloadSprite(preloadBar);

      let jsonObject = JSON.parse(this.game.cache.getText('pairs'));
      for (let item of jsonObject.pairs) {
        this.load.image(item.itemOne, item.pathOne);
        this.load.image(item.itemTwo, item.pathTwo);
      }
    }

    create(): void {
      this.game.state.start('start');
    }
  }
}
