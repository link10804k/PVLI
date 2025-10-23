function newLog(label) {
  return function() { // Esto devuelve una función anónima
    // ¿Por qué tenemos que hacer esto? - Porque "arguments" no es un array real, entonces no funciona como tal
    const args = Array.prototype.slice.call(arguments); // Esto convierte "arguments" en un array real 
    args.splice(0, 0, label + ':'); // Esto añade "label:" al principio del array
    console.log.apply(console, args); // Esto llama a console.log con el array como lista de argumentos
  }
}

const log1 = newLog('Default');
const log2 = newLog('Ziltoid');

const p = { x: 1, y: 10 };
log1(p);
log2(p);
log1('Greetings', 'humans!');