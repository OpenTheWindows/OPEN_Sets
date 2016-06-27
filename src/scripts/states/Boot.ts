module OPENSets.State {
  export class Boot extends Phaser.State {
    preload(): void {
      // Load config from json
      this.load.text('config', 'config.json');

      // Load pairs from json
      this.load.text('pairs', 'assets/pairs.json');

      // Load happy animations from json
      this.load.text('happy-animations', 'assets/happy-animations.json');

      this.load.image('loader', 'assets/images/loader.png');
      this.load.image('sets-logo', 'assets/images/sets-logo.png');
      this.load.spritesheet('play-button', 'assets/images/play-button.png', 160, 160);
      this.load.image('frame', 'assets/images/frame.png');
      this.load.spritesheet('next-button', 'assets/images/next-button.png', 254, 141);
      this.load.image('wrong', 'assets/images/wrong.png');

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
