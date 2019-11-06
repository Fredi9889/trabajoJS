"use strict";
//Programa Princiapl
var oQuintoCar = new QuintoCar();
var divListado = document.getElementById("listado");

//Mostrar Formularios

//Mostrar formulario cliente(anadir los otros formularios mientras los vais creando)
function altaCliente() {
    frmVenderVehiculo.style.display = "none";
    frmListadoVVP.style.display = "none";
    frmAltaCliente.style.display = "block";
    frmAltaVehiculo.style.display = "none";
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "none";
    divListado.style.display = "none";
    frmComprarVehiculo.style.display = "none";
}
//Mostrar formulario vehiculo(anadir los otros formularios mientras los vais creando)
function altaVehiculo(){
    frmVenderVehiculo.style.display = "none";
    frmListadoVVP.style.display = "none";
    frmAltaCliente.style.display = "none";
    frmAltaVehiculo.style.display = "block";
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "none";
    divListado.style.display = "none";
    frmComprarVehiculo.style.display = "none";
}
//Mostrar comprar vehículo
function comprarVehiculo(){
    frmVenderVehiculo.style.display = "none";
    frmListadoVVP.style.display = "none";
    frmAltaCliente.style.display = "none";
    frmAltaVehiculo.style.display = "none";
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "none";
    divListado.style.display = "none";
    frmComprarVehiculo.style.display = "block";
}


function comprobarCategoria(){
let categoria=frmAltaVehiculo.txtCategoria.value.trim();

    if(categoria=="T"){
    frmAltaCliente.style.display = "none";
    frmAltaVehiculo.style.display = "none";
    frmAltaTurismo.style.display = "block";
    frmAlta4x4.style.display = "none";
    divListado.style.display = "none";
    }
    else if(categoria=="4"){
    frmAltaCliente.style.display = "none";
    frmAltaVehiculo.style.display = "none";
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "block";
    divListado.style.display = "none";
    }
    else{
    alert("Debes elegir una categoria adecuada");
    }
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

function aceptarAltaVehiculo(){
    let oVehiculo;
    //Recogemos los valores 
    let categoria=frmAltaVehiculo.txtCategoria.value.trim();
    let matricula=frmAltaVehiculo.txtMatricula.value.trim();
    let marca=frmAltaVehiculo.txtMarca.value.trim();
    let modelo=frmAltaVehiculo.txtModelo.value.trim();
    let combustible=frmAltaVehiculo.txtCombustible.value.trim();

    if(categoria=="T"){
        let abs=frmAltaTurismo.bABS.value;
        let desca=frmAltaTurismo.bDescapotable.value;
        let numpuer=parseInt(frmAltaTurismo.txtNumPuertas.value.trim());
        oVehiculo= new Turismo(matricula, marca, modelo, combustible, abs, desca, numpuer);
    }
    if(categoria=="4"){
       let penMax=parseInt(frmAlta4x4.txtPenMax.value.trim());
       oVehiculo= new todoTerreno(matricula, marca, modelo, combustible,penMax);
    }
   
    let sMensaje = oQuintoCar.altaVehiculo(oVehiculo);

    alert(sMensaje);
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "none";   
    frmAltaVehiculo.style.display = "block";

    
}
// Comprar vehículo
    function aceptarCompraVehiculo(){
        //Recoger valores del formulario
        let nifCliente = frmComprarVehiculo.txtNif.value.trim();
        let matricula = frmComprarVehiculo.txtMatricula.value.trim();
        let fechaCompra = frmComprarVehiculo.txtFecha.value.trim();
        let importeCompra = frmComprarVehiculo.txtImporte.value.trim();
        let mensaje = oQuintoCar.comprarVehiculo(matricula, nifCliente, importeCompra, fechaCompra);
        alert(mensaje);
    }

//ListadoClientes
function listadoClientes(){
    frmVenderVehiculo.style.display = "none";
    frmListadoVVP.style.display = "none";
    frmAltaCliente.style.display = "none";
    frmAltaVehiculo.style.display = "none";
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "none";
    divListado.style.display = "block";    
    divListado.innerHTML= oQuintoCar.listadoCliente();
}

//Listado de vehículos en venta
function listadoALaVenta(){
    
    let sMensaje = oQuintoCar.vehiculosEnVenta();
    divListado.style.display = "block";    
    divListado.innerHTML= sMensaje;
}
//7.- Mostrar venta de vehículo
function venderVehiculo(){
    frmListadoVVP.style.display = "none";
    frmAltaCliente.style.display = "none";
    frmAltaVehiculo.style.display = "none";
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "none";
    frmComprarVehiculo.style.display = "none";
    divListado.style.display = "none";
    frmVenderVehiculo.style.display = "block";
}
//7.- Aceptar venta de vehículo
function aceptarVentaVehiculo(){
    //Recoger valores del formulario
    let nifCliente = frmVenderVehiculo.txtNif.value.trim();
    let matricula = frmVenderVehiculo.txtMatricula.value.trim();
    let fechaCompra = frmVenderVehiculo.txtFecha.value.trim();
    let importeCompra = frmVenderVehiculo.txtImporte.value.trim();
    let mensaje = oQuintoCar.venderVehiculo(matricula, nifCliente, importeCompra, fechaCompra);
    alert(mensaje);
}
//9.-Mostrar listado de vehículos vendidos en un periodo determinado
function vehiculoVentaPeriodo(){
    frmVenderVehiculo.style.display = "none";
    frmListadoVVP.style.display = "block";
    frmAltaCliente.style.display = "none";
    frmAltaVehiculo.style.display = "none";
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "none";
    frmComprarVehiculo.style.display = "none";
    divListado.style.display = "none";
}
//9.-Aceptar listado de vehículos vendidos en un periodo determinado
function aceptarListadoVVP(){
    let fInicio = frmListadoVVP.txtFechaInicio.value.trim();
    let fFin = frmListadoVVP.txtFechaFin.value.trim();
    divListado.innerHTML= oQuintoCar.listadoVendidosPeriodo(fInicio, fFin);
}