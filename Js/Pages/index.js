var contenedorDivisas = document.querySelector("#divisas");

var listaFavs = JSON.parse(localStorage.getItem("MonedasFavoritas")) || []



  
  
async function apiDolar() {
  return fetch("https://dolarapi.com/v1/dolares").then((response) =>
    response.json()
  );
  // .then((data) => data
}

async function apiOtros() {
  return fetch("https://dolarapi.com/v1/cotizaciones")
    .then((response) => response.json())
    .then((data) => data.filter((moneda) => moneda.nombre != "Dólar"));
}

async function esperarDatos() {
  try {
    const dolares = await apiDolar();
    const otros = await apiOtros();

    const arreglo = dolares.concat(otros);
    console.log("Hola")
    return arreglo; // Retorna el arreglo completo
  } catch (error) {
    console.error("Error al recopilar los datos:", error);
  }
}



function estaEnFav(moneda) {
  for (let monedaFav of listaFavs) { 
    var fechaActual = new Date().toLocaleDateString()
    // console.log(fechaActual)
    var esFavorito = monedaFav.includes(moneda.nombre) && monedaFav.includes(fechaActual)
    if (esFavorito) {
      return true
    }
  }
  return false
} 

function actualizar_dom() {
  console.log("kaka")
esperarDatos().then((arreglo) => {
  contenedorDivisas.innerHTML = ``;
  arreglo.forEach((moneda) => {
    var esFavorito = estaEnFav(moneda)
    contenedorDivisas.innerHTML += `
      <div class="oficial">
      <div class="caja_oficial">
          <div class="titulo_moneda"><h3>${moneda.nombre}</h3></div>
          <div class="div_oficial_lista">
              <ul>
                  <li>COMPRA</li>
                  <li id="precio_${moneda.nombre}">$ ${moneda.compra}</li>
              </ul>
              <ul>
                  <li>VENTA</li>
                  <li id="precio_${moneda.nombre}">$ ${moneda.venta}</li>
              </ul>
          </div>
      </div>
        <i onclick= "añadirFav(this)" class="${esFavorito ? 'fa-solid fa-star': 'fa-regular fa-star'}"></i>  
      </div>
      `;
    return arreglo;
  });
});
}

function boton_filtrar() {
  const select = document.getElementById("select");
  valorSelect = select.value;
  alert("hola")
  esperarDatos().then((arreglo) => {
    contenedorDivisas.innerHTML = ``;
    if (valorSelect == "Todas") {
      arreglo.forEach((moneda) => {
        var esFavorito = estaEnFav(moneda)
        contenedorDivisas.innerHTML += `
      <div class="oficial">
      <div class="caja_oficial">
          <div class="titulo_moneda"><h3>${moneda.nombre}</h3></div>
          <div class="div_oficial_lista">
              <ul>
                  <li>COMPRA</li>
                  <li id="precio_${moneda.nombre}">$ ${moneda.compra}</li>
              </ul>
              <ul>
                  <li>VENTA</li>
                  <li id="precio_${moneda.nombre}">$ ${moneda.venta}</li>
              </ul>
          </div>
      </div>
        <i onclick= "añadirFav(this)" class="${esFavorito ? 'fa-solid fa-star': 'fa-regular fa-star'}"></i>  
      </div>
      `;
      });
    } else {
      arreglo.forEach((moneda) => {
        var esFavorito = estaEnFav(moneda)
        if (moneda.nombre == valorSelect) {
          contenedorDivisas.innerHTML += `
      <div class="oficial">
      <div class="caja_oficial">
          <div class="titulo_moneda"><h3>${moneda.nombre}</h3></div>
          <div class="div_oficial_lista">
              <ul>
                  <li>COMPRA</li>
                  <li id="precio_${moneda.nombre}">$ ${moneda.compra}</li>
              </ul>
              <ul>
                  <li>VENTA</li>
                  <li id="precio_${moneda.nombre}">$ ${moneda.venta}</li>
              </ul>
          </div>
      </div>
        <i onclick= "añadirFav(this)" class="${esFavorito ? 'fa-solid fa-star': 'fa-regular fa-star'}"></i>  
      </div>
      `;
        }
      });
    }
  });
}

function añadirFav(e) {
  const divisa = e.closest('.oficial')
  const precioCompra = divisa.querySelector(".div_oficial_lista ul li:last-child").innerText
  const precioVenta = divisa.querySelector(".div_oficial_lista ul:last-child li:last-child").innerText
  const nombreDivisa = divisa.querySelector(".titulo_moneda h3").innerText
  const fechaDivisa = new Date().toLocaleDateString()
  const listaDatos = [fechaDivisa,nombreDivisa,precioCompra,precioVenta]
  console.log(listaDatos)
  
  if (e.classList == "fa-regular fa-star") {
    e.classList = "fa-solid fa-star"
    listaFavs.push(listaDatos)
    localStorage.setItem("MonedasFavoritas",JSON.stringify(listaFavs))
  
  }
  else {
    e.classList = "fa-regular fa-star"
    listaFavs = listaFavs.filter(fav => fav[1] !== nombreDivisa)
    localStorage.setItem("MonedasFavoritas",JSON.stringify(listaFavs))
  }
}

// listaPrueba = ['29/06/2024', 'Euro', '500', '600']
// listaFavs.push(listaPrueba)
//   localStorage.setItem("MonedasFavoritas",JSON.stringify(listaFavs))


actualizar_dom()
setInterval(actualizar_dom, 300000)
