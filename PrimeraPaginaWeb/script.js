function AlternarVisibilidad(clase) {
  let elementosClase = document.getElementsByClassName(clase);

  if (elementosClase[0].firstChild.style.display=='none' || elementosClase[0].style.visibility=='hidden' || elementosClase[0].style.visibility=='') {
    for (let i = 0; i < elementosClase.length; i++) {
      elementosClase[i].firstChild.style.display='inline';
    }
  }
  else {
    for (let i = 0; i < elementosClase.length; i++) {
      elementosClase[i].firstChild.style.display='inline';
      VideoPlay(elementosClase[i].children[0]);
    }
  }
}

function VideoPlay(video) {
  video.style.visibility='visible';
  video.play();
  video.onended = function() {
    video.style.visibility='hidden';
  }
}

function AlternarColor() {
  let lista = document.getElementById("lista");
  let elementos = lista.children;

  if (elementos[0].style.color=='black') {
    for (let i = 0; i < elementos.length; i++) {
      if (elementos[i].className == "like") {
        elementos[i].style.color = "green";
      }
      else {
        elementos[i].style.color = "red";
      }
    }
  }
  else {
    for (let i = 0; i < elementos.length; i++) {
      elementos[i].style.color = "black";
    }
  }
}