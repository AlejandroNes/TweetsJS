//variables
const formulario = document.querySelector('#formulario');
const respuesta = document.querySelector('#respuesta');
const alertaError = document.querySelector('#alerta');
let arrayLista = []
//eventos
formulario.addEventListener('submit', validarFormulario);
respuesta.addEventListener('click', eliminarTarea);
document.addEventListener('DOMContentLoaded', ()=> {

   arrayLista = JSON.parse( localStorage.getItem('array') ) || [];
   mostrarHTML();

})
//funciones
function validarFormulario(e){
    e.preventDefault();
    //validando los inputs
    const tarea = document.querySelector('#tarea').value;
const descripcion = document.querySelector('#descripcion').value;
if(!tarea.trim() || !descripcion.trim()){
    alertaForm('Error!..', 'Complete el formulario', 'alert-danger');
}else{
    alertaForm('Success!..', 'Se envio correctamente', 'alert-success');
    formulario.reset();
    //creando el objeto
    const objeto = { id:Date.now(), tarea, descripcion }
    arrayLista = [...arrayLista, objeto]
    console.log(arrayLista)
    mostrarHTML();
}
}

//funcion aleerta
function alertaForm(sms, mensaje, color){
    const alert = document.querySelector('.alert')
    if(!alert){
        const alerta = document.createElement('div')
        alerta.classList.add('alert', 'p-0', 'my-1', 'text-center', color);
        alerta.innerHTML = `<p><strong>${sms}</strong>${mensaje}</p>`
        alertaError.appendChild(alerta)
        setTimeout( ()=> {
            alerta.remove();
        },2000 )
    }
}

//mostrando en el HTML
function mostrarHTML(){
    limpiarHTML();
    if(arrayLista.length > 0){
        arrayLista.forEach( item => {
            const { id, tarea, descripcion } = item

            //creamos el card
            const div = document.createElement('div');
            div.classList.add('tarjeta', 'card', 'w-100', 'my-2');
            div.innerHTML = `
            <div class="card-body">
            <h5 class="card-title text-center">${tarea}</h5>
            <p class="card-text">
              ${descripcion}
            </p>
            <button data-id="${id}" class="btn btn-outline-danger btn-sm eliminar">eliminar</button>
            </div>
            `
            //añadimos al div resultado
            respuesta.appendChild(div)
        });
    }else{
        const messeje = document.createElement('div')
        messeje.innerHTML = `
        <h4 class="text-center mt-5 text-muted">Aqui se mostraran </h4>
        <h4 class="text-center text-muted">tus notas</h4>
        `
        respuesta.appendChild(messeje)
    }

    sincronizarLocalStorage();
}

function sincronizarLocalStorage(){
    localStorage.setItem('array', JSON.stringify(arrayLista));
}

//limpiarHTML
function limpiarHTML(){
    while(respuesta.firstChild){
        respuesta.removeChild(respuesta.firstChild);
    }
}

//eliminar la tarea
function eliminarTarea(e){
    if(e.target.classList.contains('eliminar')){
        const tareaID = e.target.getAttribute('data-id');
        arrayLista = arrayLista.filter( item => item.id != tareaID );
        mostrarHTML();
    }

}