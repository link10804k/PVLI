function devuelveTextoDeAlerta() {
  return "uooooo! Vaya alerta";
}

function desaparece(clase) {
  let elementos = document.getElementsByClassName(clase);

    for (let i = 0; i < elementos.length; i++) {
      elementos[i].style.visibility='hidden';  
    }
}

function reemplazarPorVideo(clase) {
  var elementos = document.getElementsByClassName(clase);
  var padre = elementos[0].parentNode;

  for (let i = 0; i < elementos.length; i++) {
    var video = document.createElement('video');
    video.setAttribute('src', 'assets/fade-away-oooooooooooo.mp4');
    video.setAttribute('class', "emoji");
    video.setAttribute('width', 50);
    video.setAttribute('autoplay', true);
    video.setAttribute('muted', true);
    //video.setAttribute('onpause = "desaparece(video.getAttribute("class"))"', true);
    video.onpause = desaparece("emoji");

    var componente = document.createElement('li');
    componente.appendChild(video);
    
    var elementoAntiguo = elementos[i];
    padre.replaceChild(video, elementos[i]);
    padre.appendChild(elementoAntiguo);
  }
  //desaparece(clase);
}