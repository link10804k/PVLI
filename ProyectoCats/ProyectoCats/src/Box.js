export default class Box extends Phaser.GameObjects.Sprite {

    constructor(scene, x=0, y=0, texture="box", frame=0){
        super(scene, x, y, texture, frame)

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setFriction(0.1, 0.1);

        this.setInteractive();

        this.on("pointerdown", ()=>{
            this.body.velocity = 0;
            this.body.enable = false;
            this.play("boxExplode");
            this.on('animationcomplete', ()=>{
                this.destroy();
            });
        });
    }
}