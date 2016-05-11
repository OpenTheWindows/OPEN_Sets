module OPENSets {
  export class Game extends Phaser.Game {
    constructor() {
      super({
        width: 1700,
        height: 820,
        transparent: false,
        enableDebug: true
      });

      this.state.add('boot', State.Boot);
      this.state.add('preload', State.Preload);
      this.state.add('main', State.Main);
      this.state.add('start', State.Start);
      this.state.add('gameScreen', State.GameScreen);
      this.state.start('boot');
    }
  }
}
