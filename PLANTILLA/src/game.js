import Level from "./level.js";
import Title from "./title.js";
import Boot from "./boot.js";
import End from "./end.js";

let config = {
	type: Phaser.AUTO,
	width:  256,
	height: 240,
	pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		mode: Phaser.Scale.FIT,
		min: {
            width: 256,
            height: 240
        },
		max: {
            width:  960, 
            height: 640  
        }
	},
	scene: [Boot, Title, Level, End],	
	physics: { 
		default: 'arcade', 
		arcade: { 
			gravity: { y: 40 }, 
			debug: true 
		} 
	}

};

new Phaser.Game(config);