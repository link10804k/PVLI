const hero = {
  name: 'Link',
  hp: 10,
  stamina: 10,
  weapon: { name: 'sword', effect: { hp: -2 } }
};
const enemy = {
  name: 'Ganondorf',
  hp: 20,
  stamina: 5,
  weapon: { name: 'wand', effect: { hp: -1, stamina: -5 } }
};

function attack(character, target) {
  if (character.stamina > 0) {
    console.log(character.name + ' uses ' + character.weapon.name + '!');
    applyEffect(character.weapon.effect, target);
    character.stamina--;
  } else {
    console.log(character.name + ' is too tired to attack!');
  }
}

function applyEffect(effect, target) {
  // Obtiene los nombres de las propiedades del objeto. Búscalo en la MDN.
  const propertyNames = Object.keys(effect);
  for (let i = 0; i < propertyNames.length; i++) {
    const name = propertyNames[i];
    target[name] += effect[name];
  }
}

hero.weapon.effect.hp = 0;
hero.weapon.effect.stamina = -5;

attack(hero, enemy);
attack(enemy, hero);
attack(hero, enemy);
attack(enemy, hero);
attack(hero, enemy);

console.log(enemy.hp); // El enemigo tiene toda la vida pero no puede atacar porque no le queda stamina
