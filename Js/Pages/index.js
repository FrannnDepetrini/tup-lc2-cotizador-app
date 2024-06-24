var contenedorDivisas = document.querySelector("#divisas");

fetch("https://dolarapi.com/v1/dolares")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((moneda) => {
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
        <a href=""><i class="fa-solid fa-star"></i></a>
        </div>
        `;
    })}
  )


// fetch("https://dolarapi.com/v1/dolares")
//   .then((response) => response.json())
//   .then((data) => {
//     contenedorDivisas.innerHTML += `
//         <div class="oficial">
//         <div class="caja_oficial">
//             <div class="titulo_moneda"><h3>${data[0].nombre}</h3></div>
//             <div class="div_oficial_lista">
//                 <ul>
//                     <li>COMPRA</li>
//                     <li id="precio_${data[0].nombre}">$ ${data[0].compra}</li>
//                 </ul>
//                 <ul>
//                     <li>VENTA</li>
//                     <li id="precio_${data[0].nombre}">$ ${data[0].venta}</li>
//                 </ul>
//             </div>
//         </div>
//         <a href=""><i class="fa-solid fa-star"></i></a>
//         </div>
//         `;
//     })
  
