const btn = document.getElementById('Enviar');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'service_co2knsy';
   const templateID = 'template_liefoi3';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar';
      alert('Enviado!');
    }, (err) => {
      btn.value = 'Enviar';
      alert(JSON.stringify(err));
    });
});


function limpiar(){
  var nombre = document.getElementById("nombre")
  var email = document.getElementById("mail")
  var comentario = document.getElementById("comentario")

  nombre.value = ""
  email.value = ""
  comentario.value = ""

}