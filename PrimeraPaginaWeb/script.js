function AlternarVisibilidad(clase) {
  let elementosClase = document.getElementsByClassName(clase);

  if (elementosClase[0].style.visibility=='hidden') {
    for (let i = 0; i < elementosClase.length; i++) {
      elementosClase[i].style.visibility='visible'
    }
  }
  else {
    for (let i = 0; i < elementosClase.length; i++) {
      elementosClase[i].style.visibility='hidden'
    }
  }
}

function AlternarColor() {
  let lista = document.getElementById("lista");
  let elementos = lista.children;
  console.log(elementos.item(0));

  for (let i = 0; i < elementos.length; i++) {
    if (elementos.item(i).className == "like") {
      elementos.item(i).style.color = "green";
    }
    else {
      elementos.item(i).style.color = "red";
    }
  }
}