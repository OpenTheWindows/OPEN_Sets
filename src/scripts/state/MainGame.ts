module OPENSets.State {
  export class MainGame extends Phaser.State {

    public mainPicture: Phaser.Image;
    public firstPicture: Phaser.Button;
    public secondPicture: Phaser.Button;
    public thirdPicture: Phaser.Button;

    create() {
      this.drawScene();
      let main = new Models.Option();
      main.name = 'table';

      let first = new Models.Option();
      first.name = 'chicken';
      first.isCorrect = false;

      let second = new Models.Option();
      second.name = 'clothespin';
      second.isCorrect = false;

      let third = new Models.Option();
      third.name = 'chair';
      third.isCorrect = true;

      this.drawSetOptions(main, first, second, third);
    }

    drawScene() {
      var graphics = this.game.add.graphics(0, 0);
      graphics.lineStyle(2, 0xA8A8A8);
      graphics.moveTo(0, 430);
      graphics.lineTo(1700, 430);

      this.game.add.image(this.game.world.centerX - 310, 10, 'frame');
      this.game.add.image(this.game.world.centerX + 283, 455, 'vertical-line');
      this.game.add.image(this.game.world.centerX - 283, 455, 'vertical-line');
    }

    drawSetOptions(main: Models.Option, first: Models.Option, second: Models.Option, third: Models.Option) {
      this.mainPicture = this.game.add.image(this.game.world.centerX - 280, 80, main.name);

      this.firstPicture = this.game.add.button(this.game.world.centerX - 694, 500, first.name, first.isCorrect ? null : this.wrongPicturePicked, this, 2, 1, 0);
      this.secondPicture = this.game.add.button(this.game.world.centerX - 128, 500, second.name, second.isCorrect ? null : this.wrongPicturePicked, this, 2, 1, 0);
      this.thirdPicture = this.game.add.button(this.game.world.centerX + 438, 500, third.name, third.isCorrect ? null : this.wrongPicturePicked, this, 2, 1, 0);

      if (first.isCorrect) {
        this.firstPicture.events.onInputDown.add(this.rightPicturePicked, this);
      }

      if (second.isCorrect) {
        this.secondPicture.events.onInputDown.add(this.rightPicturePicked, this);
      }

      if (third.isCorrect) {
        this.thirdPicture.events.onInputDown.add(this.rightPicturePicked, this);
      }
    }

    wrongPicturePicked() {
      alert("Одбравте погрешен предмет, обидете се повторно :) ");
    }

    rightPicturePicked(item) {
      this.game.add.tween(item).to({ y: 80, x: this.game.world.centerX + 25 }, 2000, Phaser.Easing.Linear.None, true);
    }

  }
}
