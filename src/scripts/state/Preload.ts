module OPENSets.State {
  export class Preload extends Phaser.State {

    preload() {
      let preloadBar = this.add.sprite(290, 290, 'preload-bar');
      this.load.setPreloadSprite(preloadBar);
    }

    create() {
      this.game.state.start('start');
    }
  }
}
