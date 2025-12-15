export default class Button extends Phaser.GameObjects.Sprite {

    constructor(scene, x=0, y=0, texture="button", frame=0){
        super(scene, x, y, texture, frame)

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setImmovable(true);
    }
}