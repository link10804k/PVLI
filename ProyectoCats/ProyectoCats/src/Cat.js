export default class Cat extends Phaser.GameObjects.Sprite {

    constructor(scene, x=0, y=0, texture="cat", frame=0, speed){
        super(scene, x, y, texture, frame)
        this.vidas = 7;

        this.speed = speed;
        this.scene.add.existing(this);

        this.scene.physics.add.existing(this);
        this.body.setCircle(20);

        this.animID = "";
        if(this.speed >= 30){
            this.animID = "_H"
        }

        this.play("daVueltas"+this.animID)

        this.setInteractive();

        this.on("pointerdown", (pointer)=>{
            this.vidas++;
            this.scene.updateUI();
        })
        
        //INPUT
        this.wKey = this.scene.input.keyboard.addKey('W');
        this.aKey = this.scene.input.keyboard.addKey('A');
        this.sKey = this.scene.input.keyboard.addKey('S');
        this.dKey = this.scene.input.keyboard.addKey('D');

        this.wKey.on('down', ()=>{
            this.body.setVelocityY(-this.speed);
        })
        this.wKey.on('up', ()=>{
            this.body.setVelocityY(0);
        })
        this.aKey.on('down', ()=>{
            this.body.setVelocityX(-this.speed);
        })
        this.aKey.on('up', ()=>{
            this.body.setVelocityX(0);
        })
        this.sKey.on('down', ()=>{
            this.body.setVelocityY(this.speed);
        })
        this.sKey.on('up', ()=>{
            this.body.setVelocityY(0);
        })
        this.dKey.on('down', ()=>{
            this.body.setVelocityX(this.speed);
        })
        this.dKey.on('up', ()=>{
            this.body.setVelocityX(0);
        })
        
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }


}