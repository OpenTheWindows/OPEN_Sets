module OPENSets.State {
  export class MainGame extends Phaser.State {
    public buttonsInitialX: number = 155;
    public buttonsInitialY: number = 500;

    public unhappySound: Phaser.Sound;
    public happySound: Phaser.Sound;

    public wrongOptionsGroup: Phaser.Group;
    public sceneGroup: Phaser.Group;
    public nextButton: Phaser.Button;

    private mainGameService: Services.MainGameManagementService;

    constructor() {
      super();
      this.mainGameService = new Services.MainGameManagementService();
    }

    create(): void {
      this.sceneGroup = this.game.add.group();
      this.drawScene();

      this.wrongOptionsGroup = this.game.add.group();
      this.drawGameModel();

      this.unhappySound = this.add.audio('audio-wrong-option');
      this.happySound = this.add.audio('audio-right-option');
    }

    drawScene(): void {
      // frame
      let frame: Phaser.Image = this.game.add.image(this.game.world.centerX, 10, 'frame');
      frame.anchor.setTo(0.5, 0);
      frame.scale.setTo(1.1, 1);
      this.sceneGroup.add(frame);

      // horizontal line
      this.drawLine(0, 430, 1700, 430, 2);

      // vertical lines
      this.drawLine(567, 460, 567, 800, 4);
      this.drawLine(1133, 460, 1133, 800, 4);

      this.drawNextButton();
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, width: number): void {
      let graphics: Phaser.Graphics = this.game.add.graphics(0, 0);
      graphics.lineStyle(width, 0xA8A8A8);
      graphics.moveTo(x1, y1);
      graphics.lineTo(x2, y2);
      this.sceneGroup.add(graphics);
    }

    drawGameModel(): void {
      let model: Models.GameModel = this.mainGameService.getRandomGameModel();

      let givenPairItem: Phaser.Image = this.game.add.image(this.game.world.centerX - 280, 80, model.givenPairItem);
      this.sceneGroup.add(givenPairItem);

      let options: Array<Models.Option> = model.getShuffledOptions();
      for (let i: number = 0; i < options.length; i++) {
        let optionButton: Phaser.Button = this.game.add.button(
          this.buttonsInitialX + i * 567,
          this.buttonsInitialY,
          options[i].name);

        if (options[i].isCorrect) {
          optionButton.events.onInputDown.add(this.rightOptionClicked, this);
          this.sceneGroup.add(optionButton);
        }
        else {
          optionButton.events.onInputDown.add(this.wrongOptionClicked, this);
          this.wrongOptionsGroup.add(optionButton);
        }
      }
    }

    drawNextButton(): void {
      this.nextButton = this.game.add.button(
        this.game.world.centerX,
        this.buttonsInitialY + 60,
        'next-button',
        this.nextIteration,
        this,
        0, // over frame
        1, // normal frame
        2); // click frame
      this.nextButton.anchor.setTo(0.5, 0);
      this.nextButton.visible = false;
    }

    nextIteration(): void {
      this.game.state.start('mainGame');
    }

    rightOptionClicked(item: Phaser.Button): void {
      this.mainGameService.iterationFinished();

      let transitionSound: Phaser.Sound = this.add.audio('audio-transition', 1, true);
      item.inputEnabled = false;
      this.disableWrongOptions();
      let rightOptionTransition: Phaser.Tween = this.game.add.tween(item);
      rightOptionTransition.to({ x: this.game.world.centerX + 25, y: 80 }, 2500, Phaser.Easing.Linear.None, true);
      transitionSound.play();
      rightOptionTransition.onComplete.add(() => {
        transitionSound.stop();
        this.wrongOptionsGroup.destroy();

        if (!this.mainGameService.isGameFinished()) {
          this.playHappyAnimationAndSound();
        }
        else {
          this.playFinalAnimationAndSound();
        }
      },
        this);
    }

    playHappyAnimationAndSound(): void {
      let model: Models.Animation = this.mainGameService.getRandomAnimation();

      let happyAnimation: Phaser.Sprite = this.game.add.sprite(
        this.game.world.centerX,
        this.game.world.centerY,
        model.name);

      happyAnimation.anchor.setTo(0.5);
      happyAnimation.animations.add('happy', model.frames).onStart.add(() => {
        this.happySound.play();
        this.sceneGroup.setAll('alpha', 0.2);
      }, this);
      happyAnimation.animations.play('happy', model.frameRate, false, true).onComplete.add(() => {
        this.sceneGroup.setAll('alpha', 1);
        this.nextButton.visible = true;
      }, this);
    }

    playFinalAnimationAndSound(): void {
      let lastAnimation: Array<Models.FinalAnimation> = this.mainGameService.getFinalAnimation();

      for (let i: number = 0; i < lastAnimation.length; i++) {

        let animationName: string = 'finalAnimation' + i;
        let animation: Phaser.Sprite = this.game.add.sprite(
          lastAnimation[i].x,
          lastAnimation[i].y,
          lastAnimation[i].name
        );
        animation.anchor.setTo(0.5);
        animation.animations.add(animationName, lastAnimation[i].frames);

        let isLastAnimation: boolean = (i === lastAnimation.length - 1);

        if (isLastAnimation) {
          animation.animations.getAnimation(animationName)
            .onStart.add(() => this.happySound.play(), this);

          animation.animations.getAnimation(animationName)
            .onComplete.add(() => {
              this.sceneGroup.setAll('alpha', 1);
              this.game.state.start('start');
            }, this);
        }

        this.sceneGroup.setAll('alpha', 0.2);
        animation.animations.play(animationName, lastAnimation[i].frameRate, false);
      }
    }

    wrongOptionClicked(item: Phaser.Button): void {
      if (this.mainGameService.isThresholdPassed()) {
        this.disableWrongOptions();
      }
      else {
        this.animateWrongOption(item);
        this.unhappySound.play();
      }
    }

    disableWrongOptions(): void {
      this.wrongOptionsGroup.setAll('alpha', 0.5);
      this.wrongOptionsGroup.setAll('inputEnabled', false);
    }

    animateWrongOption(item: Phaser.Button): void {
      let wrong: Phaser.Image = this.game.add.image(item.x, item.y, 'wrong');
      wrong.alpha = 0;
      this.game.add.tween(wrong).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true)
        .onComplete.add(() => {
          wrong.destroy();
        });
    }
  }
}
