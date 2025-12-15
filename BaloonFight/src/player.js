import Balloon from "./balloon.js";

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.speed = 75;
        this.body.setMaxVelocity(100, 100);

        this.zKey = this.scene.input.keyboard.addKey("Z");
        this.leftKey  = this.scene.input.keyboard.addKey("left");
        this.rightKey  = this.scene.input.keyboard.addKey("right");

        this.balloon = new Balloon(scene, 0, 0, "balloon", 0, this);

        this.hasBalloon = true;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        dt /= 1000; 

        if (this.hasBalloon) {
                if (this.zKey.isDown) {
                this.body.setVelocityY(-50);
                this.play("playerFly", true);

                if (this.leftKey.isDown) {
                    this.body.velocity.x -= this.speed * dt;
                    this.setFlipX(false);
                }
                else if (this.rightKey.isDown) {
                    this.body.velocity.x += this.speed * dt;
                    this.setFlipX(true);
                }
            }
            else {

            }
        } 
    }

    die() {
        this.hasBalloon = false;

        this.scene.time.addEvent({
            delay: 3000,
            callback: () => {this.scene.defeat();}
        });
        
    }
    loseBalloon() {
        this.hasBalloon = false;
        this.body.setVelocity(0,0);

        this.scene.time.addEvent({
            delay: 3000,
            callback: () => {this.scene.defeat();}
        });
    }
}