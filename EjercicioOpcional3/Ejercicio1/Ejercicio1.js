"use strict";

const n = 0;
console.log(!!n); // false

const n2 = 8; // Cualquier número distinto de 0
console.log(!!n2); // true

const n3 = NaN;
console.log(!!n3); // false

console.log('\n');

const s = "";
console.log(!!s); // false

const s2 = " "; // Cualquier string no vacío
console.log(!!s2); // true

const s3 = "Hola";
console.log(!!s3); // true

console.log('\n');

const o = null;
console.log(!!o); // false

const o2 = {}; // Cualquier objeto, incluso vacío
console.log(!!o2); // true

const o3 = {nombre: "simón"};
console.log(!!o3); // true

console.log('\n');

const a = []; // Cualquier array, incluso vacío
console.log(!!a); // true 

const a2 = [1, 2, 3];
console.log(!!a2); // true

console.log('\n');

const u = undefined;
console.log(!!u); // false

console.log('\n');

const f = function() {}; // Cualquier función, incluso vacía
console.log(!!f); // true

const f2 = () => {};
console.log(!!f2); // true

const f3 = function hola() { console.log("Hola"); };
console.log(!!f3); // true

console.log('\n');
console.log("Ejemplo héroe:");
console.log('\n');

//const hero = { name: 'Link', weapon: null };
//console.log('Hero weapon power is:', hero.weapon.power); // Error

const hero = { name: 'Link', weapon: null };
if (hero.weapon && hero.weapon.power) { // No llega a comprobar el power
  console.log('Hero weapon power is:', hero.weapon.power);
} else {
  console.log('The hero has no weapon.');
}

console.log('\n');

let v;
function noop() { return; };

if (1 && true && { name: 'Link' }) { // true
    console.log(true);
} else {
    console.log(false);
}
if ([] && null && "Spam!") { // false
    console.log(true);
} else {
    console.log(false);
}
if (null || v || noop || true) { // true
    console.log(true);
} else {
    console.log(false);
}
if (null || v || void "Eggs!" || 0) { // false
    console.log(true);
} else {
    console.log(false);
}

console.log('\n');

function pad(target, targetLengthIn, fillIn) {
  let result = target.toString();
  const targetLength = targetLengthIn || result.length + 1;
  const fill = fillIn || '0';
  while (result.length < targetLength) {
    result = fill + result;
  }
  return result;
}

console.log(pad(50)); // "050"

console.log(pad(50, 4, 2)); // "2250"