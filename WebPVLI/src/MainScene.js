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

        let gato1 = new Cat(this, 400, 300, "cat", 0, 50).setOrigin(0.5, 0.5);
    }

    update() {
        console.log("update");
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
}