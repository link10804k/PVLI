export default class FishBone extends Phaser.GameObjects.Image {
    constructor(scene, x=0, y=0, texture="fishbone"){
        super(scene, x, y, texture)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this)   
    }

    preUpdate(t, dt){
    }

    push(x, y){
        this.body.setVelocity(x, y);
        this.setAngle(215);
        this.body.setOffset(10,5)
        this.body.setCircle(5)
    }
}