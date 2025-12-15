export default class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "ball")

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.speed = 75;

        this.followedCharacter = null;
    }
    push(yDir) {
        this.followedCharacter = null;
        this.body.setVelocityY(this.speed * yDir);

        this.scene.inTable(this);
    }
    lockPos(character) {
        this.followedCharacter = character;
    }
    preUpdate() {
        if (this.followedCharacter != null) {
            this.x = this.followedCharacter.x;
            this.y = this.followedCharacter.y - 10;
        }
    }
}