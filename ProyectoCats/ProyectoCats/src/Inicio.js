import Cat from "./Cat.js";
import Box from "./Box.js";
import Button from "./Button.js";

export default class Inicio extends Phaser.Scene {

    constructor(){
        super({key: "inicio"})
    }


    init(){
        console.log("init")
    }

    preload(){
        console.log("preload")

        this.load.spritesheet("kitty", "assets/cats.png", {frameWidth: 48, frameHeight: 48});
        this.load.spritesheet("box", "assets/box.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("button", "assets/boton.png", {frameWidth: 56, frameHeight: 36});
    }

    create(){
        this.createAnims();

        //Gatos
        this.garfield = new Cat(this, 200, 200, "kitty", 55, 10);
        this.helloKitty = new Cat(this, 200, 400, "kitty", 0, 100);

        this.box = new Box(this, 400, 200, "box", 0);
        this.button = new Button(this, 400, 400, "button", 0);

        this.physics.add.collider(this.garfield, this.helloKitty);
        this.physics.add.collider(this.garfield, this.box);
        this.physics.add.collider(this.garfield, this.button);
        this.physics.add.collider(this.box, this.helloKitty);
        this.physics.add.collider(this.button, this.helloKitty);

        this.physics.add.overlap(this.box, this.button, () => this.win());

        //Vidas
        this.gLives = this.add.text(0, 0, "vidas: "+this.garfield.vidas, {fontFamily: 'comicate', fontSize: 24, color: '#e29911ff'}).setScrollFactor(0);	
        this.hLives = this.add.text(this.sys.game.canvas.width, 0, "vidas: "+this.helloKitty.vidas, {fontFamily: 'comicate', fontSize: 24, color: '#f977cdff'}).setScrollFactor(0).setOrigin(1,0);
    }

    win() {
        this.button.play("buttonPress", true)
        this.button.on('animationcomplete', ()=>{
            this.button.stop();
            this.button.body.enable = false;
        });
        this.add.text(225, 275, "you win!", {fontFamily: 'comicate', fontSize: 40, color: '#ff00ddff'}).setScrollFactor(0);	
    }

    update(){
       // console.log("update")
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

        let config3 = {
            key: "boxExplode",
            frames : this.anims.generateFrameNumbers("box", {start: 0, end: 4}),
            frameRate: 10,
            repeat: 0, // set to (0) to play once
        };
        this.anims.create(config3);

        let config4 = {
            key: "buttonPress",
            frames : this.anims.generateFrameNumbers("button", {start: 0, end: 4}),
            frameRate: 10,
            repeat: 0, // set to (0) to play once
        };
        this.anims.create(config4);
    }
}