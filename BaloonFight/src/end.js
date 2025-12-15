export default class End extends Phaser.Scene {
    constructor() {
        super({key: "end"});
    }

    init(data) {
        this.hasWon = data.hasWon;
    }

    preload() {

    }

    create() {
        if (this.hasWon) {
            this.victoryScreen();
        }
        else {
            this.defeatScreen();
        }

        // Lógica para volver al menú (timer, pulsar una tecla, etc)

        // Ejemplo por tiempo
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.returnMenu();
            }
        })  
    }

    update(t, dt) {

    }

    defeatScreen() {
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, "GAME OVER", {fontSize: 32, color: "#ffffff", fontFamily: "arcade"}).setOrigin(0.5);
    }

    victoryScreen() {
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, "VICTORY!", {fontSize: 32, color: "#ffffff", fontFamily: "arcade"}).setOrigin(0.5);
    }

    returnMenu() {
        this.scene.start("title");
    }
}