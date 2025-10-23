function scheduleTasks(count) {
  for(var i = 1; i <= count; i++) {
    setTimeout(function(i) { // Ejecuta la función una vez ha pasado el tiempo i * 1000ms
      console.log('Executing task', i);
    }.bind(null, i), i * 1000); 
  }
}

scheduleTasks(5); // Resultado esperado: (1 segundo) "Executing task 1" ... (5 segundos) "Executing task 5"

// Resultado real: (1 segundo) "Executing task 6" ... (1 segundo) "Executing task 6"

// ¿Hace lo que esperabas? Si no es así, ¿por qué? ¿cómo lo arreglarías?

// No hace lo que esperaba porque la variable "i" es compartida entre todas las funciones anónimas creadas en el bucle.
// Al finalizar el bucle, "i" vale 6, y estas funciones se ejecutan después del bucle, por lo que todas imprimen 6.

// Para arreglarlo, he utilizado "bind" para pasar "i" como argumento fijo en el momento de la creación de la función anónima.
// De esta manera, cada función tiene su propio valor de "i" cuando se crea.