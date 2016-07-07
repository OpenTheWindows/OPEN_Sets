module OPENSets.State {
  export class Preload extends Phaser.State {
    private preloadService: Services.PreloadManagementService;

    private pairsImagesPrefix: string;
    private animationsPrefix: string;
    private finalAnimationFrameWidth: number;
    private finalAnimationFrameHeight: number;
    private finalAnimationFrameMax: number;
    private imageSuffix: string = '.png';
    private jsonSuffix: string = '.json';

    constructor() {
      super();
      this.preloadService = new Services.PreloadManagementService();
    }

    preload(): void {
      let preloadBar: Phaser.Sprite = this.add.sprite(this.game.world.centerX - 110, this.game.world.centerY, 'loader');
      this.load.setPreloadSprite(preloadBar);

      this.loadCongif();
      this.loadPairs();
      this.loadAnimations();
      this.loadFinalAnimation();
    }

    create(): void {
      this.game.state.start('start');
    }

    loadCongif(): void {
      let config: any = JSON.parse(this.game.cache.getText('config'));

      this.preloadService.setWrongTriesTreshold(config.wrongTriesTreshold);
      this.pairsImagesPrefix = config.pairsPath;
      this.animationsPrefix = config.animationsPath;
      this.finalAnimationFrameWidth = config.finalAnimationFrameWidth;
      this.finalAnimationFrameHeight = config.finalAnimationFrameHeight;
      this.finalAnimationFrameMax = config.finalAnimationFrameMax;
    }

    loadPairs(): void {
      let pairs: Array<Models.Pair> = JSON.parse(this.game.cache.getText('pairs'));

      for (let pair of pairs) {
        this.load.image(
          pair.itemOne,
          this.pairsImagesPrefix + pair.itemOne + this.imageSuffix);

        this.load.image(
          pair.itemTwo,
          this.pairsImagesPrefix + pair.itemTwo + this.imageSuffix);
      }

      this.preloadService.setPairs(pairs);
    }

    loadAnimations(): void {
      let animations: Array<Models.Animation> = JSON.parse(this.game.cache.getText('happy-animations'));

      for (let animation of animations) {
        this.load.atlasJSONHash(
          animation.name,
          this.animationsPrefix + animation.name + this.imageSuffix,
          this.animationsPrefix + animation.name + this.jsonSuffix);
      }

      this.preloadService.setAnimations(animations);
    }

    loadFinalAnimation(): void {
      let lastAnimations: Array<Models.FinalAnimation> = JSON.parse(this.game.cache.getText('final-animation'));

      for (let animation of lastAnimations) {
        this.load.spritesheet(
          animation.name,
          this.animationsPrefix + animation.name + this.imageSuffix,
          this.finalAnimationFrameWidth,
          this.finalAnimationFrameHeight,
          this.finalAnimationFrameMax);
      }

      this.preloadService.setFinalAnimation(lastAnimations);
    }
  }
}
