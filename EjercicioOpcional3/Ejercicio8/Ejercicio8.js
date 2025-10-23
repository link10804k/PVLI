function dice(sides) {
  const result = Math.floor(Math.random() * sides) + 1;
  this.history.push(result);
  return result;
}
function bind(func, context) {
  const args = Array.prototype.slice.call(arguments, 2);

  function boundFunction() {
    return func.apply(context, args);
  }
  return boundFunction;
}
const obj = { history: [] };
const d20 = bind(dice, obj, 20); // fíjate en que ahora dice es el primer parámetro

console.log(d20());

