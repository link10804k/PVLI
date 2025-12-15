export default class Ball extends Phaser.GameObjects.Image {
    constructor(scene, x, y){
        super(scene, x, y, 'ball');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this)

        this.body.setCircle(8)

    }

    preUpdate(){

    }

    push(dir){
        this.body.setVelocityY(dir*60);
        this.body.setBounce(1.05, 1.05)
    }

    stopBall(){
        this.body.setVelocity(0,0);
    }
}