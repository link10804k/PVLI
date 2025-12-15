import Balloon from "./balloon.js";

export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, player) {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.speed = Phaser.Math.Between(5, 15);
        this.player = player
        this.scene = scene;

        this.balloon = new Balloon(this.scene, 0, 0, "balloon", 0, this);
        this.hasBalloon = true;
        this.vulnerable = false;
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (this.hasBalloon) {
            let direction = new Phaser.Math.Vector2(this.player.x - this.x, this.player.y - this.y).normalize();

            this.body.setVelocityX(direction.x * this.speed);
            this.body.setVelocityY(direction.y * this.speed);

            this.play("enemyFly", true);

            if (direction.x < 0) {
                this.setFlipX(false);
            }
            else {
                this.setFlipX(true);
            }
        }
        else {
            this.body.setVelocityX(0);
        }
    }   
    loseBalloon() {
        this.hasBalloon = false;
        this.body.setVelocity(0,0);

        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.vulnerable = true;
                this.timeEvent = this.scene.time.addEvent({
                    delay: 10000,
                    callback: () => {
                        this.vulnerable = false;
                        this.hasBalloon = true;
                        this.balloon = new Balloon(this.scene, 0, 0, "balloon", 0, this);
                        this.scene.enemyBalloons.push(this.balloon);
                    }
                });
            }
        })
    }
    tryKill() {
        console.log("intenta matar");
        if (!this.hasBalloon && this.vulnerable) {
            this.die();
            return true;
        }
        else {
            return false;
        }
    }
    die() {
        if (this.timeEvent) {
            this.scene.time.removeEvent(this.timeEvent);
        }
        this.destroy();
    }
}