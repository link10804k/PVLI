/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
	scene: {
		preload: preload,
		create: create
	}
};

var game = new Phaser.Game(config);

/**
 * Clase que representa un planeta (aunque también la utilizaremos para el Sol)
 * @extends Container
 */
class Planet extends Phaser.GameObjects.Container {
	/**
	 * Constructor de Planeta
	 * @param {Scene} scene Escena en la que aparecerá el enemigo
	 * @param {number} x - coordenada X
	 * @param {number} y - coordenada Y
	 * @param {number} scale - tamaño del planeta
	 * @param {number} speed - velocidad de rotación
	 * @param {string} icon - imagen que queremos que tenga el planeta
	 */
	constructor(scene, x, y, scale, speed, icon) {
		// Separamos el sprite con el aspecto del container
		// de la creación del container
		let aspecto = scene.add.sprite(0, 0, icon); // Coordenada 0,0 de nuestro contenedos
		
		// El contructor de Container recibe scene, x, y, children. children son los GameObject que forman parte del contenedor, por ejemplo nuestro Sprite
		super(scene, x, y, aspecto);
		scene.add.existing(this);
		
		this.scaleX = scale;
		this.scaleY = scale;
		this._speed = speed;
	}
	
	/**
	 * Método que se llama en cada ciclo del motor
	 */
	preUpdate(t, dt) {
		// Para actualizar los hijos hay que llamar al preUpdate manualmente.
		this.iterate( (child) => child.preUpdate(t,dt) );
		// Por supuesto esto tiene la cosa de que para trasladar la Tierra hay que rotar el Sol 
		// pero esa es la gracia del ejemplo: ver cómo se mueve el hijo al mover el padre.
		this.angle += this._speed * dt/1000;
	}

}

/**
 * Método que formará parte de nuestra escena principal como preload
 */
function preload ()
{
	this.load.image('sky', 'assets/space.png');
	this.load.image('earth', 'assets/earth.png');
	this.load.image('moon', 'assets/moon.png');
	this.load.image('sun', 'assets/sun.png');
}

/**
 * Método que formará parte de nuestra escena principal como create
 */
function create ()
{
	// Añadimos el fondo
	this.add.image(0, 0, 'sky').setOrigin(0, 0);
	
	// Creamos el sol, la Tierra y la Tuna (Sol y Tierra son Contenedores de Phaser))
	let sun = new Planet(this, 400, 300, 0.3, 60, 'sun');
	let earth = new Planet(this, 500, 500, 0.2, 120, 'earth');
	let moon = new Phaser.GameObjects.Sprite(this, 800,800, 'moon');
	moon.setScale(0.6);
	
	sun.add(earth); // Ponemos a la Tierra dentro del Sol como hijo
	earth.add(moon); // Ponemos a la Luna dentro de la Tierra como hijo
	
	//sun.setScale(0.5); // Las transformaciones que hagamos al sol también afectarán a los objetos que contiene
}