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

        this.ui = {};
        this.ui.G1 = this.createText(200, 30, "Vidas gato 1: ").setScrollFactor(0); // Para quedarse en pantalla
        this.ui.G1.index = 1;
        this.ui.G2 = this.createText(600, 30, "Vidas gato 2: ").setScrollFactor(0);
        this.ui.G2.index = 2;

        this.gato1 = new Cat(this, 400, 300, "cat", 0, 50).setOrigin(0.5, 0.5);
        this.gato2 = new Cat(this, 600, 200, "cat", 0, 100).setOrigin(0.5,0.5);
        this.cameras.main.startFollow(this.gato1);

        this.events.on("loseLife", () => this.updateUI());
    }

    updateUI() {
        this.ui.G1.setText("Vidas gato 1: " + this.gato1.vidas);
        this.ui.G2.setText("Vidas gato 2: " + this.gato2.vidas);
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