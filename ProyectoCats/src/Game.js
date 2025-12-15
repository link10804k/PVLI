import Inicio from "./Inicio.js";
import Level1 from "./Level1.js";

let config = {
	type: Phaser.AUTO,
	width:  600,
	height: 600,
	pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
	scene: [Inicio, Level1],	// Decimos a Phaser cual es nuestra escena, en este caso la escena es un 
												//objeto formado por el método preload y create definidos más abajo en 
												//este mismo archivo

	physics: { 
        default: 'arcade', 
        arcade: { 
            debug: true 
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },

};

new Phaser.Game(config);
