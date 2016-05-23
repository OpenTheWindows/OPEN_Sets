module OPENSets.State {
  export class Boot extends Phaser.State {
    preload(): void {
      this.load.image('preload-bar', 'assets/images/preloader.gif');

      // Load images
      this.load.image('chair', 'assets/images/chair.png');
      this.load.image('chicken', 'assets/images/chicken.png');
      this.load.image('clothespin', 'assets/images/clothespin.png');
      this.load.image('cloud', 'assets/images/cloud.png');
      this.load.image('egg', 'assets/images/egg.png');
      this.load.image('fawn', 'assets/images/fawn.png');
      this.load.image('fork', 'assets/images/fork.png');
      this.load.image('iron', 'assets/images/iron.png');
      this.load.image('ironing-board', 'assets/images/ironing.png');
      this.load.image('key', 'assets/images/key.png');
      this.load.image('knife', 'assets/images/knife.png');
      this.load.image('lock', 'assets/images/lock.png');
      this.load.image('paint-brush', 'assets/images/paint-brush.png');
      this.load.image('paint-pallet', 'assets/images/paint-pallet.png');
      this.load.image('pan', 'assets/images/pan.png');
      this.load.image('pencil', 'assets/images/pencil.png');
      this.load.image('pencil-sharpener', 'assets/images/pencil-sharpener.png');
      this.load.image('shoes', 'assets/images/lock.png');
      this.load.image('soap', 'assets/images/soap.png');
      this.load.image('table', 'assets/images/table.png');
      this.load.image('tap', 'assets/images/tap.png');
      this.load.image('teeth', 'assets/images/teeth.png');
      this.load.image('toothbrush', 'assets/images/toothbrush.png');
      this.load.image('umbrella', 'assets/images/umbrella.png');
      this.load.image('washing-mashine', 'assets/images/washing-mashine.png');
      this.load.image('backpack', 'assets/images/backpack.png');
      this.load.image('basket', 'assets/images/basket.png');
      this.load.image('basketball', 'assets/images/basketball.png');
      this.load.image('fish', 'assets/images/fish.png');
      this.load.image('fishbowl', 'assets/images/fishbowl.png');

      this.load.image('sets-logo', 'assets/images/sets-logo.png');
      this.load.spritesheet('play-button', 'assets/images/play-button.png', 160, 160);
      this.load.image('frame', 'assets/images/frame.png');
      this.load.image('wrong', 'assets/images/wrong.png');

      // Load animations
      this.load.atlasJSONHash(
        'happy-animation',
        'assets/animations/happy-animation.png',
        'assets/animations/happy-animation.json');

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

