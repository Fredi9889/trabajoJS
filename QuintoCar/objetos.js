"use strict";
//Clase Cliente
function Cliente(sNIF, sNombre, sApellido, iTelefono) {
    this.nif = sNIF;
    this.nombre= sNombre;
    this.apellido = sApellido;
    this.telefono = iTelefono;
}
Cliente.prototype.toString = function() {
    let sMensaje = "El cliente " +this.nombre+ " " +this.apellido+" con DNI " +this.nif+ " y telefono " +this.telefono;
    return sMensaje;
}
//Clase vehiculo
function Vehiculo(sMatricula, sMarca, sModelo, sCombustible) {
    this.matricula = sMatricula;
    this.marca = sMarca;
    this.modelo = sModelo;
    this.combustible = sCombustible;
}
Vehiculo.prototype.toString = function() {
    let sMensaje = "El vehiculo " +this.matricula+ " de la marca " +this.marca+" y del modelo " +this.modelo+ " tiene el combustible " +this.combustible;
    return sMensaje;
}
//clase turismo
function Turismo(sMatricula, sMarca, sModelo, sCombustible, bABS, bDescapotable, iNumPuertas) {
    Vehiculo.call(this, sMatricula, sMarca, sModelo, sCombustible);
    this.abs = bABS;
    this.descapotable = bDescapotable;
    this.numPuertas = iNumPuertas;
}
//heredar de vehiculo
Turismo.prototype = Object.create(Vehiculo.prototype);
Turismo.prototype.constructor = Turismo;

Turismo.prototype.toString = function() {
    let sMensaje = "El turismo " +this.matricula+ " de la marca " +this.marca+" y del modelo " +this.modelo+ " tiene el combustible " +this.combustible;
    return sMensaje;
}


//Clase 4x4
function todoTerreno(sMatricula, sMarca, sModelo, sCombustible,iPendintemax) {
    Vehiculo.call(this, sMatricula, sMarca, sModelo, sCombustible);
    this.pendienteMax= iPendintemax;
}
//heredar de vehiculo
todoTerreno.prototype = Object.create(Vehiculo.prototype);
todoTerreno.prototype.constructor = todoTerreno;

todoTerreno.prototype.toString = function() {
    let sMensaje = "El todoTerreno " +this.matricula+ " de la marca " +this.marca+" y del modelo " +this.modelo+ " tiene el combustible " +this.combustible;
    return sMensaje;
}


//Clase principal
class QuintoCar{

constructor() 
    {
        this.clientes = [];
        this.ventas = [];
        this.compras = [];
        this.vehiculos = [];
    }

    //Introducir cliente
    altaCliente(oCliente) 
    {
        let sMensaje = "";

        if (this.clientes.filter(clientes => clientes.nif == oCliente.nif).length == 0) {
            //No se encuentra --> lo doy de alta
            this.clientes.push(oCliente);
            sMensaje = "Alta cliente OK";
        } else {
            sMensaje = "No puede haber dos clientes con el mismo NIF";
        }

        return sMensaje;
      
    }

    //Introducir vehiculo
   altaVehiculo(oVehiculo)
    {
        let sMensaje = "";

        if (this.vehiculos.filter(vehiculos => vehiculos.matricula == oVehiculo.matricula).length == 0) {
            //No se encuentra --> lo doy de alta
            this.vehiculos.push(oVehiculo);
            sMensaje = "Alta vehiculo OK";
        } else {
            sMensaje = "La matricula del vehiculo ya estaba registrada";
        }

        return sMensaje;

    }
    //Buscar clientes
    buscarClientes(sNif)
    {

    let oCliente
    if (this.clientes.filter(clientes => clientes.nif == sNif).length != 0) {
          oCliente = new Cliente(this.sNif, this.nombre,this.apellido, this.telefono);
        } 
    return oCliente;

    }
    
    //ListadoCliente
    listadoCliente()
    {
    let i = 0;
    let sMensaje = "<table border='1'><thead><tr>";
    sMensaje += "<th>NIF</th><th>Nombre</th><th>Apellido</th><th>Telefono</th></tr></thead><tbody>";

     for (i = 0; i < this.clientes.length; i++) 
    {
        sMensaje += "<tr>";
        sMensaje += "<td>"+this.clientes[i].nif+ "</td>";
        sMensaje += "<td>"+this.clientes[i].nombre+ "</td>";
        sMensaje += "<td>"+this.clientes[i].apellido+ "</td>";
        sMensaje += "<td>"+this.clientes[i].telefono+ "</td>";
        sMensaje += "</tr>";
    }

    sMensaje += "</tbody></table>";

     return sMensaje;
    }

}
