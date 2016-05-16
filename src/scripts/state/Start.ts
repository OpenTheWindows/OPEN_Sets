module OPENSets.State {
  export class Start extends Phaser.State {
    create() {
      this.game.add.sprite(this.game.world.centerX - 256, 0, 'sets-logo');
      var startButton = this.game.add.button(this.game.world.centerX - 64, this.game.world.centerY + 160, "play-button");

      // handle events
      startButton.events.onInputDown.add(() => {
        if (this.game.input.activePointer.isMouse && this.game.input.activePointer.button !== Phaser.Mouse.LEFT_BUTTON) {
          return;
        } else {
          this.game.state.start('mainGame');
        }
      });
      startButton.events.onInputOver.add(() => {
          this.key = "play-button-shadow";
      });
      startButton.events.onInputOut.add(() => {
          this.key = "play-button";
      });
    }
  }
}
