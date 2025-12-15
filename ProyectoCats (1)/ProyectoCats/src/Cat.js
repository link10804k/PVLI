import FishBone from "./Fishbone.js";
import GenericPool from "./GenericPool.js";

export default class Cat extends Phaser.GameObjects.Sprite {

    constructor(scene, x=0, y=0, texture="cat", frame=0, speed, pink=false){
        super(scene, x, y, texture, frame)
        this.vidas = 7;

        this.speed = speed;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this)

        this.animID = "";
        var key = {}
        key.a = 'A'
        key.d = 'D'
        key.sh = "Space"

        if(pink){
            this.animID = "_H"
            key.a = 'left'
            key.d = 'right'
            key.sh = 'up'

        }

        this.play("daVueltas"+this.animID)

        this.setInteractive();

        this.on("pointerdown", (pointer)=>{
            this.vidas++;
            this.scene.updateUI();
        })


        this.dKey = this.scene.input.keyboard.addKey(key.d);
        this.aKey = this.scene.input.keyboard.addKey(key.a);
        this.shKey = this.scene.input.keyboard.addKey(key.sh);


        this.dKey.on('down', ()=>{
            this.play("andaR"+this.animID, true)
            this.body.setVelocityX(this.speed)  
        })
        this.dKey.on('up', ()=>{
            this.play("daVueltas"+this.animID, true)
            this.body.setVelocityX(0)  
        })

        this.aKey.on('down', ()=>{
            this.play("andaR"+this.animID, true)
            this.body.setVelocityX(-this.speed)  
        })
        this.aKey.on('up', ()=>{
            this.play("daVueltas"+this.animID, true)
            this.body.setVelocityX(0)  
        })
        
        this.pool = new GenericPool(this.scene, 5, true);

        this.pool.addMultipleEntity(this.crearEspinas());

        
        this.shKey.on('down', ()=>{
            this.pool.spawn(this.x, this.y).push(100,100);
            this.scene.sound.play("meow");
        })
    }


    crearEspinas() {
        let entities = [];
        for(let i=0; i<5; i++) {
            entities.push(new FishBone(this.scene, 0, 0));
        }
        return entities;
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }


}