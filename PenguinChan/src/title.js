export default class Title extends Phaser.Scene {
    constructor() {
        super({key: "title"});
    }
    init() {

    }
    preload() {

    }
    create() {
        this.add.text(this.game.config.width/2, this.game.config.height/5, "Penguin-chan\nWars", {fontSize: 68, align: "center",  fontFamily: "babelgam", color: "#0000FF", stroke: "#FFFFFF", strokeThickness: 4}).setOrigin(0.5);
    
        this.options = []
        this.options.push(this.add.text(this.game.config.width/2, this.game.config.height/2 + 50, "1P. Game", {fontSize: 30, align: "center",  fontFamily: "babelgam", color: "#FFFFFF"}).setOrigin(0.5));
        this.options.push(this.add.text(this.game.config.width/2, this.game.config.height/2 + 100, "VS. Game", {fontSize: 30, align: "center",  fontFamily: "babelgam", color: "#FFFFFF"}).setOrigin(0.5));
        this.currentOption = 0;

        this.ball = this.add.image(this.options[this.currentOption].x - 80, this.options[this.currentOption].y, "ball");

        this.wKey = this.input.keyboard.addKey("W");
        this.sKey = this.input.keyboard.addKey("S");
        this.spaceKey = this.input.keyboard.addKey("space");

        this.wKey.on("down", () => this.selectUp());
        this.sKey.on("down", () => this.selectDown());
        this.spaceKey.on("down", () => this.startGame());
    }
    update() {
        
    }

    selectUp() {
        if (this.currentOption > 0) {
            this.currentOption--;
        }
        this.updateSelection();
    }
    selectDown() {
        if (this.currentOption < this.options.length - 1) {
            this.currentOption++;
        }
        this.updateSelection();
    }
    updateSelection() {
        this.ball.y = this.options[this.currentOption].y;
    }
    startGame() {
        this.scene.start("level", {gameMode: this.currentOption})
    }
}