module OPENSets.State {
  export class GameScreen extends Phaser.State {

    public mainPicture: Phaser.Image;
    public firstPicture: Phaser.Button;
    public secondPicture: Phaser.Button;
    public thirdPicture: Phaser.Button;

    create() {
      var thing: String = 'code !';
      // this.add.text(10, 10, `Game screen ${thing}`, { font: '65px Arial' });
      this.mainPicture = this.game.add.image(600, 50, 'table');
      this.firstPicture = this.game.add.button(70, 500, 'chicken', this.WrongPicturePicked, this, 2, 1, 0);
      this.secondPicture = this.game.add.button(750, 450, 'second-picture', this.WrongPicturePicked, this, 2, 1, 0);
      this.thirdPicture = this.game.add.button(1300, 480, 'chair', this.RightPicturePicked, this, 2, 1, 0);

      this.game.add.image(580, 10, 'frame');
      this.game.add.image(1200, 455, 'vertical-line');
      this.game.add.image(550, 455, 'vertical-line');
      this.game.add.image(80, 425, 'horizontal-line');


      //=============
      this.thirdPicture.inputEnabled = true;
      this.thirdPicture.input.enableDrag(true);

      this.thirdPicture.events.onInputDown.add(this.fixLocation, this);
      // this.game.time.events.add(Phaser.Timer.SECOND * 1, this.fixLocation1, this);
      // thirdPicture.events.onDragStop.add(this.fixLocation1);
    }

    WrongPicturePicked() {
      alert("Одбравте погрешен предмет, обидете се повторно :) ");
    }

    RightPicturePicked() {
      //   alert("Успешно одбран објект :)");
    }

    fixLocation1(item) {
      item.x = 1320;
      item.y = 65;
    }
    fixLocation(item) {
      //  thirdPicture.events.onDragStop.add(this.fixLocation1);
      // item.x = 1320;
      // item.y = 65;
      this.game.add.tween(item).to({ y: 65, x: 1320 }, 2000, Phaser.Easing.Linear.None, true);
    }
  }
}
