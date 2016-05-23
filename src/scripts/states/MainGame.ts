module OPENSets.State {
  export class MainGame extends Phaser.State {
    public buttonsInitialX: number = 155;
    public buttonsInitialY: number = 500;
    public unhappySound: Phaser.Sound;
    public happySound: Phaser.Sound;
    public transitionSound: Phaser.Sound;
    public wrongOptions: Phaser.Group;
    public triesCounter: Services.TriesCounterService;

    create() {
      this.wrongOptions = this.game.add.group();
      this.triesCounter = new Services.TriesCounterService();
      this.drawScene();

      let model = new Models.GameModel('table', new Array<Models.Option>(
        new Models.Option('chicken', false),
        new Models.Option('clothespin', false),
        new Models.Option('chair', true)));
      this.drawOptions(model);

      this.unhappySound = this.add.audio('audio-wrong-option');
      this.happySound = this.add.audio('audio-right-option');
      this.transitionSound = this.add.audio('audio-transition', 1, true);
    }

    drawScene() {
      // frame
      let frame = this.game.add.image(this.game.world.centerX, 10, 'frame');
      frame.anchor.setTo(0.5, 0);
      frame.scale.setTo(1.1, 1);

      // horizontal line
      this.drawLine(0, 430, 1700, 430, 2);

      // vertical lines
      this.drawLine(567, 460, 567, 800, 4);
      this.drawLine(1133, 460, 1133, 800, 4);
    }

    drawLine(x1, y1, x2, y2, width) {
      let graphics = this.game.add.graphics(0, 0);
      graphics.lineStyle(width, 0xA8A8A8);
      graphics.moveTo(x1, y1);
      graphics.lineTo(x2, y2);
    }

    drawOptions(model: Models.GameModel) {
      this.game.add.image(this.game.world.centerX - 280, 80, model.givenItem);

      for (let i = 0; i < model.options.length; i++) {
        let optionButton = this.game.add.button(
          this.buttonsInitialX + i * 567,
          this.buttonsInitialY,
          model.getOptionName(i));

        if (model.isCorrectOption(i)) {
          optionButton.events.onInputDown.add(this.rightPicturePicked, this);
        }
        else {
          optionButton.events.onInputDown.add(this.wrongPicturePicked, this);
          this.wrongOptions.add(optionButton);
        }
      }
    }

    wrongPicturePicked(item) {
      if (this.triesCounter.isThresholdPassed()) {
        this.disableWrongOptions();
      }
      else {
        this.animateWrongOption(item);
      }
      this.unhappySound.play();
    }

    rightPicturePicked(item) {
      let tween = this.game.add.tween(item);
      tween.to({ x: this.game.world.centerX + 25, y: 80 }, 2500, Phaser.Easing.Linear.None, true);
      this.transitionSound.play();
      tween.onComplete.add(() => {
        this.transitionSound.stop();
        this.wrongOptions.destroy();
        this.playHappyAnimationAndSound();
      }, this);
    }

    playHappyAnimationAndSound(): void {
      let happyAnimation = this.game.add.sprite(
        this.game.world.centerX,
        this.game.world.centerY,
        'happy-animation');
      happyAnimation.anchor.setTo(0.5);
      happyAnimation.animations.add(
        'idle',
        [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1]).onStart.add(() => this.happySound.play(), this);
      happyAnimation.animations.play('idle', 4, false, true).onComplete.add(() => {
        alert('load new game iteration');
      }, this);
    }

    disableWrongOptions(): void {
      this.wrongOptions.setAll('alpha', 0.5);
      this.wrongOptions.setAll('inputEnabled', false);
    }

    animateWrongOption(item: Phaser.Button): void {
      let x = item.x;
      let y = item.y;
      item.inputEnabled = false;
      let sprite = this.game.add.image(x, y, 'wrong');
      sprite.alpha = 0;
      this.game.add.tween(sprite).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true)
        .onComplete.add(() => {
          sprite.destroy();
          item.inputEnabled = true;
        });
    }
  }
}
