var listaFavs = JSON.parse(localStorage.getItem("MonedasFavoritas")) || [];
const tbody = document.querySelector(".tbody_informes");
const select = document.getElementById('select')
const ctx = document.getElementById("miGrafico").getContext("2d");

const modal = document.querySelector(".container_modal")

const closeModal = document.querySelector("#cancelar")




let grupoDeMonedas = {};

var myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [],
        datasets: []
    }
});


function actualizar_dom() {
    if (listaFavs == "") {
        tbody.innerHTML = "No hay ninguna divisa en tu lista de favoritos";
    } else {

        listaFavs.forEach((moneda) => {
            if (!grupoDeMonedas[moneda[1]]) {
                grupoDeMonedas[moneda[1]] = [];
            }
            grupoDeMonedas[moneda[1]].push(moneda);
        });



        let monedasUnicas = Object.keys(grupoDeMonedas);
        tbody.innerHTML = ``


        monedasUnicas.forEach((nombreMoneda) => {
            var precio_anterior = 0
            select.innerHTML += `<option value="${nombreMoneda}">${nombreMoneda}</option>`;

            tbody.innerHTML += `
            <tr class="moneda">
            <td id="moneda_td" colspan="5">${nombreMoneda}</td>
            </tr>
            `;
            grupoDeMonedas[nombreMoneda].forEach((moneda) => {

                let subio = subio_precio(precio_anterior, moneda[2]);

                tbody.innerHTML += `
                    <tr>
                        <td></td>
                        <td>${moneda[0]}</td>
                        <td>${moneda[2]}</td>
                        <td>${moneda[3]}</td>
                        <td><i class="fa-solid fa-circle-arrow-${subio}"></i></td>
                    </tr>
                `;
                precio_anterior = moneda[2].slice(1)
            });
        });

        var etiquetas = [];
        var datosLinea1 = [];
        etiquetas = []



        for (moneda1 of grupoDeMonedas[monedasUnicas[0]]) {
            if (!(moneda1[0] in etiquetas)) {
                myChart.data.labels.push(moneda1[0])

            }
        }


        myChart.data.labels.push(etiquetas)
        monedasUnicas.forEach((monedaUnica) => {

            datosLinea1 = []
            grupoDeMonedas[monedaUnica].forEach((moneda) => {
                datosLinea1.unshift(parseFloat(moneda[2].slice(1)))

            })

            var newDataset = {
                label: monedaUnica,
                data: datosLinea1,
                borderColor: getRandomColor(),
                backgroundColor: getRandomColor(),
                borderWidth: 1,
                fill: false
            };

            myChart.data.datasets.push(newDataset);
            myChart.update();

        })
    }
}


function filtrar_divisa() {
    let monedasUnicas = Object.keys(grupoDeMonedas);
    var valorSelect = select.value
    if (valorSelect == "Todas") {
        tbody.innerHTML = ``
        monedasUnicas.forEach((nombreMoneda) => {
            var precio_anterior = 0
            tbody.innerHTML += `
            <tr class="moneda">
            <td id="moneda_td" colspan="5">${nombreMoneda}</td>
            </tr>
            `;
            grupoDeMonedas[nombreMoneda].forEach((moneda) => {

                let subio = subio_precio(precio_anterior, moneda[2]);

                tbody.innerHTML += `
                    <tr>
                        <td></td>
                        <td>${moneda[0]}</td>
                        <td>${moneda[2]}</td>
                        <td>${moneda[3]}</td>
                        <td><i class="fa-solid fa-circle-arrow-${subio}"></i></td>
                    </tr>
                `;
                precio_anterior = moneda[2].slice(1)
            });
        });

        var etiquetas = [];
        var datosLinea1 = [];
        etiquetas = [];
        myChart.data.labels = [];
        myChart.data.datasets = [];



        for (moneda1 of grupoDeMonedas[monedasUnicas[0]]) {
            if (!(moneda1[0] in etiquetas)) {
                myChart.data.labels.push(moneda1[0])

            }
        }

        myChart.data.labels.push(etiquetas)
        monedasUnicas.forEach((monedaUnica) => {

            datosLinea1 = []
            grupoDeMonedas[monedaUnica].forEach((moneda) => {
                datosLinea1.unshift(parseFloat(moneda[2].slice(1)))

            })

            var newDataset = {
                label: monedaUnica,
                data: datosLinea1,
                borderColor: getRandomColor(),
                backgroundColor: getRandomColor(),
                borderWidth: 1,
                fill: false
            };

            myChart.data.datasets.push(newDataset);
            myChart.update();

        })

    } else {
        tbody.innerHTML = ``
        monedasUnicas.forEach((nombreMoneda) => {
            var precio_anterior = 0

            if (nombreMoneda == valorSelect) {
                tbody.innerHTML += `
                <tr class="moneda">
                <td id="moneda_td" colspan="5">${nombreMoneda}</td>
                </tr>
                `;
                grupoDeMonedas[nombreMoneda].forEach((moneda) => {

                    let subio = subio_precio(precio_anterior, moneda[2]);

                    tbody.innerHTML += `
                        <tr>
                            <td></td>
                            <td>${moneda[0]}</td>
                            <td>${moneda[2]}</td>
                            <td>${moneda[3]}</td>
                            <td><i class="fa-solid fa-circle-arrow-${subio}"></i></td>
                        </tr>
                    `;
                    precio_anterior = moneda[2].slice(1)
                });

                myChart.data.labels = []
                myChart.data.datasets = [];
                var etiquetas = [];
                var datosLinea1 = [];
                var datosLinea2 = [];

                etiquetas = []

                for (moneda1 of grupoDeMonedas[nombreMoneda]) {
                    if (!(moneda1[0] in etiquetas)) {
                        myChart.data.labels.push(moneda1[0])

                    }
                }

                datosLinea1 = []
                datosLinea2 = []
                grupoDeMonedas[nombreMoneda].forEach((moneda) => {
                    datosLinea1.unshift(parseFloat(moneda[2].slice(1)))
                    datosLinea2.unshift(parseFloat(moneda[3].slice(1)))
                })

                var newDataset = {
                    label: "Compra",
                    data: datosLinea1,
                    borderColor: getRandomColor(),
                    backgroundColor: getRandomColor(),
                    borderWidth: 1,
                    fill: false
                };

                var newDataset2 = {
                    label: "Venta",
                    data: datosLinea2,
                    borderColor: getRandomColor(),
                    backgroundColor: getRandomColor(),
                    borderWidth: 1,
                    fill: false
                };

                myChart.data.labels.push(etiquetas)
                myChart.data.datasets.push(newDataset);
                myChart.data.datasets.push(newDataset2);
                myChart.update();

            }
        })
    }
}

actualizar_dom()



function subio_precio(precio_anterior, moneda) {
    var monedaAux = moneda.slice(1)
    if (parseFloat(monedaAux) >= parseFloat(precio_anterior)) {
        return "up"
    } else {
        return "down"
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.getElementById("enviar").addEventListener('click', (e) => {
    var nombre = document.getElementById("nombre")
    var mail = document.getElementById("email")
    if (nombre.value == "" || mail.value == "") {
        alert("Faltan completar datos")
    } else {
        nombre.value = ""
        mail.value = ""
        e.preventDefault()
        modal.classList.remove('modal_show')
        alert("Enviado")
    }
})

document.getElementById("cancelar").addEventListener('click', (e) => {
    var nombre = document.getElementById("nombre")
    var mail = document.getElementById("email")
    nombre.value = ""
    mail.value = ""
    e.preventDefault()
    modal.classList.remove('modal_show')
})
function compartirInfo() {
    modal.classList.add('modal_show')
}






