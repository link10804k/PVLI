export default class Boot extends Phaser.Scene {
	/**
	 * Constructor de la escena
	 */
	constructor() {
		super({ key: 'boot' });
	}

	// Carga de recursos
	preload(){
		
	}

	// Creación de la escena.
	create() {
		this.scene.start('title');
	}
}