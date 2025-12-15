export default class Balloon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, player) {
        super(scene, x,y , texture, frame);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);

        this.player = player;
    }

    preUpdate(t, dt) {
        this.x = this.player.x;
        this.y = this.player.y - 15;
    }

    explode() {
        this.play("balloonExplosion", true);

        if (!this.timeEvent) {
            this.timeEvent = this.scene.time.addEvent({
                delay: 200,
                callback: () => {
                    this.destroy();
                    this.player.loseBalloon();
                }
            });
        }
    }
}