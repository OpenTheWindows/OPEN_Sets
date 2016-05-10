module OPENSets.State {
  export class Main extends Phaser.State {
    create() {
      this.game.state.start('start');
    }
  }
}
