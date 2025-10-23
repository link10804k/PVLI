"use strict";

// ¿Se te ocurre la manera de hacer que una propiedad pueda ser de sólo lectura?

// Al añadir propiedades a un objeto de esta manera, por defecto son solo de lectura aunque se ponga un setter.

const point = {};
Object.defineProperty(point, '_x', { value: 5 });
Object.defineProperty(point, '_y', { value: 5 });
Object.defineProperty(point, 'x', {
  get: function () {
    return this._x;
  },
  set: function (v) {
    this._x = v;
  }
});
Object.defineProperty(point, 'y', {
  get: function () {
    return this._y;
  },
  set: function (v) {
    this._y = v;
  }
});
point; // no se observan propiedades...

point.x; // ...pero aquí están.
point.y;
 
point.x = 10; // ERROR
point.y = 20; // ERROR