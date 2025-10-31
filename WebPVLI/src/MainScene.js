import Cat from "./Cat.js";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainScene" });
    }

    init() {
        console.log("init");
    }

    preload() { // Cargar recursos aquí
        console.log("preload");
        this.load.image("background", "./assets/gameAssets/background.jpeg");

        this.load.spritesheet("cat", "./assets/gameAssets/cats.png", {frameWidth: 48, frameHeight: 48});
    }

    create() { // Crear objetos del juego aquí
        this.createAnims();
        console.log("create");
        this.add.image(400, 300, "background").setOrigin(0.5, 0.5);

        let ui = {};
        ui.G1 = this.createText(200, 30, "Vidas gato 1: ").setScrollFactor(0); // Para quedarse en pantalla
        ui.G1.index = 1;
        ui.G2 = this.createText(600, 30, "Vidas gato 2: ").setScrollFactor(0);
        ui.G2.index = 2;

        let gato1 = new Cat(this, 400, 300, "cat", 0, 50, ui.G1).setOrigin(0.5, 0.5);
        let gato2 = new Cat(this, 600, 200, "cat", 0, 100, ui.G2).setOrigin(0.5,0.5);

        this.cameras.main.startFollow(gato1);

        gato1.events.on("loseLife", updateUI);
    }

    updateUI() { // No va :(
        console.log("aaaa");
        ui.G1.setText("Vidas gato 1: " + gato1.vidas);
        ui.G2.setText("Vidas gato 2: " + gato2.vidas);
    }

    update() {
        //console.log("update");
    }

    createAnims() {
        let config = {
            key: "darVueltas",
            frames: this.anims.generateFrameNumbers("cat", {frames: [3, 15, 27, 39]}),
            frameRate: 6,
            repeat: -1,
        };
        this.anims.create(config);
        
        let config2 = {
            key: "caminar",
            frames: this.anims.generateFrameNumbers("cat", {start: 3, end: 5}),
            frameRate: 6,
            repeat: -1
        }
        this.anims.create(config2);
    }

    createText(x, y, message) {
        let text = this.add.text(x, y, message)

        text.setOrigin(0.5,0.5);
        text.setAlign("center");
        

        text.setFont("Comicate")
        text.setFontSize(40);

        text.setColor("Brown");

        // Devolver el objeto Text para poder actualizarlo desde otros objetos
        return text;
    }
}