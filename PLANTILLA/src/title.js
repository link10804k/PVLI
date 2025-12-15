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
        this.add.text(this.game.config.width / 2, this.game.config.height / 3, "Juego", {fontSize: 32, fontStyle: "bold", align: "center"/*, fontFamily: "babelgum"*/}).setOrigin(0.5);

        // Elegir una de las dos
        this.createStartButtons();
        //this.createStartOptions();
    }

    update(t, dt) {

    }

    startGame(buttonPressed) {
        console.log("Botón presionado: " + buttonPressed.text);
        this.scene.start('level');
    }

    createStartButtons() { // Botón interactuable
        this.startButton1 = this.add.text(this.game.config.width / 2, this.game.config.height / 3 * 2, "Comenzar1", {fontSize: 20, fontStyle: "bold", align: "center"/*, fontFamily: "babelgum"*/}).setOrigin(0.5);
        this.buttonRect1 = this.add.rectangle(this.startButton1.x, this.startButton1.y, this.startButton1.width, this.startButton1.height, "#000000", 0).setOrigin(0.5);;
        this.buttonRect1.setInteractive();

        this.buttonRect1.on("pointerdown", () => this.startGame(this.startButton1));

        this.startButton2 = this.add.text(this.game.config.width / 2, this.game.config.height / 3 * 2 + 40, "Comenzar2", {fontSize: 20, fontStyle: "bold", align: "center"/*, fontFamily: "babelgum"*/}).setOrigin(0.5);
        this.buttonRect2 = this.add.rectangle(this.startButton2.x, this.startButton2.y, this.startButton2.width, this.startButton2.height, "#000000", 0).setOrigin(0.5);;
        this.buttonRect2.setInteractive();

        this.buttonRect2.on("pointerdown", () => this.startGame(this.startButton2));
    }

    createStartOptions() { // Opciones por teclado
        this.startOption1 = this.add.text(this.game.config.width / 2, this.game.config.height / 3 * 2, "Comenzar1", {fontSize: 20, fontStyle: "bold", align: "center"/*, fontFamily: "babelgum"*/}).setOrigin(0.5);
        this.startOption2 = this.add.text(this.game.config.width / 2, this.game.config.height / 3 * 2 + 40, "Comenzar2", {fontSize: 20, fontStyle: "bold", align: "center"/*, fontFamily: "babelgum"*/}).setOrigin(0.5);
        this.optionSelector = this.add.circle(this.startOption1.x - 75, this.startOption1.y, 10).setFillStyle(0xff0000);
        this.options = [this.startOption1, this.startOption2];
        this.currentOption = 0;

        this.wKey = this.input.keyboard.addKey("W");
        this.sKey = this.input.keyboard.addKey("S");
        this.spaceKey = this.input.keyboard.addKey("space");

        this.wKey.on("down", () => {
            if (this.currentOption > 0) {
                this.currentOption--;
                this.changeSelectorPos();
            }
        });

        this.sKey.on("down", () => {
            if (this.currentOption < this.options.length - 1) {
                this.currentOption++;
                this.changeSelectorPos();
            }
        });

        this.spaceKey.on("down", () => {
            this.startGame(this.options[this.currentOption]);
        });
    }

    changeSelectorPos() {
        this.optionSelector.x = this.options[this.currentOption].x - 75;
        this.optionSelector.y = this.options[this.currentOption].y;
    }
}