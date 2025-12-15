export default class Title extends Phaser.Scene {
    constructor(){
        super({ key: "title" });
    }

    init() {

    }

    preload() {

    }

    create() {
        // Título
        this.add.text(this.game.config.width / 2, this.game.config.height / 4, "balloon\nfight", {fontSize: 60, align: "right", fontFamily: "balloonfont", color: "#ff8000"}).setOrigin(0.5);

        // Elegir una de las dos
        this.createStartButtons();
        //this.createStartOptions();
    }

    update(t, dt) {

    }

    startGame() {
        this.scene.start('level');
    }

    createStartButtons() { // Botón interactuable
        this.startButton = this.add.text(this.game.config.width / 2, this.game.config.height / 3 * 2, "Start", {fontSize: 18, align: "center", fontFamily: "arcade"}).setOrigin(0.5);
        this.buttonRect = this.add.rectangle(this.startButton.x, this.startButton.y, this.startButton.width, this.startButton.height, "#000000", 0).setOrigin(0.5);;
        this.buttonRect.setInteractive();

        this.buttonRect.on("pointerdown", () => this.startGame());
    }
}