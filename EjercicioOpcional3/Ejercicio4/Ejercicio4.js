const ship = { name: 'Death Star' };

function fire(shot) {
  console.log(this.name + ' is firing: ' + shot.toUpperCase() + '!!!');
}

ship.fire; // ¿qué crees que será esto? - Undefined porque ship no tiene la propiedad fire
fire.apply(ship, ['pichium']); // Con apply y con call se puede utilizar fire con el contexto de ship
fire.call(ship, 'pañum'); 