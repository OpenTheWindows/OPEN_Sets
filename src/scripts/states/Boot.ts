module OPENSets.State {
  export class Boot extends Phaser.State {
    preload(): void {
      // Load pairs from json
      this.load.text('pairs', 'assets/pairs.json');

      //Load happy animations from json
      this.load.text('happy-animations', 'assets/happy-animations.json');

      this.load.image('loader', 'assets/images/loader.png');

      this.load.image('sets-logo', 'assets/images/sets-logo.png');
      this.load.spritesheet('play-button', 'assets/images/play-button.png', 160, 160);
      this.load.image('frame', 'assets/images/frame.png');
      this.load.spritesheet('next-button', 'assets/images/next-button.png', 254, 141);
      this.load.image('wrong', 'assets/images/wrong.png');

      // Load animations
      this.load.atlasJSONHash(
        'basket',
        'assets/animations/basket.png',
        'assets/animations/basket.json');

      this.load.atlasJSONHash(
        'bear',
        'assets/animations/bear.png',
        'assets/animations/bear.json');

      this.load.atlasJSONHash(
        'bee',
        'assets/animations/bee.png',
        'assets/animations/bee.json');

      this.load.atlasJSONHash(
        'bunny',
        'assets/animations/bunny.png',
        'assets/animations/bunny.json');

      this.load.atlasJSONHash(
        'butterfly',
        'assets/animations/butterfly.png',
        'assets/animations/butterfly.json');

      this.load.atlasJSONHash(
        'cat',
        'assets/animations/cat.png',
        'assets/animations/cat.json');

      this.load.atlasJSONHash(
        'cheerleader',
        'assets/animations/cheerleader.png',
        'assets/animations/cheerleader.json');

      this.load.atlasJSONHash(
        'dance',
        'assets/animations/dance.png',
        'assets/animations/dance.json');

      this.load.atlasJSONHash(
        'exercise',
        'assets/animations/exercise.png',
        'assets/animations/exercise.json');

      this.load.atlasJSONHash(
        'footballer',
        'assets/animations/footballer.png',
        'assets/animations/footballer.json');

      this.load.atlasJSONHash(
        'frog',
        'assets/animations/frog.png',
        'assets/animations/frog.json');

      this.load.atlasJSONHash(
        'happy',
        'assets/animations/happy.png',
        'assets/animations/happy.json');

      this.load.atlasJSONHash(
        'ladybug',
        'assets/animations/ladybug.png',
        'assets/animations/ladybug.json');

      this.load.atlasJSONHash(
        'monkey',
        'assets/animations/monkey.png',
        'assets/animations/monkey.json');

      this.load.atlasJSONHash(
        'mouse',
        'assets/animations/mouse.png',
        'assets/animations/mouse.json');

      this.load.atlasJSONHash(
        'thumbs',
        'assets/animations/thumbs.png',
        'assets/animations/thumbs.json');

      // Load sounds
      this.load.audio('audio-transition', 'assets/sounds/audio-transition.wav');
      this.load.audio('audio-right-option', 'assets/sounds/audio-right-option.mp3');
      this.load.audio('audio-wrong-option', 'assets/sounds/audio-wrong-option.wav');
    }

    create(): void {
      this.game.stage.backgroundColor = 0xFFFFFF;

      this.input.maxPointers = 1;
      this.stage.disableVisibilityChange = true;

      // Responsive Design
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = false;

      this.game.state.start('preload');
    }
  }
}

