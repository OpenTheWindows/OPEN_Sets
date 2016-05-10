module OPENSets.State {
  export class Boot extends Phaser.State {
    preload() {
      this.load.image('preload-bar', 'assets/images/preloader.gif');

      //======Loading game screen pictures=================
      this.load.image('main-picture', 'assets/images/masa.png');
      this.load.image('first-picture', 'assets/images/petel.png');
      this.load.image('second-picture', 'assets/images/stipka.png');
      this.load.image('third-picture', 'assets/images/stol.png');

      this.load.image('frame', 'assets/images/frame.png');
      this.load.image('vertical-line', 'assets/images/verticalLine.png');
      this.load.image('horizontal-line', 'assets/images/horizontalLine.png');

    }

    create() {
      this.game.stage.backgroundColor = 0xFFFFFF;

      this.input.maxPointers = 1;
      this.stage.disableVisibilityChange = true;

      //===Responsive Design=====
     // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = false;
      //this.scale.setScreenSize();

      this.game.state.start('preload');
    }
  }
}

