export default class Boot extends Phaser.Scene {
	/**
	 * Constructor de la escena
	 */
	constructor() {
		super({ key: 'boot' });
	}

	// Carga de recursos
	preload(){
		this.load.tilemapTiledJSON('terrain', 'assets/terrain.json');
		this.load.image('tileset', 'assets/tileset.png');

		this.load.spritesheet("player", "assets/player.png", {frameWidth: 14, frameHeight: 14});
		this.load.spritesheet("balloon", "assets/balloon.png", {frameWidth: 12, frameHeight: 12});
		this.load.spritesheet("enemy", "assets/enemy.png", {frameWidth: 16, frameHeight: 16});
	}

	// Creación de la escena.
	create() {
		this.createAnims();

		this.scene.start('title');
	}

	createAnims() {
        let config = {
            key: "playerFly",
            frames: this.anims.generateFrameNumbers("player", {frames: [6,7,8]}),
            frameRate: 24,
            repeat: -1,
        };
		this.anims.create(config);
        config = {
            key: "playerIdle",
            frames: this.anims.generateFrameNumbers("player", {frames: [6]}),
            frameRate: 1,
            repeat: -1,
        };
		config = {
            key: "enemyFly",
            frames: this.anims.generateFrameNumbers("enemy", {frames: [3,4,5]}),
            frameRate: 24,
            repeat: -1,
        };
		this.anims.create(config);
		config = {
            key: "balloonExplosion",
            frames: this.anims.generateFrameNumbers("balloon", {frames: [1]}),
            frameRate: 1,
        };
		this.anims.create(config);
        
    }
}