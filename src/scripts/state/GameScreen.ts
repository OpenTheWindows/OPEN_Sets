module OPENSets.State {
  var mainPicture, firstPicture, secondPicture, thirdPicture;

  export class GameScreen extends Phaser.State {


    create() {
      var thing: String = 'code !';
      // this.add.text(10, 10, `Game screen ${thing}`, { font: '65px Arial' });
      mainPicture = this.game.add.image(600, 50, 'main-picture');
      firstPicture = this.game.add.button(70, 500, 'first-picture', this.WrongPicturePicked, this, 2, 1, 0);
      secondPicture = this.game.add.button(750, 450, 'second-picture', this.WrongPicturePicked, this, 2, 1, 0);
      thirdPicture = this.game.add.button(1300, 480, 'third-picture', this.RightPicturePicked, this, 2, 1, 0);

      this.game.add.image(580, 10, 'frame');
      this.game.add.image(1200, 455, 'vertical-line');
      this.game.add.image(550, 455, 'vertical-line');
      this.game.add.image(80, 425, 'horizontal-line');


      //=============
      thirdPicture.inputEnabled = true;
      thirdPicture.input.enableDrag(true);
      thirdPicture.input.enableSnap(90, 90, false, true);
      thirdPicture.events.onDragStop.add(this.fixLocation);
    }

    WrongPicturePicked() {
      alert("Одбравте погрешен предмет, обидете се повторно :) ");
    }

    RightPicturePicked() {
      alert("Успешно одбран објект :)");
    }

    fixLocation(item) {
      item.x = 1320;
      item.y = 65;
    }
  }
}
