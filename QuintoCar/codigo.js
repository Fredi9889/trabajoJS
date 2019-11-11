"use strict";
//Programa Princiapl
var oQuintoCar = new QuintoCar();
var divListado = document.getElementById("listado");

//Mostrar Formularios

//Mostrar formulario cliente(anadir los otros formularios mientras los vais creando)
function altaCliente() {
    frmVenderVehiculo.style.display = "none";
    frmListadoVVP.style.display = "none";
    frmListadoVCP.style.display = "none";
    frmAltaCliente.style.display = "block";
    frmAltaVehiculo.style.display = "none";
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "none";
    divListado.style.display = "none";
    frmComprarVehiculo.style.display = "none";
    frmListarVehiculo.style.display= "none";
}
//Mostrar formulario vehiculo(anadir los otros formularios mientras los vais creando)
function altaVehiculo(){
    frmVenderVehiculo.style.display = "none";
    frmListadoVVP.style.display = "none";
    frmListadoVCP.style.display = "none";
    frmAltaCliente.style.display = "none";
    frmAltaVehiculo.style.display = "block";
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "none";
    divListado.style.display = "none";
    frmComprarVehiculo.style.display = "none";
    frmListarVehiculo.style.display= "none";
}



function comprobarCategoria(){
let categoria=frmAltaVehiculo.txtCategoria.value.trim();
let comb=frmAltaVehiculo.txtCombustible.value.trim();

    if(categoria.length==0){
    alert("Error el campo categoria esta vacio");
    }
    else if(categoria!="T" && categoria!="4"){
    alert("Error el valor de la categoria esta mal");
    }
    else if(frmAltaVehiculo.txtMatricula.value.length==0){
    alert("Error el campo matricula esta vacio");
    }
    else if(frmAltaVehiculo.txtMarca.value.length==0){
        alert("Error el campo marca esta vacio");
    }
    else if(frmAltaVehiculo.txtModelo.value.length==0){
        alert("Error el campo modelo esta vacio");
    }
    else if(comb.length==0){
        alert("Error el campo cobustible esta vacio");
    }
    else if(comb!="G" && comb!="D" && comb!="B"){
        alert("Error el campo cobustible debe ser G,D,B");
    }
else{

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
  
}
}


//Funciones 

function aceptarAltaCliente() {
    if(frmAltaCliente.txtNif.value.length==0){
    alert("Error el campo NIF esta vacio");
    }
    else if(frmAltaCliente.txtNombre.value.length==0){
        alert("Error el campo nombre esta vacio");
    }
   else if(frmAltaCliente.txtApellidos.value.length==0){
        alert("Error el campo apellido esta vacio");
    }
    else if(frmAltaCliente.txtTelefono.value.length==0){
        alert("Error el campo telefono esta vacio");
    }
    else if(isNaN(frmAltaCliente.txtTelefono.value)){
        alert("Error el campo telefono no es un numero");
    }
    else{
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
}

function aceptarAltaVehiculo()
{
    let oVehiculo;
    //Recogemos los valores 
    let categoria=frmAltaVehiculo.txtCategoria.value.trim();
    let matricula=frmAltaVehiculo.txtMatricula.value.trim();
    let marca=frmAltaVehiculo.txtMarca.value.trim();
    let modelo=frmAltaVehiculo.txtModelo.value.trim();
    let combustible=frmAltaVehiculo.txtCombustible.value.trim();

    if(categoria=="T")
    {
        if(frmAltaTurismo.txtNumPuertas.value==0)
        {
            alert("Error el campo numero de puertas esta vacio");
        }
        else if(isNaN(frmAltaTurismo.txtNumPuertas.value))
        {
            alert("Error el campo numero de puertas no es un numero");
        }
        else
        {
            let abs=frmAltaTurismo.bABS.value;
            let desca=frmAltaTurismo.bDescapotable.value;
            let numpuer=parseInt(frmAltaTurismo.txtNumPuertas.value.trim());
            oVehiculo= new Turismo(matricula, marca, modelo, combustible, abs, desca, numpuer);
            let sMensaje = oQuintoCar.altaVehiculo(oVehiculo);
            alert(sMensaje);
            frmAltaTurismo.style.display = "none";
            frmAlta4x4.style.display = "none";   
            frmAltaVehiculo.style.display = "block";
        }
    }


    if(categoria=="4")
    {
        if(frmAlta4x4.txtPenMax.value==0)
        {
            alert("Error el campo pendiente maxima esta vacio");
        }
        else if(isNaN(frmAlta4x4.txtPenMax.value))
        {
            alert("Error el campo pendiente maxima no es un numero");
        }
        else
        {
            let penMax=parseInt(frmAlta4x4.txtPenMax.value.trim());
            oVehiculo= new todoTerreno(matricula, marca, modelo, combustible,penMax);
            let sMensaje = oQuintoCar.altaVehiculo(oVehiculo);
            alert(sMensaje);
            frmAltaTurismo.style.display = "none";
            frmAlta4x4.style.display = "none";   
            frmAltaVehiculo.style.display = "block";
        }    
}

   
   
    
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
    frmListarVehiculo.style.display= "none";
}
//6.-Mostrar comprar vehículo
function comprarVehiculo(){
    frmVenderVehiculo.style.display = "none";
    frmListadoVVP.style.display = "none";
    frmListadoVCP.style.display = "none";
    frmAltaCliente.style.display = "none";
    frmAltaVehiculo.style.display = "none";
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "none";
    divListado.style.display = "none";
    frmComprarVehiculo.style.display = "block";
    frmListarVehiculo.style.display= "none";
    //Reiniciar campos
    frmComprarVehiculo.txtNif.value = "";
    frmComprarVehiculo.txtMatricula.value = "";
    frmComprarVehiculo.txtFecha.value = "";
    frmComprarVehiculo.txtImporte.value = "";
}
//6.-Comprar vehículo
function aceptarCompraVehiculo(){
    //Recoger valores del formulario
    let nifCliente = frmComprarVehiculo.txtNif.value.trim();
    let matricula = frmComprarVehiculo.txtMatricula.value.trim();
    let fechaCompra = frmComprarVehiculo.txtFecha.value.trim();
    let importeCompra = frmComprarVehiculo.txtImporte.value.trim();
    if(nifCliente=="" || matricula==""|| fechaCompra=="" || importeCompra==""){
        alert("ERROR: Debe rellenar todos los campos");
    }else{
        let mensaje = oQuintoCar.comprarVehiculo(matricula, nifCliente, importeCompra, fechaCompra);
        alert(mensaje);
    }
    //Reiniciar campos
    frmComprarVehiculo.txtNif.value = "";
    frmComprarVehiculo.txtMatricula.value = "";
    frmComprarVehiculo.txtFecha.value = "";
    frmComprarVehiculo.txtImporte.value = "";
}
//7.- Mostrar venta de vehículo
function venderVehiculo(){
    frmListadoVVP.style.display = "none";
    frmListadoVCP.style.display = "none";
    frmAltaCliente.style.display = "none";
    frmAltaVehiculo.style.display = "none";
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "none";
    frmComprarVehiculo.style.display = "none";
    divListado.style.display = "none";
    frmVenderVehiculo.style.display = "block";
    frmListarVehiculo.style.display= "none";
    //Reiniciar campos
    frmVenderVehiculo.txtNif.value = "";
    frmVenderVehiculo.txtMatricula.value = "";
    frmVenderVehiculo.txtFecha.value = "";
    frmVenderVehiculo.txtImporte.value = "";
}
//7.- Aceptar venta de vehículo
function aceptarVentaVehiculo(){
    //Recoger valores del formulario
    let nifCliente = frmVenderVehiculo.txtNif.value.trim();
    let matricula = frmVenderVehiculo.txtMatricula.value.trim();
    let fechaCompra = frmVenderVehiculo.txtFecha.value.trim();
    let importeCompra = frmVenderVehiculo.txtImporte.value.trim();
    if(nifCliente=="" || matricula==""|| fechaCompra=="" || importeCompra==""){
        alert("ERROR: Debe rellenar todos los campos");
    }else{
        let mensaje = oQuintoCar.venderVehiculo(matricula, nifCliente, importeCompra, fechaCompra);
        alert(mensaje);
    }
    //Reiniciar campos
    frmVenderVehiculo.txtNif.value = "";
    frmVenderVehiculo.txtMatricula.value = "";
    frmVenderVehiculo.txtFecha.value = "";
    frmVenderVehiculo.txtImporte.value = "";
}
//8.-Listado de vehículos en venta
function listadoALaVenta(){
    
    let sMensaje = oQuintoCar.vehiculosEnVenta();
    divListado.style.display = "block";    
    divListado.innerHTML= sMensaje;
}
//9.-Mostrar listado de vehículos vendidos en un periodo determinado
function vehiculoVentaPeriodo(){
    frmVenderVehiculo.style.display = "none";
    frmListadoVVP.style.display = "block";
    frmListadoVCP.style.display = "none";
    frmAltaCliente.style.display = "none";
    frmAltaVehiculo.style.display = "none";
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "none";
    frmComprarVehiculo.style.display = "none";
    divListado.style.display = "none";
    frmListarVehiculo.style.display= "none";
}
//9.-Aceptar listado de vehículos vendidos en un periodo determinado
function aceptarListadoVVP(){
    let fInicio = frmListadoVVP.txtFechaInicio.value.trim();
    let fFin = frmListadoVVP.txtFechaFin.value.trim();
    if(fInicio==""||fFin==""){
        alert("ERROR: Debe rellenar todos los campos");
    }else{
        let pestaña = window.open("","Listado vehículos");
        pestaña.document.write("<title>"+pestaña.name+"</title>");
        pestaña.document.write("<h1>Listado de vehículos vendidos entre las fechas " + fInicio+ " y " + fFin + "</h1>" + oQuintoCar.listadoVendidosPeriodo(fInicio, fFin));
        //divListado.innerHTML = oQuintoCar.listadoVendidosPeriodo(fInicio, fFin);
    }
    frmListadoVVP.txtFechaInicio.value = "";
    frmListadoVVP.txtFechaFin.value = "";
    //divListado.style.display = "block";
    //frmListadoVVP.style.display = "none";
}

//10.-Mostrar listado de vehículos vendidos en un periodo determinado
function listadoComprasPeriodo(){
    frmVenderVehiculo.style.display = "none";
    frmListadoVVP.style.display = "none";
    frmListadoVCP.style.display = "block";
    frmAltaCliente.style.display = "none";
    frmAltaVehiculo.style.display = "none";
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "none";
    frmComprarVehiculo.style.display = "none";
    divListado.style.display = "none";
    frmListarVehiculo.style.display= "none";
}
//10.-Aceptar listado de vehículos vendidos en un periodo determinado
function aceptarListadoVCP(){
    let fInicio = frmListadoVCP.txtFechaInicio.value.trim();
    let fFin = frmListadoVCP.txtFechaFin.value.trim();
    divListado.innerHTML= oQuintoCar.listadoCompradosPeriodo(fInicio, fFin);
}

//11.-Listar Vehiculos segun filtros
function vehiculoVentasFiltro(){
    frmVenderVehiculo.style.display = "none";
    frmListadoVVP.style.display = "none";
    frmListadoVCP.style.display = "none";
    frmAltaCliente.style.display = "none";
    frmAltaVehiculo.style.display = "none";
    frmAltaTurismo.style.display = "none";
    frmAlta4x4.style.display = "none";
    frmComprarVehiculo.style.display = "none";
    divListado.style.display = "none";
    frmListarVehiculo.style.display= "block";
}
