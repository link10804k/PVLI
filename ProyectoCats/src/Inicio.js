import Cat from "./Cat.js";
import Box from "./Box.js"
import Button from "./Button.js";

import Pool from "./GenericPool.js";
import FishBone from "./Fishbone.js";

export default class Inicio extends Phaser.Scene {

    constructor(){
        super({key: "inicio"})

        this.zoneEntered = false;
        this.zoneHasAlreadyEntered = false;
        this.zoneEnteredThisFrame = false;
        this.zoneExitedThisFrame = false;
    }


    init(){
        console.log("init")
    }

    preload(){
        console.log("preload")

        this.load.spritesheet("kitty", "assets/cats.png", {frameWidth: 48, frameHeight: 48});
        this.load.spritesheet("box", "assets/box.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("button", "assets/boton.png", {frameWidth: 56, frameHeight: 36});

        this.load.image("fishbone", "assets/fishbone.png");

        this.load.audio("meow", "assets/meow.mp3");
    }

    create(){
        this.createAnims();

        //Gatos
        this.garfield = new Cat(this, 200, 200, "kitty", 55, 50, false);
        this.helloKitty = new Cat(this, 200, 400, "kitty", 0, 100, true);

        //Vidas
        this.gLives = this.add.text(0, 0, "vidas: "+this.garfield.vidas, 
            {fontFamily: 'comicate', fontSize: 24, color: '#e29911ff'})
            .setScrollFactor(0);	
        this.hLives = this.add.text(this.sys.game.canvas.width, 0, "vidas: "+this.helloKitty.vidas, 
            {fontFamily: 'comicate', fontSize: 24, color: '#f977cdff'})
            .setScrollFactor(0).setOrigin(1,0).setScrollFactor(0);

        this.buttonInfo = this.add.text(this.sys.game.canvas.width/2, 0, "Botón inactivo", 
            {fontFamily: 'comicate', fontSize: 24, color: '#ffffffff'})
            .setScrollFactor(0).setOrigin(0.5,0).setScrollFactor(0);
    
    
        let button = new Button(this, 500, 400, "button");
        let box = new Box(this, 400, 400, "box");

        this.physics.add.overlap(box, this.garfield.pool._group, (box, fishbone)=>{
            box.hit();
            console.log("Box hit!");
            this.garfield.pool.release(fishbone);
        });
        this.physics.add.collider(this.helloKitty, box);
        this.physics.add.overlap(button, box, ()=>{
            this.buttonInfo.setText("Botón activo");
        });

        this.cameras.main.startFollow(this.helloKitty)

        let world1 = this.add.zone(0, 0, 600, 600).setOrigin(0);
        this.physics.add.existing(world1);
        let world2 = this.add.zone(0, 0, 600, 600).setOrigin(0);
        this.physics.add.existing(world2);
        
        this.physics.add.overlap(world1, world2, () => this.fixedUpdate());

        let zone = this.add.zone(0, 300, 200, 200).setOrigin(0.5);
        this.physics.add.existing(zone);
        this.physics.add.overlap(zone, this.helloKitty, () => this.enterZone())
    }

    enterZone() { // Las colisiones se procesan después del update
        this.zoneEntered = true;
        if (!this.zoneHasAlreadyEntered) {
            this.zoneEnteredThisFrame = true;
            this.zoneHasAlreadyEntered = true;     
        }
    }

    fixedUpdate() {
        if (!this.zoneEntered) {
            if (this.zoneHasAlreadyEntered) {
                this.zoneExitedThisFrame = true;
            }
            this.zoneHasAlreadyEntered = false;
        }

        //console.log("---- Update Frame ----");
        //console.log("Zone entered: " + this.zoneEntered);
        //console.log("Zone entered this frame: " + this.zoneEnteredThisFrame);
        //console.log("Zone has already entered: " + this.zoneHasAlreadyEntered);
        //console.log("Zone exited this frame: " + this.zoneExitedThisFrame);

        if (this.zoneEnteredThisFrame) {
            console.log("Hello Kitty ha entrado en la zona!");
        }
        else if (this.zoneExitedThisFrame) {
            console.log("Hello Kitty ha salido de la zona!");
        }

        // Reset flags for next frame

        this.zoneEntered = false;
        this.zoneEnteredThisFrame = false;
        this.zoneExitedThisFrame = false;
    }

    //Actualizar UI
    updateUI(){
        this.gLives.setText("vidas: "+this.garfield.vidas)
        this.hLives.setText("vidas: "+this.helloKitty.vidas)
    }

    createAnims(){
        let config = {
            key: "daVueltas",
            frames: this.anims.generateFrameNumbers("kitty", {frames:[55,67,79,91]}),
            frameRate: 5,
            repeat: -1, // set to (-1) to repeat forever
        };
        let config2 = {
            key: "daVueltas_H",
            frames: this.anims.generateFrameNumbers("kitty", {frames:[3,15,27,39]}),
            frameRate: 5,
            repeat: -1, // set to (-1) to repeat forever
        };
        
        this.anims.create(config);
         this.anims.create(config2);

        this.anims.create({
            key: "andaR",
            frames: this.anims.generateFrameNumbers("kitty", {start: 78, end: 80}),
            frameRate: 5,
            repeat: -1, // set to (-1) to repeat forever
        });
        this.anims.create({
            key: "andaR_H",
            frames: this.anims.generateFrameNumbers("kitty", {start: 27, end: 29}),
            frameRate: 5,
            repeat: -1, // set to (-1) to repeat forever
        });
    }   
}