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

    //1.-Introducir cliente
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

    //2.-Introducir vehiculo
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
    //3.-Buscar clientes
    buscarClientes(sNif)
    {
    let oCliente = null;
        for(let i=0 ; i<this.clientes.length ; i++){
            let cliente = this.clientes[i];
            if(cliente.nif == sNif){
                oCliente = cliente;
            }
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

    //8.- Vehículos en venta (vehiculosALaVenta)
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
        let tabla;
        function recorrerArray(value) {
            let oCompra = this.buscarCompra(value.vehiculo.matricula);
            tabla = '<table border="1"><tr>';
            tabla += "<th colspan='4'>Vehículo</th></tr>";
            tabla += "<tr><th>Matrícula</th><th>Marca</th><th>Modelo</th><th>Combustible</th></tr>";
            tabla += "<tr><td>" + value.vehiculo.matricula + "</td><td>" + value.vehiculo.marca + "</td><td>" + value.vehiculo.modelo + "</td><td>" + value.vehiculo.combustible + "</td></tr>";
            //Preguntar a Carlos que como se si un vehículo es un turismo o un 4x4
            //Alfredo en la parte de formularios tengo que si es T es un turismo pero si es 4 es un 4x4
            //Aqui esta el resultado que te indica si es un turismo o un 4x4 
            //frmAltaVehiculo.txtCategoria.value
            // Ya esta comprobado si el usuario introduce una T o un 4
            tabla += "<tr><th colspan='2'>Fecha de compra</th><th colspan='2'>Fecha de venta</th></tr>";
            tabla += "<tr><td colspan='2'>" + oCompra.fCompra + "</td><td colspan='2'>" + value.fVenta;
            tabla += "<tr><th colspan='2'>Importe de compra</th><th colspan='2'>Importe de venta</th></tr>";
            tabla += "<tr><td colspan='2'>" + oCompra.importe + "</td><td colspan='2'>" + value.importe;
            table += "<tr><th colspan='4'>Beneficios</th></tr>";
            table += "<tr><td>" + value.importe-oCompra.importe + "</td></tr>";
            tabla += "</table>";
        }
        arrayFiltrado.forEach(recorrerArray);
        return tabla;
    }

    //10.- Listado de vehículos comprados en un periodo determinado  
    //Los registros del listado deben salir ordenados por fecha de compra descendente.
    //Me falta añadir los datos del cliente vendedor y ordenarlos por fecha
    listadoVendidosPeriodo(fInicio, fFin){
        let arrayFiltrado = this.ventas.filter(x => x.fVenta>=fInicio && x.fVenta<=fFin);
        let tabla;
        function recorrerArray(value) {
            let oVenta = this.buscarVenta(value.vehiculo.matricula);
            tabla = '<table border="1"><tr>';
            tabla += "<th colspan='4'>Vehículo</th></tr>";
            tabla += "<tr><th>Matrícula</th><th>Marca</th><th>Modelo</th><th>Combustible</th><th>Categoría</th></tr>";
            tabla += "<tr><td>" + value.vehiculo.matricula + "</td><td>" + value.vehiculo.marca + "</td><td>" + value.vehiculo.modelo + "</td><td>" + value.vehiculo.combustible + "</td><td>" + frmAltaVehiculo.txtCategoria.value + "</td></tr>";
            //datos del cliente vendedor
            tabla += "<tr><th colspan='2'>Fecha de compra</th><th colspan='2'>Importe de compra</th></tr>";
            tabla += "<tr><th colspan='2'>" + oVenta.fCompra + "</th><th colspan='2'>" + oVenta.importe + "</th></tr>";
            table += "<tr><th colspan='4'>Cliente</th></tr>";

            tabla += "</table>";
        }
        arrayFiltrado.forEach(recorrerArray);
        return tabla;
    }

    //12.-ListadoCliente
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
