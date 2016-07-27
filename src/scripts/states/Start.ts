module OPENSets.State {
  export class Start extends Phaser.State {
    private startService: Services.StartManagementService;

    constructor() {
      super();
      this.startService = new Services.StartManagementService();
    }

    startGame(): void {
      if (this.game.input.activePointer.isMouse && this.game.input.activePointer.button !== Phaser.Mouse.LEFT_BUTTON) {
        return;
      }

      this.startService.prepareNewGame();
      this.game.state.start('mainGame');
    }

    create(): void {
      let logo: Phaser.Sprite = this.game.add.sprite(this.game.world.centerX, 30, 'sets-logo');
      logo.anchor.setTo(0.5, 0);

      let startButton: Phaser.Button = this.game.add.button(
        this.game.world.centerX,
        this.game.world.centerY + 190,
        'play-button',
        this.startGame,
        this,
        0, // over frame
        1, // normal frame
        2); // click frame

      startButton.anchor.setTo(0.5, 0);
    }
  }
}
