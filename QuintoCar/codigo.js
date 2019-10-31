"use strict";
//Programa Princiapl
var oQuintoCar = new QuintoCar();
var divListado = document.getElementById("listado");

//Mostrar Formularios

//Mostrar formulario cliente(anadir los otros formularios mientras los vais creando)
function altaCliente() {
    frmAltaCliente.style.display = "block";
    divListado.style.display = "none";
}



//Funciones 

function aceptarAltaCliente() {
    // Recoger valores del formulario
    let sNif = frmAltaCliente.txtNif.value.trim();
    let sNombre = frmAltaCliente.txtNombre.value.trim();
    let sApellido=frmAltaCliente.txtApellidos.value.trim();
    let iTelefono = parseInt(frmAltaCliente.txtTelefono.value.trim());

    // Creamos el objeto paciente
    let oCliente = new Cliente(sNif, sNombre,sApellido, iTelefono);
   
    // Alta de paciente en el hospital
    let sMensaje = oQuintoCar.altaCliente(oCliente);

    alert(sMensaje);
}




