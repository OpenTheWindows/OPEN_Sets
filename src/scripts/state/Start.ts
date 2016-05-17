module OPENSets.State {
    export class Start extends Phaser.State {
        startGame() {
            if (this.game.input.activePointer.isMouse && this.game.input.activePointer.button !== Phaser.Mouse.LEFT_BUTTON) {
                return;
            }
            else {
                this.game.state.start('mainGame');
            }
        }
        create() {
            this.game.add.sprite(this.game.world.centerX - 256, 0, 'sets-logo');
            let startButton = this.game.add.button(this.game.world.centerX - 64, this.game.world.centerY + 160, "play-button", this.startGame, this, 0, 1, 0);
        }
    }
}