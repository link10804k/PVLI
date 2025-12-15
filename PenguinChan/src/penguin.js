import Character from "./character.js";

export default class Penguin extends Character {
    constructor(scene) {
        super(scene, 120, 424, "penguin");

        this.body.setSize(32, 32);

        this.aKey = this.scene.input.keyboard.addKey("A");
        this.dKey = this.scene.input.keyboard.addKey("D");
        this.spaceKey = this.scene.input.keyboard.addKey("space");

        this.canInteract = true;

        this.aKey.on("up", () => {
            this.play("penguinIdle", true);
        });
        this.dKey.on("up", () => {
            this.play("penguinIdle", true);
        });
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (!this.isStunned) {
            if (this.aKey.isDown) {
                this.body.setVelocityX(-this.speed);
                this.play("penguinMove", true);
            }
            else if (this.dKey.isDown) {
                this.body.setVelocityX(this.speed);
                this.play("penguinMove", true);
            }
            else {
                this.body.setVelocityX(0);
                this.play("penguinIdle", true);
            }

            if (this.canInteract && this.spaceKey.isDown) {
                if (this.ball != null) {
                    this.ball.push(-1);
                    this.ball = null;
                    this.coolDown();
                }
                else if (this.ballInRange != null) {
                    this.ball = this.ballInRange;
                    this.ballInRange.lockPos(this);
                    this.coolDown();
                }
            }
        }

        this.ballInRange = null
    }
    coolDown() {
        this.canInteract = false;

        this.scene.time.addEvent({
            delay: 300,
            callback: () => this.canInteract = true
        })
    }
    stun() {
        console.log("se stunnea");

        this.isStunned = true;
        this.scene.time.addEvent({
            delay: 2000,
            callback: () => {
                this.isStunned = false
            }
        }) 

        this.play("penguinStun", true);
    }
}