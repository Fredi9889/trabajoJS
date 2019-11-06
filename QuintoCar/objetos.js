"use strict";

//////////////////////////////////////CLASES/////////////////////////////////////////////////////////////
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

//Clase Venta
function Venta(oCliente, oVehiculo, fImporte,dtFVenta) {
    this.cliente = oCliente;
    this.vehiculo= oVehiculo;
    this.importe = fImporte;
    this.fVenta = dtFVenta;
}

Venta.prototype.toString = function() {
    let sMensaje = "El cliente " +this.cliente+ ", ha vendido un " +this.vehiculo+" por un importe de " +this.importe+ " el día " +this.fVenta;
    return sMensaje;
}

//Clase Compra
function Compra(oCliente, oVehiculo, fImporte,dtFCompra) {
    this.cliente = oCliente;
    this.vehiculo= oVehiculo;
    this.importe = fImporte;
    this.fCompra = dtFCompra;
}

Venta.prototype.toString = function() {
    let sMensaje = "El cliente " +this.cliente+ ", ha comprado un " +this.vehiculo+" por un importe de " +this.importe+ " el día " +this.fCompra;
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

//Herencia de vehiculo
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
//Herencia de vehiculo
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

    //////////////////////////////////////////////////MÉTODOS/////////////////////////////////////////////////////////////////

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

    let oCliente;
    if (this.clientes.filter(clientes => clientes.nif == sNif).length != 0) {
          oCliente = new Cliente(this.sNif, this.nombre,this.apellido, this.telefono);
        } 
    return oCliente;

    }
    //4.1.-Buscar compra
    buscarCompra(matricula){
        let oCompra = null;
        for(let i=0 ; i<this.compras.length ; i++){
            let compra = this.compras[i];
            if(compra.vehiculo.matricula == matricula){
                oCompra = compra;
            }
        }
        return oCompra;
    }//4.2.-Buscar venta
    buscarVenta(matricula){
        let oVenta = null;
        for(let i=0 ; i<this.ventas.length ; i++){
            let venta = this.ventas[i];
            if(venta.vehiculo.matricula == matricula){
                oVenta = venta;
            }
        }
        return oVenta;
    }
    //5.-BuscarVenta
    buscarVenta(matricula){
        let oVenta = null;
        if (this.ventas.filter(ventas => ventas.vehiculo.matricula == matricula).length != 0) {
          oVenta = ventas;
        } 
        return oVenta;
    }
    
    //6.-Comprar vehículo
    comprarVehiculo(matricula, sNIF, importeCompra, fechaCompra){
        let mens = "";

        let oClientesBuscar = this.clientes.filter(cli => cli.nif == sNIF);
        let oVehiculosBuscar = this.vehiculos.filter(vehi => vehi.matricula == matricula);
        //Comprobar que exista el cliente
        if (oClientesBuscar.length == 0) {
            mens = "ERROR: El cliente no existe";
        }else
        //Comprobar que el vehículo esté registrado
        if(oVehiculosBuscar.length == 0){
            mens = "ERROR: El vehículo no existe";
        }else
        //Comprobar que el vehículo no se haya comprado antes
        if(this.buscarCompra(matricula) != null){
            mens = "ERROR: El vehículo ya se había comprado antes";
        }else{

            let c = new Compra(oClientesBuscar[0], oVehiculosBuscar[0], importeCompra,fechaCompra);
            this.compras.push(c);
            mens = "El vehículo se ha comprado correctamente";
        } 
        return mens;
    }
    //7.-Vender vehículo
    venderVehiculo(matricula, NIF, importeCompra, fechaCompra){
        let mens = "";
        let oCliente;
        let oVehiculosBuscar = this.vehiculos.filter(vehi => vehi.matricula == matricula);
        //Comprobar que exista el cliente
        if (this.buscarClientes(NIF) == null) {
            mens = "ERROR: El cliente no existe";
        }else{
            oCliente = this.buscarClientes(NIF);
            //Comprobar que el vehículo esté registrado
            if(oVehiculosBuscar.length == 0){
                mens = "ERROR: El vehículo no existe";
            }else 
            //Comprobar que el vehículo no se haya vendido ya
            if(this.ventas.some(matri => matri == matricula)){
                mens = "ERROR: El vehículo ya se ha vendido anteriormente";
            }else
            //Comprobar que el importe de venta es superior al de compra
            if(this.buscarCompra(matricula).importe<this.buscarVenta(matricula).importe){
                let v = new Venta(oCliente, oVehiculosBuscar[0], importeCompra,fechaCompra);
                this.ventas.push(v);
                mens = "El vehículo se ha comprado correctamente";
            }else{
                mens = "ERROR: El importe de la venta no es superior al de compra";
            } 
        }
        
        return mens;
    }

    //8.- Vehículos en venta
    vehiculosEnVenta(){
        let vehiculo;
        for(let i=0;i<this.ventas.length;i++){
            vehiculo=this.ventas.vehiculo.matricula;
            for(let j=0;j<this.compras.length;j++){
                if (!vehiculo==this.compras[i].vehiculo.matricula) {
                    console.log(vehiculo);
                    return vehiculo;
                }else{
                    return "por lo menos llega bro";
                }
            }
        }
        return "llega";
    }
    //9.- Listado de vehículos vendidos en un periodo determinado
    //Datos completos del vehículo, fecha de compra, fecha de venta, importe de compra, 
    //importe de venta y beneficio (importe venta – importe compra).  
    //Los registros del listado deben salir ordenados por fecha de venta ascendente.
    listadoVendidosPeriodo(fInicio, fFin){
        let arrayFiltrado = this.ventas.filter(x => x.fVenta>=fInicio && x.fVenta<=fFin);
        let tabla = '<table border="1"><thead><tr>';
        tabla += "<th>Codigo</th><th>Nombre</th><th>Precio</th><th>Unidades</th>";
        tabla += "</tr></thead><tbody>";
        function recorrerArray(value, index, array) {
            tabla += "<tr>";

            tabla += "</tr>";
        }
        tabla += "</tbody></table>";
        
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
