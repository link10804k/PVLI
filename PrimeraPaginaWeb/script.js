function devuelveTextoDeAlerta() {
  return "uooooo! Vaya alerta";
}

function desapareceClase(clase) {
  let elementos = document.getElementsByClassName(clase);

    for (let i = 0; i < elementos.length; i++) {
      elementos[i].style.visibility='hidden';  
    }
}

function desaparece(id) {
  let elemento = document.getElementById(id);
  elemento.style.visibility='hidden';
}

function reemplazarPorVideo(clase) {
  let elementos = document.getElementsByClassName(clase);
  let padre = elementos[0].parentNode;
  const componentes = [];

  for (let i = 0; i < elementos.length; i++) {
    componentes[i] = (document.createElement('li'));

    const video = document.createElement('video');
    video.setAttribute('src', 'assets/fade-away-oooooooooooo.mp4');
    video.setAttribute('class', "emoji");
    video.setAttribute('width', 50);
    video.setAttribute('autoplay', true);
    video.setAttribute('muted', true);
    video.onpause = "componentes[i].remove()";

    componentes[i].appendChild(video);
    
    let elementoAntiguo = elementos[i];
    padre.replaceChild(componentes[i], elementos[i]);
    padre.appendChild(elementoAntiguo);
  }
  desapareceClase(clase);
}
 
function que(cosa) {
  console.log(cosa);
  console.log(typeof(cosa));
  }