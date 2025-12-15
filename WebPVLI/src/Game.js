import MainScene from "./MainScene.js";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    scene: [MainScene]
}

new Phaser.Game(config);