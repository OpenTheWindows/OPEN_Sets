module OPENSets.State {
  export class Preload extends Phaser.State {

    preload(): void {
      let preloadBar: Phaser.Sprite = this.add.sprite(290, 290, 'preload-bar');
      this.load.setPreloadSprite(preloadBar);
    }

    create(): void {
      this.game.state.start('start');
    }
  }
}
