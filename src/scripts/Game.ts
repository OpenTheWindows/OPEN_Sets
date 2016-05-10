module OPENSets {
  export class Game extends Phaser.Game {
    constructor() {
      super({
        width: 800,
        height: 600,
        transparent: false,
        enableDebug: true
      });

      this.state.add('boot', State.Boot);
      this.state.add('preload', State.Preload);
      this.state.add('main', State.Main);
      this.state.add('start', State.Start);

      this.state.start('boot');
    }
  }
}
