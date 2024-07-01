var listaFavs = JSON.parse(localStorage.getItem("MonedasFavoritas")) || [];
const tbody = document.querySelector(".tbody_favoritos");

// console.log(tbody);


function actualizar_dom() {
    if (listaFavs == "") {
      // h1 = document.createElement()
      tbody.innerHTML = "No hay ninguna divisa en tu lista de favoritos";
    } else {
      var contador = 0;
      var fechaMonedaAux = listaFavs[0][0];
    console.log("hola")
  tbody.innerHTML = ``
  fechaMonedaAux = ''
  listaFavs.forEach((moneda) => {
  if (fechaMonedaAux != moneda[0] || contador == 0){
    fechaMonedaAux = moneda[0]
    tbody.innerHTML += ` <tr class="fecha">
        <td id="fecha_td" colspan="5">${moneda[0]}</td>
        </tr>
        `;
    contador += 1}

    tbody.innerHTML += `               
                            <tr>
                                <td></td>
                                <td>${moneda[1]}</td>
                                <td>${moneda[2]} </td>
                                <td>${moneda[3]}</td>
                                <td><i onclick = "borrarDivisa(this)" class="fa-solid fa-eraser"></i></td>
                            </tr>`;
  });
}}
function borrarDivisa(e) {
  var trCercano = e.closest('tr')
  var trFechaEncontrada = encontrarFecha(trCercano)
  var fechaEncontrada = trFechaEncontrada.firstElementChild.innerText
  var nombreDivisa = trCercano.firstElementChild.nextElementSibling.innerText
  console.log(fechaEncontrada)
  console.log(nombreDivisa)
  for(const fav of listaFavs) {
    if (fav[0] == fechaEncontrada && fav[1] == nombreDivisa) {
      console.log(fav[0])
      console.log(typeof(fav[0]))
      console.log(typeof(fechaEncontrada))
      console.log(fav[1])

    }
  }
 
  listaFavs = listaFavs.filter(fav => fav[1] !== nombreDivisa || fav[0] !== fechaEncontrada);
  localStorage.setItem("MonedasFavoritas",JSON.stringify(listaFavs))
  actualizar_dom()
}


function encontrarFecha(trCercano) {
  while (!trCercano.classList.contains('fecha')) {
    trCercano = trCercano.previousElementSibling
  }
  return trCercano
}

actualizar_dom()