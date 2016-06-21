module OPENSets.State {
  export class Boot extends Phaser.State {
    preload(): void {
      // Load pairs from json
      this.load.text('pairs', 'assets/pairs.json');

      this.load.image('loader', 'assets/images/loader.png');

      this.load.image('sets-logo', 'assets/images/sets-logo.png');
      this.load.spritesheet('play-button', 'assets/images/play-button.png', 160, 160);
      this.load.image('frame', 'assets/images/frame.png');
      this.load.spritesheet('next-button', 'assets/images/next-button.png', 254, 141);
      this.load.image('wrong', 'assets/images/wrong.png');

      // Load animations
      this.load.atlasJSONHash(
        'basket-animation',
        'assets/animations/basket-animation.png',
        'assets/animations/basket-animation.json');

      this.load.atlasJSONHash(
        'bear-animation',
        'assets/animations/bear-animation.png',
        'assets/animations/bear-animation.json');

      this.load.atlasJSONHash(
        'bee-animation',
        'assets/animations/bee-animation.png',
        'assets/animations/bee-animation.json');

      this.load.atlasJSONHash(
        'bunny-animation',
        'assets/animations/bunny-animation.png',
        'assets/animations/bunny-animation.json');

      this.load.atlasJSONHash(
        'butterfly-animation',
        'assets/animations/butterfly-animation.png',
        'assets/animations/butterfly-animation.json');

      this.load.atlasJSONHash(
        'cat-animation',
        'assets/animations/cat-animation.png',
        'assets/animations/cat-animation.json');

      this.load.atlasJSONHash(
        'cheerleader-animation',
        'assets/animations/cheerleader-animation.png',
        'assets/animations/cheerleader-animation.json');

      this.load.atlasJSONHash(
        'dance-animation',
        'assets/animations/dance-animation.png',
        'assets/animations/dance-animation.json');

      this.load.atlasJSONHash(
        'exercise-animation',
        'assets/animations/exercise-animation.png',
        'assets/animations/exercise-animation.json');

      this.load.atlasJSONHash(
        'football-animation',
        'assets/animations/football-animation.png',
        'assets/animations/football-animation.json');

      this.load.atlasJSONHash(
        'football-animation',
        'assets/animations/football-animation.png',
        'assets/animations/football-animation.json');

      this.load.atlasJSONHash(
        'frog-animation',
        'assets/animations/frog-animation.png',
        'assets/animations/frog-animation.json');

      this.load.atlasJSONHash(
        'happy-animation',
        'assets/animations/happy-animation.png',
        'assets/animations/happy-animation.json');

      this.load.atlasJSONHash(
        'ladybug-animation',
        'assets/animations/ladybug-animation.png',
        'assets/animations/ladybug-animation.json');

      this.load.atlasJSONHash(
        'monkey-animation',
        'assets/animations/monkey-animation.png',
        'assets/animations/monkey-animation.json');

      this.load.atlasJSONHash(
        'mouse-animation',
        'assets/animations/mouse-animation.png',
        'assets/animations/mouse-animation.json');

      this.load.atlasJSONHash(
        'thumbs-animation',
        'assets/animations/thumbs-animation.png',
        'assets/animations/thumbs-animation.json');

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

