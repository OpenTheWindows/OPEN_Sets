module OPENSets {
  export class Game extends Phaser.Game {

    constructor(language?: string) {
      super({
        width: 1700,
        height: 820,
        transparent: false,
        enableDebug: true
      });

      this.state.add('boot', State.Boot);
      this.state.add('preload', State.Preload);
      this.state.add('start', State.Start);
      this.state.add('mainGame', State.MainGame);

      this.state.start('boot', true, false, language);
    }
  }
}
