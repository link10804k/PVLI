export default class Box extends Phaser.GameObjects.Sprite {
    constructor(scene, x=0, y=0, texture="box", frame=0){
        super(scene, x, y, texture, frame)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this)   
        this.body.setDragX(20)

        this.neededHits = 5;
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    hit() {
        this.neededHits--;
        if(this.neededHits <= 0) {
            this.destroy();
        }
    }
}
