module OPENSets.State {
    export class Preload extends Phaser.State {

        preload(): void {
            let preloadBar: Phaser.Sprite = this.add.sprite(290, 290, 'preload-bar');
            this.load.setPreloadSprite(preloadBar);
            
            let jsonObject = JSON.parse(this.game.cache.getText('pairs'));
            for (var item of jsonObject.pairs) {
                this.load.image(item.itemOne, item.pathOne);
                this.load.image(item.itemTwo, item.pathTwo);
            }
        }

        create(): void {
            this.game.state.start('start');
        }
    }
}
