export default class Level extends Phaser.Scene {
    constructor(){
        super({ key: 'level' });
    }
    
    init(data) {

    }

    preload() {

    }

    create() {
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                if (Phaser.Math.Between(0, 1) == 0) {
                    this.victory();
                }
                else {
                    this.defeat();
                }
            }
        })
    }

    update(t, dt) {

    }

    victory() {
        this.scene.start('end',  {hasWon: true});
    }

    defeat() {
        this.scene.start('end', {hasWon: false});
    }
}