module OPENSets.State {
  export class MainGame extends Phaser.State {
    public buttonsInitialX: number = 155;
    public buttonsInitialY: number = 500;

    public unhappySound: Phaser.Sound;
    public happySound: Phaser.Sound;
    public transitionSound: Phaser.Sound;

    public wrongOptions: Phaser.Group;
    public triesCounter: Services.TriesCounterService;
    public nextButton: Phaser.Button;

    private randomizedPairs: OPENSets.Models.Pair[];
    private iteration: number;

    nextIteration(): void {
      this.game.state.start('mainGame');
    }

    getNextRandomPair(): OPENSets.Models.Pair {
      this.iteration++;
      this.game.cache['randomizedPairs']
      return this.randomizedPairs[this.iteration - 1];
    }

    create(): void {

      this.iteration = 0;
      this.randomizedPairs = new Array<Models.Pair>();

      let jsonObject = JSON.parse(this.game.cache.getText('pairs'));
      let newPair: Models.Pair;
      for (let item of jsonObject.pairs) {

        newPair = new Models.Pair(item.id);
        newPair.name = item.name;
        newPair.itemOne = item.itemOne;
        newPair.itemTwo = item.itemTwo;
        this.randomizedPairs.push(newPair);
      }

      this.randomizedPairs = Helpers.Helpers.shuffleArray(this.randomizedPairs);

      this.wrongOptions = this.game.add.group();
      this.triesCounter = new Services.TriesCounterService();
      this.drawScene();

      console.log('maingame create');
      console.log(this.randomizedPairs.length);

      let model = this.createNewGameModel(this.getNextRandomPair());

      this.drawOptions(model);

      this.unhappySound = this.add.audio('audio-wrong-option');
      this.happySound = this.add.audio('audio-right-option');
      this.transitionSound = this.add.audio('audio-transition', 1, true);
    }

    createNewGameModel(pair: Models.Pair): Models.GameModel {
      let question: string;
      let rightAnswer = new Models.Option('', true);
      let wrongAnswer1 = new Models.Option('', false);
      let wrongAnswer2 = new Models.Option('', false);
      let wrongAnswerPair1: Models.Pair;
      let wrongAnswerPair2: Models.Pair;

      let randomNumber = Math.random();

      if (randomNumber > 0.5) {
        question = pair.itemOne;
        rightAnswer.name = pair.itemTwo;
      }
      else {
        question = pair.itemTwo;
        rightAnswer.name = pair.itemOne;
      }

      wrongAnswerPair1 = pair;
      wrongAnswerPair2 = pair;
      while (wrongAnswerPair1.name === pair.name
        || wrongAnswerPair2.name === pair.name
        || wrongAnswerPair1.name === wrongAnswerPair2.name) {
        wrongAnswerPair1 = this.randomizedPairs[Math.floor(Math.random() * this.randomizedPairs.length)];
        wrongAnswerPair2 = this.randomizedPairs[Math.floor(Math.random() * this.randomizedPairs.length)];
      }
      wrongAnswer1.name = wrongAnswerPair1.itemOne;
      wrongAnswer2.name = wrongAnswerPair2.itemTwo;

      let options = [rightAnswer, wrongAnswer1, wrongAnswer2];

      options = Helpers.Helpers.shuffleArray(options);

      return new Models.GameModel(question, options);
    }

    drawScene(): void {
      // frame
      let frame: Phaser.Image = this.game.add.image(this.game.world.centerX, 10, 'frame');
      frame.anchor.setTo(0.5, 0);
      frame.scale.setTo(1.1, 1);

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

    drawOptions(model: Models.GameModel): void {
      this.game.add.image(this.game.world.centerX - 280, 80, model.givenItem);

      for (let i: number = 0; i < model.options.length; i++) {
        let optionButton: Phaser.Button = this.game.add.button(
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

    rightPicturePicked(item: Phaser.Button): void {
      let rightOptionTransition: Phaser.Tween = this.game.add.tween(item);
      rightOptionTransition.to({ x: this.game.world.centerX + 25, y: 80 }, 2500, Phaser.Easing.Linear.None, true);
      this.transitionSound.play();
      rightOptionTransition.onComplete.add(() => {
        this.transitionSound.stop();
        this.wrongOptions.destroy();
        this.nextButton.visible = true;
        this.playHappyAnimationAndSound();
      },
        this);
    }

    playHappyAnimationAndSound(): void {
      let happyAnimation: Phaser.Sprite = this.game.add.sprite(
        this.game.world.centerX,
        this.game.world.centerY,
        'happy-animation');
      happyAnimation.anchor.setTo(0.5);
      happyAnimation.animations.add(
        'idle',
        [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1]).onStart.add(() => this.happySound.play(), this);
      happyAnimation.animations.play('idle', 4, false, true).onComplete.add(() => {
        // alert('load new game iteration');
      }, this);
    }

    wrongPicturePicked(item: Phaser.Button): void {
      if (this.triesCounter.isThresholdPassed()) {
        this.disableWrongOptions();
      }
      else {
        this.animateWrongOption(item);
        this.unhappySound.play();
      }
    }

    disableWrongOptions(): void {
      this.wrongOptions.setAll('alpha', 0.5);
      this.wrongOptions.setAll('inputEnabled', false);
    }

    animateWrongOption(item: Phaser.Button): void {
      let x: number = item.x;
      let y: number = item.y;
      item.inputEnabled = false;
      let wrong: Phaser.Image = this.game.add.image(x, y, 'wrong');
      wrong.alpha = 0;
      this.game.add.tween(wrong).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true)
        .onComplete.add(() => {
          wrong.destroy();
          item.inputEnabled = true;
        });
    }
  }
}
